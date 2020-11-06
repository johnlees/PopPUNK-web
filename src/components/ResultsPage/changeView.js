import React, { useState } from "react";
import Microreact from './Microreact'
import Plots from './Plots'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';

function ShowHide(props) {

    function handleSaveToPC(jsonData) {
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'sketch.json';
        link.href = url;
        link.click();
    };

    const [showStats, setShowStats] = useState(true)
    const [showPlots, setShowPlots] = useState(false)
    const [showMicroreact, setShowMicroreact] = useState(false)
    
    const onStats = () => {
        setShowStats(true)
        setShowPlots(false)
        setShowMicroreact(false)
    };

    const onPlots = () => {
        setShowStats(false)
        setShowPlots(true)
        setShowMicroreact(false)
    };

    const onMicrorreact = () => {
        setShowStats(false)
        setShowPlots(false)
        setShowMicroreact(true)
    };

    const stats_class = showStats ? "show-Stats" : "hide-Stats"
    const plot_class = showPlots ? "show-Plots" : "hide-Plots"
    const microreact_class = showMicroreact ? "show-Microreact" : "hide-Microreact"

    return (
        <div className="result-container">
            <Navbar style={{backgroundColor: '#F5F5F5'}} expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={ onStats }>Statistics</Nav.Link>
                    <Nav.Link onClick={ onPlots }>Plots</Nav.Link>
                    <Nav.Link onClick={ onMicrorreact }>Microreact</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar >
            <div className="display-container">
                <>
                    <div className={stats_class}>
                        <h4><p>Species: {props.display.species}</p><p>Cluster ID: {props.display.query}</p><p>Prevalence: {props.display.prev}</p><p>Other: {props.display.other}</p></h4>
                        <p><Button className='download-button' variant="outline-primary" onClick={ handleSaveToPC.bind(null, props.sketch) } >Download sketch</Button></p>
                     </div>
                    <div className={plot_class}>
                        <Plots display={ props.display }/>
                    </div>
                    <div className={microreact_class}>
                        <Microreact URL={ props.display.microreactUrl }/> 
                    </div>
                </>
            </div> 
        </div>
    );
};

export default ShowHide;