import React, { useCallback, useEffect } from "react";
import WebWorker from "./setup";
import worker from "./test.worker";
import DropZone from './components/DropZone';

function launchWorker() {

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

export default launchWorker;

