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

readInterface.on('line', (line)=> {
    const parsedData = JSON.parse(line);
    const tsSeconds = convertToSeconds(parsedData.TS2);
    parsedData.TS2 = tsSeconds;  
    parentPort.postMessage(parsedData);
});



