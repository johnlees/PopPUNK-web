onmessage = function(message) {  
  var instance;
  WebSketch().then(module => {
    console.log(module)
    instance = module;
    const f = message.data[0];
    console.log(f);

    module.FS.mkdir('/working');
    module.FS.mount(module.FS.filesystems.WORKERFS, { files: [f] }, '/working');
    console.log('sketch result: ' + module.sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true));
  });
};
self.importScripts('./web_sketch.js');
