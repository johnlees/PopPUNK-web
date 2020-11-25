import React from 'react';
import Phylocanvas from 'phylocanvas'

const config = {
  fillCanvas: true,
  hoverLabel: true
};

class Phylo extends React.Component{
    constructor(props){
        super(props);
        this.renderPylocanvasElement = this.renderPylocanvasElement.bind(this);
      };

    renderPylocanvasElement(){
        const element = document.getElementById('trees');
        this.cy = Phylocanvas.createTree(element, config);

        this.cy.load(this.props.phylogeny);
        this.cy.setTreeType('radial');
        this.cy.draw(true)
        console.log(this.cy)
    };

    componentDidMount(){
        this.renderPylocanvasElement();
    }

    componentDidUpdate(){
      this.renderPylocanvasElement();
  }
    render() {
      return (
        <div>
        </div>
      );
    }
}

export default Phylo;