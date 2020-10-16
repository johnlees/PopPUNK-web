const worker = new Worker("worker.js");
const f = document.getElementById("in-file").files[0];
worker.postMessage([ f ]);