// app.js

import fs from 'fs';
import { Worker, isMainThread } from 'worker_threads';
import path from 'path';

const input = process.argv[process.argv.length - 1];
const filesArr = new Promise((res, rej) => {
  fs.readdir(input, { recursive: true }, (err, files) => {
    if (err) {
      rej(err.message);
    }
    res(files);
  });
})
filesArr
  .then((data) => {
    if (isMainThread) {
      const workers = [];
      for (let i = 0; i < 10; i++) {
        const worker = new Worker('./function.js',{workerData:{ input, fileName: data[i]}});
        workers.push(worker);
      }
      workers.forEach((worker) => {
        worker.on('message', (mes) => {
          console.log(mes); 
        });
        worker.on('exit', () => {
          console.log('Worker finished');
        })
      })
    }
  })
  .catch((err) => console.log(err))
