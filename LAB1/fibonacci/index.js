const childProcess = require("child_process");

console.log("1: start");

setTimeout(() => {
  console.log("2: settimeout");
}, 1000);

childProcess.spawn("node", ["compute.js"], { stdio: "inherit" });

console.log("3: end");
