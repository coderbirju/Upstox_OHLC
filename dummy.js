// index



const http = require("http");
const express = require("express");
const app = express();
const port = 3000;
// const hostname = '127.0.0.1';
const { Worker, isMainThread, parentPort } = require('worker_threads');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

if (isMainThread) {
  const worker = new Worker('./worker_1.js');
  console.log('worker: ', worker);
  // const worker2 = new Worker('./worker_2.js');
  // // worker.on('message', (msg) => { console.log(msg); });
  // worker.on('message', (message, data) => {
  //   worker2.postMessage(data);
  // });
} else {
  console.log(isMainThread); 
}




app.get('/', (req, res) => {
    res.send('Hello Arjun')
});

app.listen(port, () => {
    console.log('Example app listening on port 3000!')
});



















// worker 2

const readline = require('readline');
const fs = require('fs');
const moment = require('moment');
const { Worker, parentPort } = require('worker_threads');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./dataset/test.json'),
    output: false,
    console: false
});

// worker 2
const convertToSeconds = (num) => {
    return (num / 1000000).toFixed(6) * 1;
}

let tradeStartTime = moment();
let timeSlice = [];
let barDataArray = [];
let prevTimeSLice = 0;
let singleBarData = [];
readInterface.on('line', (line)=> {
    const parsedData = JSON.parse(line);
    const tsSeconds = convertToSeconds(parsedData.TS2);
    if((tsSeconds - prevTimeSLice) < 15){
        singleBarData.push(parsedData)
    } else {
        singleBarData = []
    }
    timeSlice.push(Date(tsSeconds));
    const worker2 = new Worker('./worker_2.js', {
        workerData: {
          value: tsSeconds
        }
      });
    
 parentPort.postMessage(tsSeconds);
});



