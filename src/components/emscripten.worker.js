import Module from "./web_sketch"
//https://github.com/jvilk/BrowserFS

export const sketchWorker = (e) => {{
    const f = e.data;
    
    const FS = require('browserify-fs')
    FS.mkdir('/working');
    FS.mount(WORKERFS, { files: [f] }, '/working');

    Module.sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true);

    const clusterPost = 'Worker-loader works!';
    postMessage(clusterPost);
  };
  self.importScripts('web_sketch.js');
};
    