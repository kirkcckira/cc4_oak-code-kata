const http = require("http");
const concatStream = require("concat-stream");

http.get(process.argv[2], (response) => {
  response.setEncoding("utf8").pipe(
    concatStream((data) => {
      console.log(data.length);
      console.log(data);
    })
  );
});
