import React from 'react';
import Phylocanvas from 'phylocanvas'

const config = {
  fillCanvas: true,
  hoverLabel: true,
  lineWidth: 3,
  branchColour: 'rgb(70, 130, 180)'
};

class Phylo extends React.Component{
    constructor(props){
        super(props);
        this.renderPylocanvasElement = this.renderPylocanvasElement.bind(this);
      };
    renderPylocanvasElement(){
        const element = document.getElementById('trees');
        this.tree = Phylocanvas.createTree(element, config);
        this.tree.load(this.props.phylogeny);
        this.tree.setTreeType('radial');
        this.tree.setNodeSize(8);
        this.tree.setTextSize(20);
        this.tree.draw();
        console.log(this.tree)
    };
    componentDidMount() {
      this.renderPylocanvasElement();
    };
    componentDidUpdate(prevProps){
      this.renderPylocanvasElement();
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

export default Phylo;