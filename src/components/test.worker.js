export const sketchWorker = (e) => {
  const f = e.data;
  
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  };

  sleep(1000);

  const clusterPost = 'Worker-loader works!';
  postMessage(clusterPost);
};