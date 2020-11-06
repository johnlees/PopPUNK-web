import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import time 
import requests 

#from PopPUNK.assign_query import assign_query
from PopPUNK.web import sketch_to_hdf5

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = set(['txt', 'fa', 'fna', 'fas', 'fasta'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app, expose_headers='Authorization')

import json
import h5py
import os 
import sys
import numpy as np

def api():
    url = "https://microreact.org/api/project/"

    with open("lm_example/lm_example_microreact_clusters.csv", "r") as csv:
        clusters = csv.read()
    with open("lm_example/lm_example_core_NJ.nwk", "r") as nwk:
        tree = nwk.read()

    data = {"name":"PopPUNK-web-testing","data":clusters,"tree":tree}
    x = requests.post(url, data = data)
    
    return x.text.split('url":')[1].replace("}", "")


def get_colours(query, clusters):
    colours = []
    for clus in clusters:
        if not clus == query:
            colours.append('"blue"')
        else:
            colours.append('"rgb(255,128,128)"')
    return colours

@app.route('/upload', methods=['POST'])
@cross_origin()
def fileUpload():
    if not request.json:
        return "not a json post"
    if request.json:
        sketch = request.json

        sketch_out = open("outputs/sketch.txt", "w")
        sketch_out.write(sketch)
        sketch_out.close()

        qNames = sketch_to_hdf5(sketch, "outputs")
        #assign_query(sketch, "lm_example", q_files, "outputs", 6,
                # True, "0.5", False, False, True,
                 # added extra arguments for constructing sketchlib libraries
               #  0, False)

        time.sleep(3) #Simulate running process 
        url = api()
        query = 2
        clusters = [1,2,3,4,5,6,7,8,9,10]
        prevalences = [1,5,10,40,30,7,3,3,1,0]
        colours = str(get_colours(query, clusters)).replace("'", "")
        response = '{"species":"Influenza","prev":"'+str(prevalences[query-1])+'%","query":' + str(query) + ',"clusters":' + str(clusters) + ',"prevalences":' + str(prevalences) + ',"colours":' + colours + ',"microreactUrl":'+ url +'}'
        return jsonify(response)

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,use_reloader=False)
 