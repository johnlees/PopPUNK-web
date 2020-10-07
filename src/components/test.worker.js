import { Module } from './web_sketch.js';

addEventListener('message', event => {
  const f = event.data[0];
  console.log('Sequence recieved!');
  console.log(f)


  var fs = require('browserify-fs');
  fs.mkdir('/working');
  fs.writeFile('/working', { files: [f] })
  fs.mount(fs.filesystems.WORKERFS, { files: [f] }, '/working');

  const sketch_mod = Module();

  console.log('sketch result: ' + sketch_mod.sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true));

  const clusterPost = '3'
  this.postMessage(clusterPost);
});

/*
export default () => {
  onmessage = function(e) {
    const f = e.data[0];
    console.log('Sequence recieved!');
    console.log(f)


    var fs = require('browserify-fs');
    fs.mkdir('/working');
    fs.writeFile('/working', { files: [f] })
    fs.mount(fs.filesystems.WORKERFS, { files: [f] }, '/working');

    const sketch_mod = Module();

    console.log('sketch result: ' + sketch_mod.sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true));

    const clusterPost = '3'
    this.postMessage(clusterPost)
  }
};
*/