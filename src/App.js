import React, { useCallback, useEffect, useState } from "react";
import './App.css';
//import launchWorker from './launchWorker'
import WebWorker from './components/setup';
import worker from './components/test.worker';
import DropZone from './components/DropZone';
import Loading from './components/Loading'
import ClusterResult from './components/clusterResult'

function App() {
  const [loading, setLoading] = useState(false) //define loading state
  const [display, setCluster] = useState(null) //define result state

  let sketchWork = new WebWorker(worker);  // Declare worker
  // Constants declaration
  const onDrop = useCallback(acceptedFiles => {
      setLoading(true)
      console.log(loading);
      sketchWork.postMessage(acceptedFiles);
      console.log("Sequence posted!");
    }, [sketchWork, setLoading]);

  useEffect(() => {
    sketchWork.addEventListener("message", event => {
      console.log("WebWorker works!");
      console.log('Cluster: ' + event.data);
      setLoading(false)
      setCluster(event.data)
    });
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
