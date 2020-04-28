const net = require("net");

let date = new Date();

const formatNum = (num) => {
  return num < 10 ? "0" + num : num;
};

const server = net.createServer((socket) => {
  socket.end(
    date.getFullYear() +
      "-" +
      formatNum(date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      "\n"
  );
});
server.listen(process.argv[2]);
