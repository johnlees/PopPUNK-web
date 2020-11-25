import React, { useRef, useEffect } from 'react';
import PhyloCanvas from 'phylocanvas';

export default function Phylocanvas() {
  const containerRef = useRef();
  
  useEffect(() => {
    const config = {
      containerElement: containerRef.current
    }
    console.log(PhyloCanvas)
    const tree = PhyloCanvas.createTree('phylocanvas',config);
    console.log(tree)
    tree.load('(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;');
  }, []);

  return (
      <div ref={containerRef} style={ {height: "100%", width: "100%"}} />
  );
};
