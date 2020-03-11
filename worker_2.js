const { Worker, parentPort, workerData } = require('worker_threads');
const moment = require('moment');



const data = workerData;
console.log('data: ', data);


const convertToSeconds = (num) => {
    return (num / 1000000).toFixed(6) * 1;
}
