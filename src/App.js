import React, { useCallback, useEffect, useState } from "react";
import './App.css';
//import launchWorker from './launchWorker'
import WebWorker from './components/setup';
import worker from './components/test.worker';
//import worker from './components/flaskComponent';
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
      console.log('Sketch: ' + event.data);

      var data = new FormData();
      const payload = {
          bbits: "14",
          sketchsize64: "156",
          kmers: "14"
      };
      data.append("jsonsketch", JSON.stringify(payload));
      
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
      })
      setLoading(false)
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
