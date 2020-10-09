export const sketchWorker = (e) => {
  const f = e.data;

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  };

    //var fs = require('browserify-fs');
    //fs.mkdir('/working');
    //fs.writeFile('/working', { files: [f] })
    //fs.mount(WORKERFS, { files: [f] }, '/working');

    //Sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true);

    
    //console.log('sketch result: ' + module.sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true));
    //sleep(2000);
    //console.log("Webworker delay complete!");

  const clusterPost = 'Worker-loader worker works!';
  postMessage(clusterPost);
};
  
  //this.importScripts('web_sketch.js');
