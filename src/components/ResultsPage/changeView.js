import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Network from './Network'
import Microreact from './Microreact'
import Plots from './Plots'
import Stats from './Statistics'
import Loading from '../LoadingPage/Loading'
import Tree from './Phylocanvas'

import DarkStatsIcon from './icons/noun_text_dark.png'
import LightStatsIcon from './icons/noun_text_light.png'
import DarkChartIcon from './icons/noun_bar chart_dark.png'
import LightChartIcon from './icons/noun_bar chart_light.png'
import DarkMicroIcon from './icons/noun_pandemic_dark.png'
import LightMicroIcon from './icons/noun_pandemic_light.png'
import DarkTreeIcon from './icons/noun_Binary tree_dark.png'
import LightTreeIcon from './icons/noun_Binary tree_light.png'
import DarkNetworkIcon from './icons/noun_Network_dark.png'
import LightNetworkIcon from './icons/noun_Network_light.png'

let count = 0

function ChangeView(props) {

    const [showStats, setShowStats] = useState(true)
    const [showPlots, setShowPlots] = useState(false)
    const [showMicroreact, setShowMicroreact] = useState(false)
    const [showPhylo, setShowPhylo] = useState(false)
    const [showCytoscape, setShowCytoscape] = useState(false)
    const [networkLoading, setNetworkLoading] = useState(true)
    const [recievedNetwork, setNetwork] = useState(null)
    const [recievedPhylogeny, setPhylogeny] = useState(null)

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

    const networkerPayload = {
        species: props.sketch.species,
        container_dir: props.display.container_dir
    };

    if (count === 0) {
        window.Worker[1].postMessage(networkerPayload);
        window.Worker[1].onmessage = function(NetEvent){
            if (networkLoading===true && recievedNetwork==null && (typeof NetEvent.data === "string")) {
                const response = JSON.parse(NetEvent.data);
                if (typeof response.phylogeny === "string") {
                    setNetwork(response.network);
                    setPhylogeny(response.phylogeny);
                    setNetworkLoading(false);
                    count += 1
                };
            };
        };
    };

    return (
        <div className={resultContainer_class}>
            <Navbar className="custom-navbar" style={{height:((props.CanvasHeight*0.065)+"px")}}expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav >
                    <Nav.Link className={"nav-link" + (showStats ? '-active' : '')} style={{fontSize:(props.CanvasHeight*0.016 + "px")}} id={"navbar-font" + (showStats ? '-active' : '')} onClick={ onStats }>
                        <img style={{height:((props.CanvasHeight*0.039877301)+"px"),width:((props.CanvasHeight*0.039877301)+"px")}} src={(showStats ? DarkStatsIcon:LightStatsIcon)} alt="stats-icon"/>
                        Metrics
                    </Nav.Link>
                    <Nav.Link className={"nav-link" + (showPlots ? '-active' : '')} style={{fontSize:(props.CanvasHeight*0.016 + "px")}} id={"navbar-font" + (showPlots ? '-active' : '')}  onClick={ onPlots }>
                        <img style={{height:((props.CanvasHeight*0.039877301)+"px"),width:((props.CanvasHeight*0.039877301)+"px")}} src={(showPlots ? DarkChartIcon:LightChartIcon)} alt="plot-icon"/>
                        Strain Prevalences
                    </Nav.Link>
                    <Nav.Link className={"nav-link" + (showMicroreact ? '-active' : '')} style={{fontSize:(props.CanvasHeight*0.016 + "px")}} id={"navbar-font" + (showMicroreact ? '-active' : '')}  onClick={ onMicrorreact }>
                        <img style={{height:((props.CanvasHeight*0.039877301)+"px"),width:((props.CanvasHeight*0.039877301)+"px")}} src={(showMicroreact ? DarkMicroIcon:LightMicroIcon)} alt="microreact-icon"/>
                        Population Phylogeny
                    </Nav.Link>
                    <Nav.Link className={"nav-link" + (showPhylo ? '-active' : '')} style={{fontSize:(props.CanvasHeight*0.016 + "px")}} id={"navbar-font" + (showPhylo ? '-active' : '')}  onClick={ onPhylo }>
                        <img style={{height:((props.CanvasHeight*0.039877301)+"px"),width:((props.CanvasHeight*0.039877301)+"px")}} src={(showPhylo ? DarkTreeIcon:LightTreeIcon)} alt="phylo-icon"/>
                        Within-Strain Phylogeny
                    </Nav.Link>
                    <Nav.Link className={"nav-link" + (showCytoscape ? '-active' : '')} style={{fontSize:(props.CanvasHeight*0.016 + "px")}} id={"navbar-font" + (showCytoscape ? '-active' : '')}  onClick={ onCytoscape }>
                        <img style={{height:((props.CanvasHeight*0.039877301)+"px"),width:((props.CanvasHeight*0.039877301)+"px")}} src={(showCytoscape ? DarkNetworkIcon:LightNetworkIcon)} alt="cyto-icon"/>
                        Within-Strain Network
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar >
            <div className={displayContainer_class}>
                <>
                    <div className={stats_class} style={{ height: props.CanvasHeight*0.530008357}}>
                        <Stats display={ props.display } sketch={ props.sketch } CanvasHeight={ props.CanvasHeight }/>
                    </div>
                    <div className={plot_class} style={{ height: props.CanvasHeight*0.530008357}}>
                        <Plots display={ props.display } />
                    </div>
                    <div className={microreact_class} style={{ height: props.CanvasHeight*0.9}}>
                        <Microreact URL={ props.display.microreactUrl } />
                    </div>
                    <div className={phylo_class} style={{ height: props.CanvasHeight*0.9}}>
                        { (networkLoading === true) && <Loading progress = "Fetching Cluster Phylogeny..."/> }
                        { (networkLoading === false && showPhylo === true && recievedPhylogeny !== "A tree cannot be built with fewer than 3 samples.") && <Tree phylogeny = { recievedPhylogeny } />}
                        { (networkLoading === false && showPhylo === true && recievedPhylogeny === "A tree cannot be built with fewer than 3 samples.") && <div className="text-center" style={{fontSize:(props.CanvasHeight*0.028382214 + "px")}}>{ recievedPhylogeny }</div>}
                    </div>
                    <div className={cytoscape_class} style={{ height: props.CanvasHeight*0.9}}>
                        { (networkLoading === true) && <Loading progress = "Fetching Network..."/> }
                        { (networkLoading === false) && <Network network = { recievedNetwork }/> }
                    </div>
                </>
            </div>
        </div>
    );
};

export default ChangeView;