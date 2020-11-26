import React from 'react';
import cytoscape from 'cytoscape';
import cise from 'cytoscape-cise';

class Cyto extends React.Component{
    constructor(props){
        super(props);
        this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    }

    renderCytoscapeElement(){
        cytoscape.use(cise);
        this.cy = cytoscape(
        {
            container: document.getElementById('cy'),

            animate: true, // Whether to show the layout as it's running
            ready: undefined, // Callback on layoutready
            boxSelectionEnabled: false,
            autounselectify: true,
            zoomingEnabled: true,
            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'text-opacity': 0.5,
                    'text-valign': 'center',
                    'text-halign': 'right',
                    'background-color': "#4682B4",
                    'border-color': "#bfbfbf",
                    'border-width': "0.6",
                    'border-style': "solid"
                })
                .selector('edge')
                .css({'width': 0.4})
                .selector('node[label = "query"]')
                .css({'text-opacity': 0.5,
                'text-valign': 'center',
                'text-halign': 'right',
                'background-color': "#ff6666",
                'border-color': "#bfbfbf",
                'border-width': "1",
                'border-style': "solid"
                }),
            elements: this.props.network.elements,
            layout: { name: 'cise' }
            });
    }
    componentDidMount(){
        this.renderCytoscapeElement();
    };
    componentDidUpdate(prevProps){
        if (prevProps.network.elements !== this.props.network.elements) {
            this.renderCytoscapeElement();
        };
    };
      componentDidUnmout(){
        this.destroy();
    };

    render() {
    return (
        <div>
        </div>
    );
    }
}

export default Cyto;