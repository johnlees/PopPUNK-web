import React, { useCallback, useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import DropZone from './components/LandingPage/DropZone';
import Logo from './components/LandingPage/logo.png';
import Loading from './components/LoadingPage/Loading'
import ClusterResult from './components/ResultsPage/Results'

import './CSS/styles/App.css';
import './CSS/styles/LandingPage.css';
import './CSS/styles/LoadingPage.css';
import './CSS/styles/ResultsPage.css';
import './CSS/Fonts.css';

function App() {

  const [loading, setLoading] = useState(false); //define loading state
  const [progress, setStage] = useState("Sketching..."); //define result state
  const [sketch, setSketch] = useState(null); //define sketch state
  const [display, setCluster] = useState(null); //define result state

  const onDrop = useCallback(acceptedFiles => {
    
    setLoading(true);

    window.Worker.postMessage(acceptedFiles);
    window.Worker.onmessage = function(event){
      const sketch = event.data

      setStage("Assigning lineage...");
      setSketch(sketch)

      console.log('Posting sketch to Flask!');
      fetch("http://localhost:5000/upload", {
        method: 'POST',
        mode: 'cors',
        headers : { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sketch),
        }).then((response) => response.json()).then((responseJson) => {
      //const result = JSON.parse(responseJson);
      const result = JSON.parse(responseJson);
      console.log(result);
      setCluster(result);
      setLoading(false);
      console.log("Flask delay complete!");
    });
  };
}, [setLoading, setStage, setSketch, setCluster]); //Recieve sketch, post to Flask and recieve response from Flask
  
return (
    <main className='App'>
      <>
        <div className="flexbox-container">
          <img className='logo' src={Logo} alt="PopPUNK logo"/>
          <div id="title-font" className="title">Influenza & SARS-CoV-2</div>
          <Button style={{ marginLeft: "auto" }} href="https://poppunk.net/" variant="link">Return to PopPUNK homepage</Button>
        </div>
        <div>
          <div className="content-container">
            { (display === null &&  loading === false) && <DropZone onDrop = { onDrop } /> }
            { (display === null &&  loading === true) &&  <Loading progress = { progress }/> }
            { display && <ClusterResult display = { display } sketch = { sketch }/> }
            <div id="footer-font" className="footer-links">
              <ul>
                <a className="link" href="mailto:poppunk@poppunk.net">Contact</a>
                <a> | </a>
                <a className="link" href="https://github.com/johnlees/PopPUNK/issues">Report issues</a>
              </ul>
            </div>
          </div>
        </div>
      </>
    </main>
  );
};

export default App;