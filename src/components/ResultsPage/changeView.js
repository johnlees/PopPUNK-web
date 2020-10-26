import React, { useState } from "react";
import Microreact from './Microreact'
import Plots from './Plots'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function ShowHide(props) {
    const [showResults, setShowResults] = useState(true)
    const onClick = () => setShowResults(value => !value)
    return (
        <div className="result-container">
            <div className="result-toggler">
                <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={ onClick }>Plots</Nav.Link>
                        <Nav.Link onClick={ onClick }>Microreact</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar >
            </div>
            <div className="display-container">
                { showResults ? <Plots display={ props.display }/>: <Microreact /> }
            </div> 
        </div>
    );
};

export default ShowHide;
