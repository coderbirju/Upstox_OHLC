const { Worker, isMainThread, parentPort } = require('worker_threads');


let startTradeTime = null;

if (isMainThread) {
  let readData = null;
  const worker = new Worker('./worker_1.js');
  worker.on('message', (message) => {
    if(startTradeTime === null){
      startTradeTime = message.TS2;
    }  
    readData = message;
    readData.startTime = startTradeTime;
    const worker2 = new Worker('./worker_2.js', {
      workerData: readData
    });
  });
} else {
  console.log(isMainThread); 
}
