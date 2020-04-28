const http = require("http");
const concatStream = require("concat-stream");

let urls = process.argv.slice(2);
let results = [];
let count = 0;

urls.forEach((url, i) => {
  http.get(url, (response) => {
    response.setEncoding("utf8");

    response.pipe(
      concatStream((data) => {
        results[i] = data;
        count++;

        if (count === urls.length) {
          results.forEach((result) => {
            console.log(result);
          });
        }
      })
    );
  });
});

// urls.forEach((url) => {
//   http.get(url, (response) => {
//     response.pipe(
//       concatStream((err, data) => {
//         console.log(data);
//       })
//     );
//   });
// });
