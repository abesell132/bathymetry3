const fs = require("fs");

const { modelIsTrained, trainModel } = require("./NeuralNetwork/training");
const { processLakeImages } = require("./NeuralNetwork/predict");
const { gatherLakeImages } = require("./webScraper");

const lake = "Lake Bancroft";
const startPos = { lat: 46.496, lng: -87.6776 };
const endPos = { lat: 46.4924, lng: -87.6717 };

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

  await processLakeImages(lakeImages);
}

start();
