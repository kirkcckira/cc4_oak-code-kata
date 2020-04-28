const fs = require("fs");

module.exports = function (path, extension, callback) {
  fs.readdir(path, (err, data) => {
    if (err) {
      return callback(err);
    }
    let arr = data.filter((file) => {
      return file.match("." + extension);
    });
    callback(null, arr);
  });
};
