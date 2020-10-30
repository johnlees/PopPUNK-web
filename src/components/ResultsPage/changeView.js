import React, { useState } from "react";
import Microreact from './Microreact'
import Plots from './Plots'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function ShowHide(props) {
    const [showPlots, setShowPlots] = useState(true)
    const [showMicroreact, setShowMicroreact] = useState(false)
    
    const onPlots = () => {
        setShowPlots(true)
        setShowMicroreact(false)
    };

    const onMicrorreact = () => {
        setShowPlots(false)
        setShowMicroreact(true)
    };

    const plot_class = showPlots ? "show-Plots" : "hide-Plots"
    const microreact_class = showMicroreact ? "show-Microreact" : "hide-Microreact"

    return (
        <div className="result-container">
            <div className="result-toggler">
                <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={ onPlots }>Plots</Nav.Link>
                        <Nav.Link onClick={ onMicrorreact }>Microreact</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar >
            </div>
            <div className="display-container">
                <>
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