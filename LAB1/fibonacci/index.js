const childProcess = require("child_process");

console.log("Step one: start");

setTimeout(() => {
  console.log("Step two: settimeout");
}, 1000);

childProcess.spawn("node", ["compute.js"], { stdio: "inherit" });

console.log("Step three: end");
