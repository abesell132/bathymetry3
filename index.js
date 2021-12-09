const fs = require("fs");

const { modelIsTrained, trainModel } = require("./NeuralNetwork/training");
const { processLakeImages } = require("./NeuralNetwork/predict");
const { gatherLakeImages } = require("./webScraper");

const lake = "Lake Bancroft";
const startPos = { lat: 46.49379, lng: -87.67749 };
const endPos = { lat: 46.49251, lng: -87.67301 };

async function start() {
  if (!fs.existsSync(`./lakes`)) {
    fs.mkdirSync(`./lakes`);
  }
  if (process.env.NODE_ENV == "linux") {
    if (!modelIsTrained()) {
      await trainModel();
    }
  }

  let lakeImages = await gatherLakeImages(lake, startPos, endPos);

  await console.log("Made it here");

  await processLakeImages(lakeImages);
}

start();
