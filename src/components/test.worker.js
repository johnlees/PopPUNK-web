//import Sketch from './web_sketch.js';

export default () => {
  
  onmessage = function(e) {
    const f = e.data[0];

    function sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }

    //var fs = require('browserify-fs');
    //fs.mkdir('/working');
    //fs.writeFile('/working', { files: [f] })
    //fs.mount(WORKERFS, { files: [f] }, '/working');

    //Sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true);

    
    //console.log('sketch result: ' + module.sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true));
    console.log('Sequence recieved!');
    sleep(3000);
    console.log(f)
    console.log("Delay complete!");

    const clusterPost = '3'
    this.postMessage(clusterPost)
  }
  
  //this.importScripts('web_sketch.js');
};