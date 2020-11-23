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
            <div className="item1">
                <h3>General</h3>
                    <h5 className="padding-tab">
                        <p>Species:</p>
                        <p className="tab" id="italics"> {props.display.species}</p>
                        <p>Cluster ID:</p>
                        <p className="tab">{props.display.query}</p>
                        <p>Prevalence:</p>
                        <p className="tab">{props.display.prev}</p>
                        <Button className='download-button' variant="outline-primary" onClick={ handleSaveToPC.bind(null, props.sketch) } >Download sketch</Button>
                    </h5>
            </div>
            <div className="item2">
                <h3>Sequence quality</h3>
                    <h5 className="padding-tab">
                        <p>Genome length:</p> 
                        <p className="tab">{props.sketch.length}</p>
                        <p>Number of missing bases: </p>
                        <p className="tab">{props.sketch.missing_bases}</p>
                        <p>Base frequencies:</p>
                        <p className="tab">A: {roundToTwo(props.sketch.bases[0])}</p>
                        <p className="tab">C: {roundToTwo(props.sketch.bases[1])}</p>
                        <p className="tab">G: {roundToTwo(props.sketch.bases[2])}</p>
                        <p className="tab">T: {roundToTwo(props.sketch.bases[3])}</p>
                    </h5>
            </div>
        </>
    );
};

export default Statistics;