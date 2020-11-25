onmessage = function(message) {  
  var instance;

  WebSketch().then(module => {
    const t0 = performance.now();

    instance = module;
    const f = message.data[0];

    module.FS.mkdir('/working');
    module.FS.mount(module.FS.filesystems.WORKERFS, { files: [f] }, '/working');

    const sketch = module.sketch('/working/' + f.name, 14, 29, 3, 14, 156, false, true)

    const t1 = performance.now();
    console.log("Sketch took " + (t1 - t0) + " milliseconds.");
    self.postMessage(sketch);
  });
};

self.importScripts('./web_sketch.js');
