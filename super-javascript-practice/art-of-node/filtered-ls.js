const fs = require("fs");

function func(path, extension) {
  fs.readdir(path, (err, data) => {
    let arr = data.filter((file) => {
      return file.match("." + extension);
    });
    arr.forEach((file) => {
      console.log(file);
    });
  });
}
func(process.argv[2], process.argv[3]);
