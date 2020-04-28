const http = require("http");
const path = "/api/parsetime?";
const url = require("url");

const server = http.createServer((req, res) => {
  let nUrl = url.parse(req.url, true);
  let path = nUrl.pathname;
  let time = nUrl.query.iso;
  let result;

  if (path === "/api/unixtime") {
    result = {
      unixtime: Date.parse(time),
    };
  }
  if (path === "/api/parsetime") {
    result = getTime(time);
  }
  if (result) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(process.argv[2]);

let getTime = (time) => {
  let date = new Date(Date.parse(time));

  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};
