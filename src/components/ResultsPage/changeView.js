import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Microreact from './Microreact'
import Plots from './Plots'
import Stats from './Statistics'

function ShowHide(props) {

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

    const resultContainer_class = showMicroreact ? "extended-result-container" : "result-container"
    const displayContainer_class = showMicroreact ? "extended-display-container" : "display-container"

    return (
        <div className={resultContainer_class}>
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
            <div className={displayContainer_class}>
                <>
                    <div className={stats_class}>
                        <Stats display={ props.display } sketch={ props.sketch }/>
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