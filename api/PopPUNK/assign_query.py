# universal
import os
import sys
# additional
import numpy as np
#import graph_tool.all as gt
import subprocess
import json
import h5py

# required from v2.1.1 onwards (no mash support)
import pp_sketchlib

# import poppunk package
#from __init__ import __version__

from .models import *

from .sketchlib import no_sketchlib, checkSketchlibLibrary

from .lineage_clustering import cluster_into_lineages

from .network import fetchNetwork
from .network import constructNetwork
from .network import extractReferences
from .network import writeDummyReferences
from .network import addQueryToNetwork
from .network import printClusters

from .plot import outputsForMicroreact
from .plot import outputsForCytoscape
from .plot import outputsForPhandango
from .plot import outputsForGrapetree

from .prune_db import prune_distance_matrix

from .sketchlib import calculateQueryQueryDistances

from .utils import setupDBFuncs
from .utils import storePickle
from .utils import readPickle
from .utils import writeTmpFile
from .utils import qcDistMat
from .utils import update_distance_matrices
from .utils import readRfile
from .utils import readIsolateTypeFromCsv


def singleQuery(rNames, qNames, dbPrefix, queryPrefix, klist, self = True, number_plot_fits = 0,
                  threads = 1, use_gpu = False, deviceid = 0):
    """Calculate core and accessory distances between query sequences and a sketched database

    For a reference database, runs the query against itself to find all pairwise
    core and accessory distances.

    Uses the relation :math:`pr(a, b) = (1-a)(1-c)^k`

    To get the ref and query name for each row of the returned distances, call to the iterator
    :func:`~PopPUNK.utils.iterDistRows` with the returned refList and queryList

    Args:
        rNames (list)
            Names of references to query
        qNames (list)
            Names of queries
        dbPrefix (str)
            Prefix for reference mash sketch database created by :func:`~constructDatabase`
        queryPrefix (str)
            Prefix for query mash sketch database created by :func:`~constructDatabase`
        klist (list)
            K-mer sizes to use in the calculation
        self (bool)
            Set true if query = ref
            (default = True)
        number_plot_fits (int)
            If > 0, the number of k-mer length fits to plot (saved as pdfs).
            Takes random pairs of comparisons and calls :func:`~PopPUNK.plot.plot_fit`
            (default = 0)
        threads (int)
            Number of threads to use in the mash process
            (default = 1)
        use_gpu (bool)
            Use a GPU for querying
            (default = False)
        deviceid (int)
            Index of the CUDA GPU device to use
            (default = 0)

    Returns:
         refList (list)
            Names of reference sequences
         queryList (list)
            Names of query sequences
         distMat (numpy.array)
            Core distances (column 0) and accessory distances (column 1) between
            refList and queryList
    """
    ref_db = dbPrefix + "/" + os.path.basename(dbPrefix)

    if self:
        if dbPrefix != queryPrefix:
            raise RuntimeError("Must use same db for self query")
        qNames = rNames

        # Calls to library
        distMat = pp_sketchlib.queryDatabase(ref_db, ref_db, rNames, rNames, klist,
                                             True, False, threads, use_gpu, deviceid)

        # option to plot core/accessory fits. Choose a random number from cmd line option
        if number_plot_fits > 0:
            jacobian = -np.hstack((np.ones((klist.shape[0], 1)), klist.reshape(-1, 1)))
            for plot_idx in range(number_plot_fits):
                example = sample(rNames, k=2)
                raw = np.zeros(len(klist))
                for kidx, kmer in enumerate(klist):
                    raw[kidx] = pp_sketchlib.jaccardDist(ref_db, example[0], example[1], kmer)

                fit = fitKmerCurve(raw, klist, jacobian)
                plot_fit(klist, raw, fit,
                        dbPrefix + "/fit_example_" + str(plot_idx + 1),
                        "Example fit " + str(plot_idx + 1) + " - " +  example[0] + " vs. " + example[1])
    else:
        query_db = queryPrefix + "/" + os.path.basename(queryPrefix)

        if len(set(rNames).intersection(set(qNames))) > 0:
            sys.stderr.write("Sample names in query are contained in reference database\n")
            sys.stderr.write("Unique names are required!\n")
            exit(0)

        # Calls to library
        distMat = pp_sketchlib.queryDatabase(ref_db, query_db, rNames, qNames, klist,
                                             True, False, threads, use_gpu, deviceid)

    return(rNames, qNames, distMat)


