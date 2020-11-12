import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import cise from 'cytoscape-cise';

cytoscape.use(cise);

let cyStyle = {
    height: '100%',
    width: '100%'
};

let conf = {
    boxSelectionEnabled: false,
    autounselectify: true,
    zoomingEnabled: true,
    style: [
        {
            selector: 'node',
            style: {
                'text-opacity': 0.5,
                'text-valign': 'center',
                'text-halign': 'right',
                'background-color': "#4682B4",
                'border-color': "#bfbfbf",
                'border-width': "0.6",
                'border-style': "solid"
               },
            },
        {
            selector: 'node[label = "6569_7#1"]',
            style: {
                'text-opacity': 0.5,
                'text-valign': 'center',
                'text-halign': 'right',
                'background-color': "#ff6666",
                'border-color': "#bfbfbf",
                'border-width': "1",
                'border-style': "solid"
                },
        },
        {
            selector: 'edge',
            style: {
                'width': 0.1,
            }
        }
    ],
    layout: {
        name: 'cise'
    }
};

class Network extends Component {
    constructor(props) {
        super(props);
        this.state = { cy: {} }
    }

    componentDidMount() {
        conf.container = this.cyRef;
        conf.elements = this.props.network;
        const cy = cytoscape(conf);
        this.state = { cy };
        console.log(conf)
        // cy.json();
    }

    render() {
        return <div style={cyStyle} ref={(cyRef) => {
            this.cyRef = cyRef;
        }}/>
    }
}

export default Network;