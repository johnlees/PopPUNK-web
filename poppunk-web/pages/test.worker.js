self.addEventListener('message', (event) => console.log('Worker received:', event.data));

    //const f = e.data;

    //FS.mkdir('/working');
    //FS.mount(WORKERFS, { files: [f] }, '/working');
    //const sketch = 'sketch result: ' + Sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true)
    //postMessage(sketch)
    

  // Create the folder that we'll turn into a mount point.
    // Mount BFS's root folder into the '/data' folder.

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  };
sleep(2000)
self.postMessage('from Worker');
//console.log('sketch result: ' + Module.sketch('/working/' + f.name, 15, 27, 2, 14, 156, false, true));
const clusterPost = 'Worker-loader worker works!';
//postMessage(clusterPost);
