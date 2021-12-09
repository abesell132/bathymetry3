const { fork } = require("child_process");

module.exports = {
  processLakeImages: async function (lakeImages) {
    let { imageDir, totalCol, totalRow } = lakeImages;

    let imgY = 1;
    let imgX = 1;

    let imgFilePath = imageDir + "/lake" + imgY + "-" + imgX + ".png";

    let startPixelX = 0;
    let startPixelY = 0;
    let endPixelX = 1919;
    let endPixelY = 936;

    if (imgX == 1) startPixelX = 3;
    if (imgX == totalCol) endPixelX = 1916;
    if (imgY == 1) startPixelY = 3;
    if (imgY == totalRow) endPixelY = 933;

    let nearbyImages = this.gatherNearByImages(imgFilePath, imgDir);

    let queue = [];
    for (let y = startPixelY; y < endPixelY; y++) {
      for (let x = startPixelX; x < endPixelX; x++) {
        queue.push({ x, y });
      }
    }

    await start_processing(queue, nearbyImages);
  },

  start_processing: async function (queue, nearbyImages) {
    let { x, y } = queue.shift();

    const pixelChild = await fork("./predictPixel.js");
    await pixelChild.send({ x, y, nearbyImages });

    await pixelChild.on("close", () => {
      if (queue.length > 0) {
        await start(queue, nearbyImages);
      }
    });
  },
  gatherNearByImages: async function (imgFilePath, imageDir) {
    let nearbyImages = [
      [null, null, null],
      [null, currentImgPath, null],
      [null, null, null],
    ];

    if (imgX == 1 && imgY == 1) {
      nearbyImages[1][2] = imageDir + "/lake" + imgY + "-" + (imgX + 1) + ".png";
      nearbyImages[2][1] = imageDir + "/lake" + (imgY + 1) + "-" + imgX + ".png";
      nearbyImages[2][2] = imageDir + "/lake" + (imgY + 1) + "-" + (imgX + 1) + ".png";
    } else if (imgX == totalCol && imgY == 1) {
      nearbyImages[1][0] = imageDir + "/lake" + imgY + "-" + (imgX - 1) + ".png";
      nearbyImages[2][1] = imageDir + "/lake" + (imgY + 1) + "-" + imgX + ".png";
      nearbyImages[2][0] = imageDir + "/lake" + (imgY + 1) + "-" + (imgX - 1) + ".png";
    } else if (imgX == 1 && imgY == totalRow) {
      nearbyImages[0][1] = imageDir + "/lake" + (imgY - 1) + "-" + imgX + ".png";
      nearbyImages[0][2] = imageDir + "/lake" + (imgY - 1) + "-" + (imgX + 1) + ".png";
      nearbyImages[1][2] = imageDir + "/lake" + imgY + "-" + (imgX + 1) + ".png";
    } else if (imgX == totalCol && imgY == totalRow) {
      nearbyImages[0][1] = imageDir + "/lake" + (imgY - 1) + "-" + imgX + ".png";
      nearbyImages[0][0] = imageDir + "/lake" + (imgY - 1) + "-" + (imgX - 1) + ".png";
      nearbyImages[1][0] = imageDir + "/lake" + imgY + "-" + (imgX - 1) + ".png";
    } else if (imgY == 1) {
      nearbyImages[1][0] = imageDir + "/lake" + imgY + "-" + (imgX - 1) + ".png";
      nearbyImages[1][2] = imageDir + "/lake" + imgY + "-" + (imgX + 1) + ".png";
      nearbyImages[2][1] = imageDir + "/lake" + (imgY + 1) + "-" + imgX + ".png";
      nearbyImages[2][0] = imageDir + "/lake" + (imgY + 1) + "-" + (imgX - 1) + ".png";
      nearbyImages[2][2] = imageDir + "/lake" + (imgY + 1) + "-" + (imgX + 1) + ".png";
    } else if (imgX == 1) {
      nearbyImages[0][1] = imageDir + "/lake" + (imgY - 1) + "-" + imgX + ".png";
      nearbyImages[0][2] = imageDir + "/lake" + (imgY - 1) + "-" + (imgX + 1) + ".png";
      nearbyImages[1][2] = imageDir + "/lake" + imgY + "-" + (imgX + 1) + ".png";
      nearbyImages[2][1] = imageDir + "/lake" + (imgY + 1) + "-" + imgX + ".png";
      nearbyImages[2][2] = imageDir + "/lake" + (imgY + 1) + "-" + (imgX + 1) + ".png";
    } else if (imgX == totalCol) {
      nearbyImages[0][1] = imageDir + "/lake" + (imgY - 1) + "-" + imgX + ".png";
      nearbyImages[0][0] = imageDir + "/lake" + (imgY - 1) + "-" + (imgX - 1) + ".png";
      nearbyImages[1][0] = imageDir + "/lake" + imgY + "-" + (imgX - 1) + ".png";
      nearbyImages[2][1] = imageDir + "/lake" + (imgY + 1) + "-" + imgX + ".png";
      nearbyImages[2][0] = imageDir + "/lake" + (imgY + 1) + "-" + (imgX - 1) + ".png";
    } else if (imgY == totalRow) {
      nearbyImages[0][0] = imageDir + "/lake" + (imgY - 1) + "-" + (imgX - 1) + ".png";
      nearbyImages[0][1] = imageDir + "/lake" + (imgY - 1) + "-" + imgX + ".png";
      nearbyImages[0][2] = imageDir + "/lake" + (imgY - 1) + "-" + (imgX + 1) + ".png";
      nearbyImages[1][0] = imageDir + "/lake" + imgY + "-" + (imgX - 1) + ".png";
      nearbyImages[1][2] = imageDir + "/lake" + imgY + "-" + (imgX + 1) + ".png";
    } else {
      nearbyImages[0][0] = imageDir + "/lake" + (imgY - 1) + "-" + (imgX - 1) + ".png";
      nearbyImages[0][1] = imageDir + "/lake" + (imgY - 1) + "-" + imgX + ".png";
      nearbyImages[0][2] = imageDir + "/lake" + (imgY - 1) + "-" + (imgX + 1) + ".png";
      nearbyImages[1][0] = imageDir + "/lake" + imgY + "-" + (imgX - 1) + ".png";
      nearbyImages[1][2] = imageDir + "/lake" + imgY + "-" + (imgX + 1) + ".png";
      nearbyImages[2][0] = imageDir + "/lake" + (imgY + 1) + "-" + (imgX - 1) + ".png";
      nearbyImages[2][1] = imageDir + "/lake" + (imgY + 1) + "-" + imgX + ".png";
      nearbyImages[2][2] = imageDir + "/lake" + (imgY + 1) + "-" + (imgX + 1) + ".png";
    }

    return new Promise(async (resolve) => {
      for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 3; b++) {
          if (nearbyImages[a][b] !== null) {
            nearbyImages[a][b] = await this.loadImage(nearbyImages[a][b]);
          }
        }
      }
      await resolve(nearbyImages);
    });
  },

  loadImage: function (path) {
    return new Promise((resolve, reject) => {
      Jimp.read(path)
        .then((image) => {
          resolve(image);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
