import React from 'react';
import cytoscape from 'cytoscape';
import cise from 'cytoscape-cise';

class Cyto extends React.Component{
    constructor(props){
        super(props);
        this.cytoRef = React.createRef();
        this.queryNode = "n" + (this.props.network.elements.nodes.length - 1)
        this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    }

    renderCytoscapeElement(){
        cytoscape.use(cise);
        this.cy = cytoscape(
        {
            container: this.cytoRef.current,

            animate: true, // Whether to show the layout as it's running
            ready: undefined, // Callback on layoutready
            boxSelectionEnabled: false,
            autounselectify: true,
            zoomingEnabled: true,
            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'label': 'data(label)',
                    'text-opacity': 0.5,
                    'text-valign': 'center',
                    'text-halign': 'right',
                    'background-color': "#4682B4",
                    'border-color': "#bfbfbf",
                    'border-width': "0.6",
                    'border-style': "solid",
                    "font-size": "12px"
                })
                .selector('edge')
                .css({'width': 0.4})
                .selector('node[label = "query"]')
                .css({'text-opacity': 0.5,
                'text-valign': 'center',
                'text-halign': 'right',
                'background-color': "red",
                'border-color': "#bfbfbf",
                'border-width': "1",
                'border-style': "solid"
                })
                .selector('edge[source = "' + this.queryNode + '"]')
                .css({"line-color": "red"})
                .selector('edge[target = "' + this.queryNode + '"]')
                .css({"line-color": "red"}),
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
        <div ref={this.cytoRef} style={{height:'100%', width:'100%'}}></div>
    );
    }
}

export default Cyto;