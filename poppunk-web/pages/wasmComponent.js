import fs from "fs";

export async function getStaticProps() {
    
    fs.mkdir('/working');
    fs.mount(WORKERFS, { file: [f] }, '/working');
    const wasmcomp = "SP works!"
    return {
      props: { wasmcomp }
  };
};