#*******************************#
#*                             *#
#* query assignment            *#
#*                             *#
#*******************************#
def assign_query(ref_dir, q_files, output, threads,
                 plot_fit, max_a_dist, core_only, accessory_only, use_accessory,
                 # added extra arguments for constructing sketchlib libraries
                 min_count, use_exact):
    """Code for assign query mode. Minimised and adapted from the standalone function at the bottom of "__main__.py"
    """

    #Options I am not sure about
    update_db = False
    full_db = False
    distances = None
    use_mash = False
    overwrite = False
    #no_stream
    external_clustering = None
    assign_lineage = False
    existing_scheme = False
    rank_list = None
    strand_preserved = False

    class args:
         #Options I am not sure about
        update_db = False
        full_db = False
        distances = None
        use_mash = False
        #no_stream
        external_clustering = None
        assign_lineage = False
        existing_scheme = None
        rank_list = None
        use_gpu = False
        deviceid = 0
    
    args.min_kmer_count = min_count
    args.exact_count = use_exact
    args.overwrite = False
    args.strand_preserved = False

    if "streptococcus" in ref_dir:
        min_k = 14
        max_k = 29
        k_step = 3
        sketch_sizes = 10000
        kmers = np.arange(min_k, max_k + 1, k_step)
    else: 
        min_k = 14
        max_k = 26
        k_step = 4
        sketch_sizes = 10000
        kmers = np.arange(min_k, max_k + 1, k_step)

    # Dict of DB access functions for assign_query (which is out of scope)
    dbFuncs = setupDBFuncs(args, kmers, min_count)
    createDatabaseDir = dbFuncs['createDatabaseDir']
    constructDatabase = dbFuncs['constructDatabase']
    queryDatabase = dbFuncs['queryDatabase']
    readDBParams = dbFuncs['readDBParams']
    getSeqsInDb = dbFuncs['getSeqsInDb']


    #Quality control options
    qc_filter = 'stop'
    retain_failures = False
    length_sigma = 5
    length_range = [None,None]
    prop_n = 0.1
    upper_n = None

    qc_dict = {
        'qc_filter': qc_filter,
        'retain_failures': retain_failures,
        'length_sigma': length_sigma,
        'length_range': length_range,
        'prop_n': prop_n,
        'upper_n': upper_n
    }

    ref_db = ref_dir
    model_dir = ref_db
    previous_clustering = ref_db

    if ref_db is not None and q_files is not None:
        sys.stderr.write("Mode: Assigning clusters of query sequences\n\n")
        self = False
        if ref_db == output:
            sys.stderr.write("--output and --ref-db must be different to "
                                "prevent overwrite.\n")
            sys.exit(1)
        #if (update_db and not distances):
            #sys.stderr.write("--update-db requires --distances to be provided\n")
            #sys.exit(1)
        #if (microreact or cytoscape) and (not update_db or not distances):
            #sys.stderr.write("--microreact and/or --cytoscape output must be "
                   # "run with --distances and --update-db to generate a full "
                   # " distance matrix\n")
            #sys.exit(1)

        # Find distances to reference db
        #kmers, sketch_sizes = readDBParams(ref_db, kmers, sketch_sizes)

        # Sketch query sequences
        #createDatabaseDir(output, kmers)

        strand_preserved = False

        # Find distances vs ref seqs
        rNames = []
        if use_mash == True:
            rNames = None
            # construct database and QC
            qNames = constructDatabase(q_files, kmers, sketch_sizes, output,
                                threads, overwrite)
        else:
            import os 
            if os.path.isfile(ref_db + "/" + os.path.basename(ref_db) + ".refs"):
                with open(ref_db + "/" + os.path.basename(ref_db) + ".refs") as refFile:
                    for reference in refFile:
                        rNames.append(reference.rstrip())
            else:
                rNames = getSeqsInDb(ref_db + "/" + os.path.basename(ref_db) + ".h5")

            #qNames = constructDatabase(q_files, kmers, sketch_sizes, output,
                              #  threads, overwrite,
                               # strand_preserved = strand_preserved,
                              #  min_count = min_count,
                              #  use_exact = use_exact,
                               # qc_dict = qc_dict)
        
        with open('databases/query/sketch.json', 'r') as f:
            sketch_dict = json.load(f)
        
        kmers = []
        dists = []
        for k,v in sketch_dict.items():
            if not k == "name":
                kmers.append(int(k))
                dists.append(np.array(v))
            else:
                qNames = [v+".1"]  
        
        if "streptococcus" in ref_dir:
            min_k = 14
            max_k = 29
            k_step = 3
            sketch_sizes = 10000
            kmers = np.arange(min_k, max_k + 1, k_step)
        else: 
            min_k = 14
            max_k = 26
            k_step = 4
            sketch_sizes = 10000
            kmers = np.arange(min_k, max_k + 1, k_step)

        o = h5py.File('databases/query/query.h5', 'w')
        grp = o.create_group("sketches")
        fas = grp.create_group(qNames[0])
        fas.attrs['bbits'] = 14
        fas.attrs['sketchsize64'] = 156
        fas.attrs['kmers'] = kmers

        for ks in range(len(kmers)):
            k_spec = fas.create_dataset(str(kmers[ks]), data=dists[ks], dtype='u8')
            k_spec.attrs['kmer size'] = kmers[ks]

        o.close()

        refList, queryList, distMat = singleQuery(rNames = rNames,
                                                    qNames = qNames,
                                                    dbPrefix = ref_db,
                                                    queryPrefix = "databases/query",
                                                    klist = [26],
                                                    self = False,
                                                    number_plot_fits = plot_fit,
                                                    threads = threads)
        print(distMat)
        # run query
        refList, queryList, distMat = queryDatabase(rNames = rNames,
                                                    qNames = qNames,
                                                    dbPrefix = ref_db,
                                                    queryPrefix = "databases/query",
                                                    klist = kmers,
                                                    self = False,
                                                    number_plot_fits = plot_fit,
                                                    threads = threads)

        # QC distance matrix
        qcPass = qcDistMat(distMat, refList, queryList, max_a_dist)

        # Calculate query-query distances
        ordered_queryList = []

        # Assign to strains or lineages, as requested
        if assign_lineage:

            # Assign lineages by calculating query-query information
            ordered_queryList, query_distMat = calculateQueryQueryDistances(dbFuncs, refList, qNames,
                    kmers, output, use_mash, threads)

        else:
            # Assign these distances as within or between strain
            model_prefix = ref_db
            if model_dir is not None:
                model_prefix = model_dir
            model = loadClusterFit(model_prefix + "/" + os.path.basename(model_prefix) + '_fit.pkl',
                                    model_prefix + "/" + os.path.basename(model_prefix) + '_fit.npz')
            queryAssignments = model.assign(distMat)

            # set model prefix
            model_prefix = ref_db
            if model_dir is not None:
                model_prefix = model_dir

            # Set directories of previous fit
            if previous_clustering is not None:
                prev_clustering = previous_clustering
            else:
                prev_clustering = model_prefix

            # Load the network based on supplied options
            genomeNetwork, old_cluster_file = fetchNetwork(prev_clustering, model, refList,
                                                            core_only, accessory_only)

            # Assign clustering by adding to network
            ordered_queryList, query_distMat = addQueryToNetwork(dbFuncs, refList, queryList, q_files,
                    genomeNetwork, kmers, queryAssignments, model, output, update_db,
                    use_mash, threads)

            # if running simple query
            print_full_clustering = False
            if update_db:
                print_full_clustering = True

            isolateClustering = {'combined': printClusters(genomeNetwork, refList + [v],
                                                            output + "/" + os.path.basename(output),
                                                            old_cluster_file, external_clustering, print_full_clustering)}

        # Update DB as requested
        if update_db or assign_lineage:
            # Check new sequences pass QC before adding them
            if not qcPass:
                sys.stderr.write("Queries contained outlier distances, not updating database\n")
            else:
                sys.stderr.write("Updating reference database to " + output + "\n")

            # Update the network + ref list
            # only update network if assigning to strains
            if full_db is False and assign_lineage is False:
                dbOrder = refList + ordered_queryList
                newRepresentativesIndices, newRepresentativesNames, newRepresentativesFile, genomeNetwork = extractReferences(genomeNetwork, dbOrder, output, refList)
                isolates_to_remove = set(dbOrder).difference(newRepresentativesNames)
                newQueries = [x for x in ordered_queryList if x in frozenset(newRepresentativesNames)] # intersection that maintains order
                genomeNetwork.save(output + "/" + os.path.basename(output) + '_graph.gt', fmt = 'gt')
            else:
                newQueries = ordered_queryList

            # Update the sketch database
            if newQueries != queryList and use_mash:
                tmpRefFile = writeTmpFile(newQueries)
                constructDatabase(tmpRefFile, kmers, sketch_sizes, output,
                                    True, threads, True) # overwrite old db
                os.remove(tmpRefFile)
            # With mash, this is the reduced DB constructed,
            # with sketchlib, all sketches
            joinDBs(ref_db, output, output)

            # Update distance matrices with all calculated distances
            if distances == None:
                distanceFiles = ref_db + "/" + os.path.basename(ref_db) + ".dists"
            else:
                distanceFiles = distances
            refList, refList_copy, self, ref_distMat = readPickle(distanceFiles)
            combined_seq, core_distMat, acc_distMat = \
                update_distance_matrices(refList, ref_distMat,
                                         ordered_queryList, distMat,
                                         query_distMat, threads = threads)
            complete_distMat = \
                np.hstack((pp_sketchlib.squareToLong(core_distMat, threads).reshape(-1, 1),
                           pp_sketchlib.squareToLong(acc_distMat, threads).reshape(-1, 1)))

            if assign_lineage:
                expected_lineage_name = ref_db + '/' + ref_db + '_lineages.pkl'
                if existing_scheme is not None:
                    expected_lineage_name = existing_scheme
                isolateClustering = cluster_into_lineages(complete_distMat,
                                                          rank_list, output,
                                                          combined_seq,
                                                          ordered_queryList,
                                                          expected_lineage_name,
                                                          use_accessory,
                                                          threads)

            # Prune distances to references only, if not full db
            dists_out = output + "/" + os.path.basename(output) + ".dists"
            if full_db is False and assign_lineage is False:
                # could also have newRepresentativesNames in this diff (should be the same) - but want
                # to ensure consistency with the network in case of bad input/bugs
                nodes_to_remove = set(combined_seq).difference(newRepresentativesNames)
                # This function also writes out the new distance matrix
                postpruning_combined_seq, newDistMat = prune_distance_matrix(combined_seq, nodes_to_remove,
                                                                                complete_distMat, dists_out)

                # ensure mash sketch and distMat order match
                assert postpruning_combined_seq == refList + newQueries

            else:
                storePickle(combined_seq, combined_seq, True, complete_distMat, dists_out)

                # ensure mash sketch and distMat order match
                assert combined_seq == refList + newQueries

        # Generate files for visualisations

        #if microreact:
            #sys.stderr.write("Writing microreact output\n")
           # outputsForMicroreact(combined_seq, core_distMat, acc_distMat, isolateClustering, perplexity,
                             #   output, info_csv, rapidnj, ordered_queryList, overwrite)
       # if phandango:
          #  sys.stderr.write("Writing phandango output\n")
          #  outputsForPhandango(combined_seq, core_distMat, isolateClustering, output, info_csv, rapidnj,
          #                      queryList = ordered_queryList, overwrite = overwrite, microreact = microreact)
      #  if grapetree:
           # sys.stderr.write("Writing grapetree output\n")
           # outputsForGrapetree(combined_seq, core_distMat, isolateClustering, output, info_csv, rapidnj,
           #                     queryList = ordered_queryList, overwrite = overwrite, microreact = microreact)
       # if cytoscape:
             #   sys.stderr.write("Writing cytoscape output\n")
             #   outputsForCytoscape(genomeNetwork, isolateClustering, output, info_csv, ordered_queryList)

    else:
        sys.stderr.write("Need to provide both a reference database with --ref-db and "
                            "query list with --q-files\n")
        sys.exit(1)

    return(isolateClustering)