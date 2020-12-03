import React from 'react';
import Phylocanvas from 'phylocanvas'

const config = {
  fillCanvas: true,
  hoverLabel: true,
  lineWidth: 3,
  branchColour: 'rgb(70, 130, 180)',
};

class Phylo extends React.Component{
    constructor(props){
        super(props);
        this.phyloRef = React.createRef();
        this.renderPylocanvasElement = this.renderPylocanvasElement.bind(this);
      };
    renderPylocanvasElement(){
        this.tree = Phylocanvas.createTree(this.phyloRef.current, config);
        this.tree.load(this.props.phylogeny);
        this.tree.setTreeType('rectangular');
        this.tree.setNodeSize(8);
        this.tree.setTextSize(20);
        this.tree.resizeToContainer();
        var index = 0;
        while (index < this.tree.leaves.length) {
          if (this.tree.leaves[index].id === "query"){
            this.tree.leaves[index].setDisplay({
              colour: 'red',
              shape: 'circle',
              size: 2,
              labelStyle: {
                colour: 'red',
                textSize: 20,
                font: 'Arial',
                format: 'bold'
              }
          });
          this.tree.draw(true);
          index++;
        } else {
            index++;
          };
        };
      };

    componentDidMount() {
      this.renderPylocanvasElement();
    };

    componentDidUpdate(prevProps){
      if (prevProps.phylogeny !== this.props.phylogeny) {
        this.renderPylocanvasElement();
      };
    };

    render() {
      return (
          <div ref={this.phyloRef} style={{height:'100%', width:'100%'}}></div>
      );
    }
}

export default Phylo;
