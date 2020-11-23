import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import cise from 'cytoscape-cise';

Cytoscape.use(cise);

let cyStyle = {
    height: '100%',
    width: '100%'
};

let conf = {
    animate: true, // Whether to show the layout as it's running
    ready: undefined, // Callback on layoutready
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
            selector: 'node[label = "query"]',
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
                'width': 0.4,
            }
        }
    ]
};

const layout =  { name: 'cise' }

function Network(props) {
        return (
        <CytoscapeComponent elements={CytoscapeComponent.normalizeElements(props.network.elements)} style={cyStyle} stylesheet={conf.style} layout={layout}/>
        );
    }

export default Network;