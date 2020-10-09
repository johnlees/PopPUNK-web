import React, { useCallback, useEffect, useState } from "react";
import './App.css';
//import launchWorker from './launchWorker'
//import WebWorker from './components/setup';
//import worker from './components/test.worker';
// import worker from 'workerize-loader!./test.worker'; // eslint-disable-line import/no-webpack-loader-syntax
import DropZone from './components/DropZone';
import Loading from './components/Loading'
import ClusterResult from './components/clusterResult'

function App() {
  const [loading, setLoading] = useState(false) //define loading state
  const [display, setCluster] = useState(null) //define result state

  const sketchWork = require( "workerize-loader!./components/testWorker"); // eslint-disable-line import/no-webpack-loader-syntax
  //const blob = new Blob(['./test.worker.js'], { type: "text/javascript" });
  //const sketchWork = new Worker(URL.createObjectURL(blob), { type: 'module'});
  // Constants declaration
  const onDrop = useCallback(acceptedFiles => {
      setLoading(true)
      console.log(loading);
      sketchWork.postMessage(acceptedFiles);
      console.log("Sequence posted!");
    }, [sketchWork, setLoading]);

  useEffect(() => {
    sketchWork.sketch().then( cluster => {
      console.log("WebWorker works!");
      console.log('Cluster: ' + cluster);
      setLoading(false)
      setCluster(cluster)
  })

  }, [sketchWork, setLoading, setCluster]);

  return (
    <main className="App">
      <h1 className="text-center">PopPUNK-web Sequence Sketching</h1>
        <div >
          { (display === null &&  loading === false) && <DropZone onDrop = { onDrop } /> }
          { (display === null &&  loading === true) &&  <Loading /> }
          { display && <ClusterResult display={ display }/> }
        </div>
    </main>
  );
};

export default App;
