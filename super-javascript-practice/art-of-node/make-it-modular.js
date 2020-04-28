const mymodule = require("./mymodule.js");

mymodule(process.argv[2], process.argv[3], (err, data) => {
  if (err) {
    console.log("Error!");
    return err;
  }
  data.forEach((name) => {
    console.log(name);
  });
});
