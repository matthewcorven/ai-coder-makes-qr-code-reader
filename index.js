const NodeWebcam = require("node-webcam");
const QrCode = require("qrcode-reader");
const Jimp = require("jimp");

// Webcam options
const opts = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: true,
  output: "jpeg",
  device: false,
  callbackReturn: "location",
  verbose: false,
};

// Create the webcam instance
const Webcam = NodeWebcam.create(opts);

function captureAndDecode() {
  Webcam.capture("test_picture", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    Jimp.read("test_picture.jpg", function (err, image) {
      if (err) {
        console.log(err);
        return;
      }

      let qr = new QrCode();
      qr.callback = function (err, value) {
        if (err) {
          console.log(err);
          return;
        }

        console.log(value.result);
        console.log("------------------------");
      };

      qr.decode(image.bitmap);
    });
  });
}

// Continually capture and decode
setInterval(captureAndDecode, 5000);
