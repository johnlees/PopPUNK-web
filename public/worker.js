onmessage = function(e) {
  const f = e.data[0];

  const sketch = Module.sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true);
  console.log(sketch)
  postMessage(sketch)
}

self.importScripts('web_sketch.js');