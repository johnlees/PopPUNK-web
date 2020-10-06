
const worker = new Worker("/worker.js");
function onClick() {
    const f = document.getElementById("in-file").files[0];
    worker.postMessage([ f ]);
}
