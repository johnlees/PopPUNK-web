import React from 'react';
import Phylocanvas from 'phylocanvas'

const config = {
  fillCanvas: true,
  hoverLabel: true,
  lineWidth: 3,
  branchColour: 'rgb(70, 130, 180)'
};

var count = 0

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
        var index = 0;
        while (index < this.tree.leaves.length) {
          console.log(index)
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
          this.tree.draw();
          index++;
        } else {
            index++;
          };
        };
      };

    componentDidMount() {
      this.renderPylocanvasElement();
    };

    componentDidUpdate(){
      if (count===0) {
        this.renderPylocanvasElement();
        count += 1
      };
    };
    render() {
      return (
          <div ref={this.phyloRef} style={{height:'100%', weight:'100%'}}></div>
      );
    }
}

export default Phylo;