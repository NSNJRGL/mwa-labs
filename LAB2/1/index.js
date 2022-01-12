const http = require("http");
const fs = require("fs");

let indexFile;
let status = 404;

const serverAllRequests = (req, res) => {
  if (req.method == "POST") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/json");
    res.end("{'message': 'Hello world!'}");
  } else {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = status;

    switch (req.url) {
      case "/page1.html":
        callFs("page1.html");
        res.end(indexFile);
        break;
      case "/page2.html":
        callFs("page2.html");
        res.end(indexFile);
        break;
      default:
        res.end(indexFile);
        break;
    }
  }
};

const server = http.createServer(serverAllRequests);

// const serveFile = function (err, buffer) {
//   if (!err) {
//     indexFile = buffer;
//     status = 200;
//   }
// };

const callFs = function (fileName) {
  fs.readFile(__dirname + `//${fileName}`, function (err, buffer) {
    if (!err) {
      indexFile = buffer;
      status = 200;
      server.listen(4343, "localhost", function () {
        console.log("server is running on 4343");
      });
    }
  });
};
