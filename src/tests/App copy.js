import React, { useCallback, useEffect } from "react";
import './App.css';
import DropZone from './components/DropZone';
import WebWorker from "./setup";
import worker from "./test.worker";

function App() {

  let sketchWork = new WebWorker(worker);  // Declare worker
  // Constants declaration
  const onDrop = useCallback(acceptedFiles => {
      sketchWork.postMessage(acceptedFiles);
      console.log("Sequence posted!");
    }, [sketchWork]);

  useEffect(() => {
    sketchWork.addEventListener("message", event => {
      console.log("WebWorker works!");
      console.log('Cluster: ' + event.data);
    });
  }, [sketchWork]); 

  return (
    <main className="App">
      <h1 className="text-center">PopPUNK-web Sequence Sketching</h1>
        <div>
          <DropZone onDrop = {onDrop} />
        </div>
    </main>
  );
};

export default App;

{ loading?<Loader type="Circles" color="#00BFFF" height={100}  width={100} /> : <DropZone onDrop = { onDrop } /> }
          { display && <p>Cluster ID: {display} </p> }

          { display === null && loading ? <Loader type="Circles" color="#00BFFF" height={100}  width={100} /> : <DropZone onDrop = { onDrop } /> } 
          { display && <p>Cluster ID: {display} </p> }