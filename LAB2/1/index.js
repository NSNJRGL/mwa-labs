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

    switch (req.url) {
      case "/":
        callFs("index.html", res);
        break;
      case "/page1":
        callFs("page1.html", res);
        break;
      case "/page2":
        callFs("page2.html", res);
        break;
      default:
        res.statusCode = status;
        res.end("Not Found");
        break;
    }
  }
};

const server = http.createServer(serverAllRequests);

const callFs = function (fileName, res) {
  fs.readFile(__dirname + `//${fileName}`, function (err, buffer) {
    if (!err) {
      indexFile = buffer;
      status = 200;
    }
    res.end(indexFile);
  });
};

server.listen(4343, "localhost", function () {
  console.log("server is running on 4343");
});
