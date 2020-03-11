const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./dataset/test.json'),
    output: false,
    console: false
});

readInterface.on('line', (line)=> {
    console.log(line);
});

// const readableStream = fs.createReadStream('./dataset/test.json');
// let data = '';

// readableStream.on('data', function(chunk) {
//     data+=chunk;
// });

// readableStream.on('end', function() {
//     console.log(data);
// });
