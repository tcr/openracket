// Connect to accelerometer.
var tessel = require('tessel');
var accel = require('accel-mma84').connect(tessel.port('a'));

// Open UDP socket.
var dgram = require('dgram');
var udp = dgram.createSocket('upd4');

accel.on('connected', function () {
  // Loop forever.
  setImmediate(function loop () {
    accel.getAcceleration(function (err, xyz) {
      // Send packet.
      udp.send('192.168.1.149', 4444, '[' + xyz.x + ',' + xyz.y + ',' + xyz.z + ']')
      setImmediate(loop);
    });
  });
});