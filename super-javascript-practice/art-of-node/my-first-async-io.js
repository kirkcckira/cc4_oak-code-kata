const fs = require("fs");

const contents = fs.readFile(process.argv[2], "utf8", (err, data) => {
  const lines = data.toString().split("\n").length - 1;
  console.log(lines);
});
