// csvToJson.js

import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';

async function csvToJson(input, fileName) {
  return new Promise((res, rej) => {
    const outputPath = path.join('converted', `${fileName}.json`);
    const readableStream = fs.createReadStream(path.join(input, fileName));
    const writableStream = fs.createWriteStream(outputPath);

    readableStream.pipe(csvParser())
      .on('data', (data) => {
        data = JSON.stringify(data);
        writableStream.write(`${data}\n`);
      })
      .on('end', () => {
        console.log(`conversion completed for ${fileName}`);
        writableStream.end();
        res();
      })
      .on('error', (err) => {
        console.error(`error converting ${fileName}: ${err.message}`);
        rej(err);
      })

    writableStream.on('close', () => {
      console.log(`conversion closed for ${fileName}`);
    })
  })
}

export default csvToJson;
