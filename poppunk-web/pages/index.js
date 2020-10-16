import React, { useCallback, useState } from "react";

import styles from '../styles/Home.module.css'
//import worker from './components/test.worker';
import DropZone from './DropZone';
import Loading from './Loading'
import ClusterResult from './clusterResult'

//import Worker from './test.worker'; // eslint-disable-line import/no-webpack-loader-syntax

function Home() {
  const [loading, setLoading] = useState(false) //define loading state
  const [progress, setStage] = useState("Sketching...") //define result state
  const [sketch, setSketch] = useState(null) //define sketch state
  const [display, setCluster] = useState(null) //define result state

  const onSubmit = useCallback(values => {
    const data = new FormData();
    data.append("file", values[0]);
    fetch("/api/wasm_upload", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  });

  const onDrop = useCallback(acceptedFiles => {

    console.log(acceptedFiles[0])

    setLoading(true)

    setSketch('test');
    setStage("Assigning lineage...")

    const payload = {
      bbits: "14",
      sketchsize64: "156",
      kmers: "14"
      };
    
    setSketch(payload)

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
}, [setLoading, setStage, setSketch, setCluster]); //Recieve sketch, post to Flask and recieve response from Flask

  return (
    <main className={styles.App}>
      <h1 className={styles.text_center}>PopPUNK-web Sequence Sketching</h1>
        <div >
          { (display === null &&  loading === false) && <DropZone onDrop = { onSubmit } /> }
          { (display === null &&  loading === true) &&  <Loading progress = { progress }/> }
          { display && <ClusterResult display = { display } sketch = { sketch }/> }
        </div>
    </main>
  );
};

export default Home;