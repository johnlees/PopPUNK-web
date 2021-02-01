import React, { Suspense, useCallback, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import DropZone from './components/LandingPage/DropZone';
import Loading from './components/LoadingPage/Loading'

import PopPUNKLogo from './components/LandingPage/PopPUNKLogo.png';
import FunderLogo from './components/LandingPage/funder_logos.png'

import './CSS/styles/App.css';
import './CSS/styles/LandingPage.css';
import './CSS/styles/LoadingPage.css';
import './CSS/styles/ResultsPage.css';
import './CSS/Fonts.css';

const ChangeView = React.lazy(() => import('./components/ResultsPage/changeView'));

function App() {

  const [windowWidth, setWidth] = useState(window.outerWidth)
  const [windowHeight, setHeight] = useState(window.outerHeight)

  const updateDimensions = () => {
    setWidth(window.outerWidth);
    setHeight(window.outerHeight);
  };

  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const [loading, setLoading] = useState(false); //define loading state
  const [progress, setStage] = useState("Sketching..."); //define result state
  const [sketchResult, setSketch] = useState(null); //define sketch state
  const [display, setCluster] = useState(null); //define result state

  const onDrop = useCallback(acceptedFiles => {

    setLoading(true);

    window.Worker[0].postMessage(acceptedFiles);
    window.Worker[0].onmessage = function(event){

      const sketch = event.data
      setStage("Assigning lineage...");
      const sketchObj = JSON.parse(sketch);
      const species = "S.pneumoniae";
      sketchObj.species = species;
      setSketch(sketchObj)
      fetch("https://poppunk-api.azurewebsites.net:443/upload", {
        method: 'POST',
        mode: 'cors',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'sketch': sketch, 'species': species}),
        }).then((response) => response.json()).then((responseJson) => {
      setStage("Building network...");
      const result = JSON.parse(responseJson);
      setCluster(result);
      setLoading(false);
    });
  };
}, [setLoading, setStage, setSketch, setCluster]); //Recieve sketch, post to Flask and recieve response from Flask

return (
    <main className='App' style={{height: windowHeight + "px", width: windowWidth + " px"}}>
      <>
        <div className="flexbox-container" style={{height: (windowHeight*0.12 + "px"), width: windowWidth + "px"}}>
          <img className='logo' src={PopPUNKLogo} alt="PopPUNK logo"/>
          <div id="title-font" className="title" style={{fontSize:(windowHeight*0.040681173 + "px")}}>Lineage Assignment</div>
          <Button style={{ marginLeft: "auto", padding: "0% 5% 0% 0%", fontSize:(windowHeight*0.017975402 + "px")}} id="home-link" href="https://poppunk.net/" variant="link">Return to PopPUNK homepage</Button>
        </div>
        <div>
          { (display === null &&  loading === false) &&
          <div className="content-container" style={{height: (windowHeight*0.6 + "px"), width: windowWidth + "px"}} >
            <DropZone onDrop={ onDrop } CanvasHeight={ windowHeight } />
          </div> }
          { (display === null &&  loading === true) &&
          <div className="content-container" style={{height: (windowHeight*0.6 + "px"), width: windowWidth + "px"}} >
            <Loading progress = { progress } CanvasHeight={ windowHeight }/>
          </div> }
          { display &&
          <Suspense fallback={<Loading progress = { "Loading results page..." } CanvasHeight={ windowHeight }/>}>
            <ChangeView display = { display } sketch = { sketchResult } CanvasWidth={ windowWidth } CanvasHeight={ windowHeight }/>
          </Suspense>}
          <p className="credits" style={{fontSize:(windowHeight*0.017975402 + "px")}}> PopPUNK-web was developed by <a href="https://github.com/Danderson123">Daniel Anderson</a>, <a href="http://johnlees.me/">John Lees</a> and <a href="https://www.imperial.ac.uk/people/n.croucher">Nicholas Croucher</a></p>
          <p className="credits" style={{fontSize:(windowHeight*0.017975402 + "px")}}> With funding from:</p>
        </div>
        <div className="funder-container" style={{height: (windowHeight*0.07 + "px"), width: windowWidth + "px"}}>
          <div id="funder-font" className="funder-logos" style={{fontSize:(windowHeight*0.017975402 + "px")}}>
            <img className="MF-logo" src={FunderLogo} alt="Funded by Mozilla, MRC and Wellcome"/>
          </div>
        </div>
        <div id="footer-font" className="footer-links" style={{fontSize:(windowHeight*0.014191107 + "px")}}>
          <p>
            <a className="link" href="mailto:poppunk@poppunk.net">Contact</a> | <a className="link" href="https://github.com/johnlees/PopPUNK-web/issues">Report issues</a>
          </p>
        </div>
      </>
    </main>
  );
};

export default App;