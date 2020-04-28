const fs = require("fs");

let newLineFile = fs.readFileSync(process.argv[2], "utf8");
console.log(newLineFile.toString().match(/\n/g).length);
