var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {
  // console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
  try {
    var xyz = JSON.parse(String(msg));
    console.log(Math.sqrt(xyz[0]*xyz[0] + xyz[1]*xyz[1] + xyz[2]*xyz[2]));
  } catch (e) {
  }
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);
});

server.bind(4444);
