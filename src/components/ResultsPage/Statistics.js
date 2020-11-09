import React from "react";
import Button from 'react-bootstrap/Button';

function Statistics(props) {

    function handleSaveToPC(jsonData) {
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'sketch.json';
        link.href = url;
        link.click();
    }; 

    function roundToTwo(num) {   
        const freq = parseFloat(num) 
        return +(Math.round(freq + "e+2")  + "e-2");
    }

    return (
        <>
            <h3>General</h3>
                <h5>
                    <p>Species: {props.display.species}</p>
                    <p>Cluster ID: {props.display.query}</p>
                    <p>Prevalence: {props.display.prev}</p>
                </h5>
            <h3>Sequence quality</h3>
                <h5>
                    <p>Genome length: {props.sketch.length}</p>
                    <p>Number of missing bases: {props.sketch.missing_bases}</p>
                    <p>Base frequencies:</p>
                    <p>A: {roundToTwo(props.sketch.bases[0])}</p>
                    <p>C: {roundToTwo(props.sketch.bases[1])}</p>
                    <p>G: {roundToTwo(props.sketch.bases[2])}</p>
                    <p>T: {roundToTwo(props.sketch.bases[3])}</p>
                </h5>
            <p><Button className='download-button' variant="outline-primary" onClick={ handleSaveToPC.bind(null, props.sketch) } >Download sketch</Button></p>
        </>
    );
};

export default Statistics;