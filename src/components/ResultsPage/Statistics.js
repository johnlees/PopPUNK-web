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
                <h3 style={{fontSize:(props.CanvasHeight*0.028382214 + "px")}}>General</h3>
                    <h5 className="padding-tab">
                        <p style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>Species:</p>
                        <p className="tab" id="italics" style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}> {props.display.species}</p>
                        <p style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>Strain ID:</p>
                        <p className="tab" style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>{props.display.query}</p>
                        <p style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>Aliases:</p>
                            {Object.entries(props.display.aliases)
                                .map( ([key, value]) => <p className="tab" style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>{key + ': ' + value}</p> )
                            }
                        <p style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>Strain prevalence:</p>
                        <p className="tab" style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>{props.display.prev}</p>
                        <Button className='download-button' variant="outline-primary" onClick={ handleSaveToPC.bind(null, props.sketch) } style={{fontSize:(props.CanvasHeight*0.019 + "px")}}>
                            Download sketch
                        </Button>
                    </h5>
            </div>
            <div className="item2">
                <h3 style={{fontSize:(props.CanvasHeight*0.028382214 + "px")}}>Sequence quality</h3>
                    <h5 className="padding-tab">
                        <p style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>Genome length:</p>
                        <p className="tab" style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>{props.sketch.length}</p>
                        <p style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>Number of missing bases: </p>
                        <p className="tab" style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>{props.sketch.missing_bases}</p>
                        <p style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>Base frequencies:</p>
                        <p className="tab" style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>A: {roundToTwo(props.sketch.bases[0])}</p>
                        <p className="tab" style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>C: {roundToTwo(props.sketch.bases[1])}</p>
                        <p className="tab" style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>G: {roundToTwo(props.sketch.bases[2])}</p>
                        <p className="tab" style={{fontSize:(props.CanvasHeight*0.020813623 + "px")}}>T: {roundToTwo(props.sketch.bases[3])}</p>
                    </h5>
            </div>
        </>
    );
};

export default Statistics;