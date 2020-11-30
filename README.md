## Introduction

This repository holds the source code for the PopPUNK-web application. PopPUNK-web makes use of WebAssembly for in-browser, client-side k-mer sketching, and a Python backend for query assignment and generation of visualisations. As we make use of several languages in a single pipeline, there are a few considerations for development purposes.

## Testing

To locally host PopPUNK-web in development mode at http://localhost:3000, run:
```
git clone https://github.com/johnlees/PopPUNK-web
cd PopPUNK-web
npm start
```
To test the backend, ensure PopPUNK is installed (https://github.com/johnlees/PopPUNK), open a second terminal and run the Python API using:
```
git clone https://github.com/johnlees/PopPUNK
cd PopPUNK
python poppunk_api-runner.py
```

## Compiling the WebAssembly

The sketching code is based in C++ and can be found at https://github.com/johnlees/pp-sketchlib. To compile the files necessary for web sketching, you will need to download and activate an emsdk environment, then compile using emscripten (https://emscripten.org/index.html). This can be done by running:
```
# Get the emsdk and pp-sketchlib repos
git clone https://github.com/emscripten-core/emsdk.git
git clone https://github.com/johnlees/pp-sketchlib
source ./emsdk/emsdk_env.sh
./emsdk/emsdk activate latest
cd pp-sketchlib/src && make web
```
This will build “web_sketch.js” and “web_sketch.wasm” in the web subdirectory of pp-sketchlib/src. These files can then be read by PopPUNK-web when placed in the public directory of the bundle.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
