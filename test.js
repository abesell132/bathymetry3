const Jimp = require("jimp");

Jimp.read("./NeuralNetwork/training/triangle-1.png")
  .then(function (image) {
    console.log(image);
  })
  .catch(function (err) {
    console.error(err);
  });
