import React, { useCallback, useState } from "react";
import './App.css';
//import WebWorker from './components/setup';
//import worker from './components/test.worker';
import DropZone from './components/DropZone';
import Loading from './components/Loading'
import ClusterResult from './components/clusterResult'
import worker from 'workerize-loader!./components/test.worker'; // eslint-disable-line import/no-webpack-loader-syntax


function App() {
  const [loading, setLoading] = useState(false) //define loading state
  const [sketch, setSketch] = useState(null) //define sketch state
  const [display, setCluster] = useState(null) //define result state

  const onDrop = useCallback(acceptedFiles => {
    setLoading(true)
    const workerInstance = worker();
    //Spawn worker, post file and retrieve response  
    workerInstance.sketchWorker(acceptedFiles); //call submit to webworker
    //Submit sequence to webworker for sketching

    workerInstance.addEventListener('message', (message) => {
      console.log("WebWorker works!");
      console.log('Sketch: ' + message.data);
      setSketch(message.data);

      const payload = {
        bbits: "14",
        sketchsize64: "156",
        kmers: "14"
        };
      
      console.log('Posting sketch to Flask!');
      fetch("http://localhost:5000/upload", {
        method: 'POST',
        mode: 'cors',
        headers : { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
         },
        body: JSON.stringify(payload),
        }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson);
      setCluster(responseJson);
      setLoading(false);
      console.log("Flask delay complete!");
      });
    });
  }, [setLoading, setSketch, setCluster]); //Recieve sketch, post to Flask and recieve response from Flask

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
