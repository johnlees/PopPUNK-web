onmessage = function(e) {
  const f = e.data[0];

  FS.mkdir('/working');
  FS.mount(WORKERFS, { files: [f] }, '/working');

  console.log('sketch result: ' + sketch.sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true));
}

import Module from './web_sketch.js'
const sketch = Module();
//self.importScripts('web_sketch.js');