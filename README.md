# Upstox_OHLC

## Features
* NodeJs worker threads

## Installation
This project requires Node.js v11+ to run. Note: If you are using old nodeJs versions you may have to use --experimental-worker flag.
Install the dependencies and devDependencies and start the server.
```
 $ cd Upstox_OHLC
 $ npm install
 $ node index.js
 
```

*The dataset is a slice of the actual dataset provided (100 entries)
 To test on actual dataset add the dataset.json file into the dataset folder and add the path to Upstox_OHLC/worker_1.js
 line 7*
 ```
 input: fs.createReadStream('path') 
 ```

*To subscribe to a particular stock of name 'ABCD' add the string into  Upstox_OHLC/index.js
 line 21*
```
worker2.postMessage("ABCD");
```
