let tf;
if (process.env.NODE_ENV == "linux") {
  tf = require("@tensorflow/tfjs-node-gpu");
}
const fs = require("fs");
const path = require("path");
const CsvReadableStream = require("csv-reader");
const appRoot = require("app-root-path");

module.exports = training = {
  labelList: ["land", "water", "depthLine", "depthNumber"],

  modelIsTrained() {
    if (fs.existsSync("./model/model.json")) {
      return true;
    }
    return false;
  },

  async trainModel() {
    const model = await training.createModel();
    await console.log("model created");

    let trainingInputs = await training.getTrainingInputs();
    let trainingTargets = await training.getTrainingTargets();
    let labelTensor = await tf.tensor1d(trainingTargets, "int32");

    trainingInputs = await tf.tensor2d(trainingInputs);
    trainingTargets = await tf.oneHot(labelTensor, 4);
    await labelTensor.dispose();

    await console.log(trainingInputs[0]);

    return new Promise((resolve) => {
      model.fit(trainingInputs, trainingTargets, {
        shuffle: true,
        validationSplit: 0.1,
        epochs: 10,
        callbacks: {
          onBatchEnd: async (batch, logs) => {
            await tf.nextFrame();
          },
          onTrainEnd: async () => {
            await model.save(`file://${appRoot}/NeuralNetwork/model/model.json`);
            await resolve();
          },
        },
      });
    });
  },

  async createModel(LEARNING_RATE = 0.1) {
    const optimizer = tf.train.sgd(LEARNING_RATE);

    const model = tf.sequential();

    let hiddenLayer = tf.layers.dense({ units: 40, inputShape: [51], activation: "sigmoid" });
    let outputLayer = tf.layers.dense({ units: 4, activation: "softmax" });

    model.add(hiddenLayer);
    model.add(outputLayer);

    model.compile({
      optimizer: optimizer,
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"],
    });

    return model;
  },

  async getTrainingInputs() {
    return new Promise((resolve) => {
      let trainingInputs = [];
      let csvStream = fs.createReadStream(path.join(__dirname, "./training.csv"), "utf8");

      csvStream
        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on("data", function (row) {
          row.pop();
          trainingInputs.push(row);
        })
        .on("end", function () {
          resolve(trainingInputs);
        });
    });
  },

  async getTrainingTargets() {
    return new Promise((resolve) => {
      let trainingTargets = [];
      let csvStream = fs.createReadStream(path.join(__dirname, "./training.csv"), "utf8");

      csvStream
        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on("data", function (row) {
          let label = row.pop();
          trainingTargets.push(training.labelList.indexOf(label));
        })
        .on("end", function () {
          resolve(trainingTargets);
        });
    });
  },
};
