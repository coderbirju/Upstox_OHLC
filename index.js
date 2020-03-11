const http = require("http");
const express = require("express");
const app = express();
const port = 3000;
// const hostname = '127.0.0.1';
const { Worker, isMainThread } = require('worker_threads');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

if (isMainThread) {
  new Worker('./worker_1.js');
} else {
  console.log('Inside Worker!');
  console.log(isMainThread);  // Prints 'false'.
}


app.get('/', (req, res) => {
    res.send('Hello Arjun')
});

app.listen(port, () => {
    console.log('Example app listening on port 3000!')
  });