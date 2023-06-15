// function.js

import { workerData, parentPort } from 'worker_threads';
import csvToJson from './csvToJson.js';

csvToJson(workerData.input, workerData.fileName)
  .then(() => {
    parentPort.postMessage(`conversion completed for ${workerData.fileName}`);
    process.exit(1)
  })
  .catch((err) => {
    console.error(`error converting :${workerData.fileName}: ${err.message}`);
    parentPort.postMessage(`error converting :${workerData.fileName}`);
  })
  
