import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Network from './Network'
import Microreact from './Microreact'
import Plots from './Plots'
import Stats from './Statistics'
import Loading from '../LoadingPage/Loading'

function ChangeView(props) {

    const [showStats, setShowStats] = useState(true)
    const [showPlots, setShowPlots] = useState(false)
    const [showMicroreact, setShowMicroreact] = useState(false)
    const [showPhylo, setShowPhylo] = useState(false)
    const [showCytoscape, setShowCytoscape] = useState(false)
    const [networkLoading, setNetworkLoading] = useState(true)
    const [recievedNetwork, setNetwork] = useState(null)

    const onStats = () => {
        setShowStats(true)
        setShowPlots(false)
        setShowMicroreact(false)
        setShowCytoscape(false)
        setShowPhylo(false)
    };

    const onPlots = () => {
        setShowStats(false)
        setShowPlots(true)
        setShowMicroreact(false)
        setShowCytoscape(false)
        setShowPhylo(false)
    };

    const onMicrorreact = () => {
        setShowStats(false)
        setShowPlots(false)
        setShowMicroreact(true)
        setShowCytoscape(false)
        setShowPhylo(false)
    };

    const onPhylo = () => {
        setShowStats(false)
        setShowPlots(false)
        setShowMicroreact(false)
        setShowCytoscape(false)
        setShowPhylo(true)
    };

    const onCytoscape = () => {
        setShowStats(false)
        setShowPlots(false)
        setShowMicroreact(false)
        setShowCytoscape(true)
        setShowPhylo(false)
    };

    const stats_class = showStats ? "show-Stats" : "hide-Stats"
    const plot_class = showPlots ? "show-Plots" : "hide-Plots"
    const microreact_class = showMicroreact ? "show-Microreact" : "hide-Microreact"
    const phylo_class = showPhylo ? "show-Phylo" : "hide-Phylo"
    const cytoscape_class = showCytoscape ? "show-Cytoscape" : "hide-Cytoscape"

    const resultContainer_class = (showMicroreact || showCytoscape || showPhylo) ? "extended-result-container" : "result-container"
    const displayContainer_class = (showMicroreact || showCytoscape || showPhylo) ? "extended-display-container" : "display-container"

    window.Worker[1].postMessage(props.sketch.species);
    window.Worker[1].onmessage = function(NetEvent){
        if (networkLoading===true && recievedNetwork==null) {
            const net = JSON.parse(NetEvent.data);
            setNetwork(net);
            setNetworkLoading(false);
        };
    };

    return (

        <div className={resultContainer_class}>
            <Navbar className="custom-navbar" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav >
                    <Nav.Link className={"nav-link" + (showStats ? '-active' : '')} id={"navbar-font" + (showStats ? '-active' : '')} onClick={ onStats }>Statistics</Nav.Link>
                    <Nav.Link className={"nav-link" + (showPlots ? '-active' : '')} id={"navbar-font" + (showPlots ? '-active' : '')}  onClick={ onPlots }>Plots</Nav.Link>
                    <Nav.Link className={"nav-link" + (showMicroreact ? '-active' : '')} id={"navbar-font" + (showMicroreact ? '-active' : '')}  onClick={ onMicrorreact }>Microreact</Nav.Link>
                    <Nav.Link className={"nav-link" + (showCytoscape ? '-active' : '')} id={"navbar-font" + (showCytoscape ? '-active' : '')}  onClick={ onCytoscape }>Network</Nav.Link>
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
                    <div className={cytoscape_class}>
                        { (networkLoading === true) && <Loading progress = "Fetching Network..."/> }
                        { (networkLoading === false) && <Network network = { recievedNetwork.network }/> }
                    </div>
                </>
            </div>
        </div>
    );
};

export default ChangeView;