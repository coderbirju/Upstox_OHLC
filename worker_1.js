const readline = require('readline');
const fs = require('fs');
const { parentPort } = require('worker_threads');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./dataset/test.json'),
    output: false,
    console: false
});

readInterface.on('line', (line)=> {
    const parsedData = JSON.parse(line);  
    parentPort.postMessage(parsedData);
});

readInterface.on('close', () => {
    console.log("Closes readstream");
    parentPort.postMessage("");
})



