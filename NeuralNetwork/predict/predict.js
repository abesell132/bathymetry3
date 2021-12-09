const Jimp = require("jimp");
const tf = require("@tensorflow/tfjs-node-gpu");
const appRoot = require("app-root-path");

process.on("message", async (msg) => {
  let { x, y, nearby, model } = await msg;

  await console.log(nearby[1][1]);

  nearby[1][1].getPixelColor = await new Function("return " + nearby[1][1])();
  await console.log(nearby[1][1].getPixelColor(1, 1));

  let m2m2Color,
    zm2Color,
    p2m2Color,
    m1m1Color,
    zm1Color,
    p1m1Color,
    m2zColor,
    m1zColor,
    zzColor,
    p1zColor,
    p2zColor,
    m1p1Color,
    zp1Color,
    p1p1Color,
    m2p2Color,
    zp2Color,
    p2p2Color;

  let m2m2 = await [x - 2, y - 2];
  let zm2 = await [x, y - 2];
  let p2m2 = await [x + 2, y - 2];
  let m1m1 = await [x - 1, y - 1];
  let zm1 = await [x, y - 1];
  let p1m1 = await [x + 1, y - 1];
  let m2z = await [x - 2, y];
  let m1z = await [x - 1, y];
  let zz = await [x, y];
  let p1z = await [x + 1, y];
  let p2z = await [x + 2, y];
  let m1p1 = await [x - 1, y + 1];
  let zp1 = await [x, y + 1];
  let p1p1 = await [x + 1, y + 1];
  let m2p2 = await [x - 2, y + 2];
  let zp2 = await [x, y + 2];
  let p2p2 = await [x + 2, y + 2];

  if (m2m2[0] < 0 && m2m2[1] < 0) {
    m2m2Color = await Jimp.intToRGBA(nearbyImages[0][0].getPixelColor(1920 + m2m2[0], 937 + m2m2[1]));
  } else if (m2m2[0] < 0) {
    m2m2Color = await Jimp.intToRGBA(nearbyImages[1][0].getPixelColor(1920 + m2m2[0], m2m2[1]));
  } else if (m2m2[1] < 0) {
    m2m2Color = await Jimp.intToRGBA(nearbyImages[0][1].getPixelColor(m2m2[0], 937 + m2m2[1]));
  } else {
    m2m2Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(m2m2[0], m2m2[1]));
  }

  if (zm2[1] < 0) {
    zm2Color = await Jimp.intToRGBA(nearbyImages[0][1].getPixelColor(zm2[0], 937 + zm2[1]));
  } else {
    zm2Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(zm2[0], zm2[1]));
  }

  if (p2m2[0] > 1919 && p2m2[1] < 0) {
    p2m2Color = await Jimp.intToRGBA(nearbyImages[0][2].getPixelColor(p2m2[0] - 1920, 937 + p2m2[1]));
  } else if (p2m2[0] > 1919) {
    p2m2Color = await Jimp.intToRGBA(nearbyImages[1][2].getPixelColor(p2m2[0] - 1920, p2m2[1]));
  } else if (p2m2[1] < 0) {
    p2m2Color = await Jimp.intToRGBA(nearbyImages[0][1].getPixelColor(p2m2[0], 937 + p2m2[1]));
  } else {
    p2m2Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(p2m2[0], p2m2[1]));
  }

  if (m1m1[0] < 0 && m1m1[1] < 0) {
    m1m1Color = await Jimp.intToRGBA(nearbyImages[0][0].getPixelColor(1920 + m1m1[0], 937 + m1m1[1]));
  } else if (m1m1[0] < 0) {
    m1m1Color = await Jimp.intToRGBA(nearbyImages[1][0].getPixelColor(1920 + m1m1[0], m1m1[1]));
  } else if (m1m1[1] < 0) {
    m1m1Color = await Jimp.intToRGBA(nearbyImages[0][1].getPixelColor(m1m1[0], 937 + m1m1[1]));
  } else {
    m1m1Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(m1m1[0], m1m1[1]));
  }

  if (zm1[1] < 0) {
    zm1Color = await Jimp.intToRGBA(nearbyImages[0][1].getPixelColor(zm1[0], 937 + zm1[1]));
  } else {
    zm1Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(zm1[0], zm1[1]));
  }

  if (p1m1[0] > 1919 && p1m1[1] < 0) {
    p1m1Color = await Jimp.intToRGBA(nearbyImages[0][2].getPixelColor(p1m1[0] - 1920, 937 + p1m1[1]));
  } else if (p1m1[0] > 1919) {
    p1m1Color = await Jimp.intToRGBA(nearbyImages[1][2].getPixelColor(p1m1[0] - 1920, p1m1[1]));
  } else if (p1m1[1] < 0) {
    p1m1Color = await Jimp.intToRGBA(nearbyImages[0][1].getPixelColor(p1m1[0], 937 + p1m1[1]));
  } else {
    p1m1Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(p1m1[0], p1m1[1]));
  }

  if (m2z[0] < 0) {
    m2zColor = await Jimp.intToRGBA(nearbyImages[1][0].getPixelColor(1920 + m2z[0], m2z[1]));
  } else {
    m2zColor = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(m2z[0], m2z[1]));
  }

  if (m1z[0] < 0) {
    m1zColor = await Jimp.intToRGBA(nearbyImages[1][0].getPixelColor(1920 + m1z[0], m1z[1]));
  } else {
    m1zColor = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(m1z[0], m1z[1]));
  }

  zzColor = Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(zz[0], zz[1]));

  if (p1z[0] > 1919) {
    p1zColor = await Jimp.intToRGBA(nearbyImages[1][2].getPixelColor(p1z[0] - 1920, p1z[1]));
  } else {
    p1zColor = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(p1z[0], p1z[1]));
  }

  if (p2z[0] > 1919) {
    p2zColor = await Jimp.intToRGBA(nearbyImages[1][2].getPixelColor(p2z[0] - 1920, p2z[1]));
  } else {
    p2zColor = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(p2z[0], p2z[1]));
  }

  if (m1p1[0] < 0 && m1p1[1] > 937) {
    m1p1Color = await Jimp.intToRGBA(nearbyImages[2][0].getPixelColor(1920 + m1p1[0], m1p1[1] - 937));
  } else if (m1p1[0] < 0) {
    m1p1Color = await Jimp.intToRGBA(nearbyImages[1][0].getPixelColor(1920 + m1p1[0], m1p1[1]));
  } else if (m1p1[1] > 937) {
    m1p1Color = await Jimp.intToRGBA(nearbyImages[2][1].getPixelColor(m1p1[0], m1p1[1] - 937));
  } else {
    m1p1Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(m1p1[0], m1p1[1]));
  }

  if (zp1[1] > 937) {
    zp1Color = await Jimp.intToRGBA(nearbyImages[2][1].getPixelColor(zp1[0], zp1[1] - 937));
  } else {
    zp1Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(zp1[0], zp1[1]));
  }

  if (p1p1[0] > 1919 && p1p1[1] > 937) {
    p1p1Color = await Jimp.intToRGBA(nearbyImages[2][2].getPixelColor(p1p1[0] - 1920, p1p1[1] - 937));
  } else if (p1p1[0] > 1919) {
    p1p1Color = await Jimp.intToRGBA(nearbyImages[1][2].getPixelColor(p1p1[0] - 1920, p1p1[1]));
  } else if (p1p1[1] > 937) {
    p1p1Color = await Jimp.intToRGBA(nearbyImages[2][1].getPixelColor(p1p1[0], p1p1[1] - 937));
  } else {
    p1p1Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(p1p1[0], p1p1[1]));
  }

  if (m2p2[0] < 0 && m2p2[1] > 937) {
    m2p2Color = await Jimp.intToRGBA(nearbyImages[2][0].getPixelColor(m2p2[0] + 1920, m2p2[1] - 937));
  } else if (m2p2[0] > 1919) {
    m2p2Color = await Jimp.intToRGBA(nearbyImages[1][0].getPixelColor(m2p2[0] + 1920, m2p2[1]));
  } else if (m2p2[1] > 937) {
    m2p2Color = await Jimp.intToRGBA(nearbyImages[2][1].getPixelColor(m2p2[0], m2p2[1] - 937));
  } else {
    m2p2Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(m2p2[0], m2p2[1]));
  }

  if (zp2[1] > 937) {
    zp2Color = await Jimp.intToRGBA(nearbyImages[2][1].getPixelColor(zp2[0], zp2[1] - 937));
  } else {
    zp2Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(zp2[0], zp2[1]));
  }

  if (p2p2[0] > 1919 && p2p2[1] > 937) {
    p2p2Color = await Jimp.intToRGBA(nearbyImages[2][2].getPixelColor(p2p2[0] - 1920, p2p2[1] - 937));
  } else if (p2p2[0] > 1919) {
    p2p2Color = await Jimp.intToRGBA(nearbyImages[1][2].getPixelColor(p2p2[0] - 1920, p2p2[1]));
  } else if (p2p2[1] > 937) {
    p2p2Color = await Jimp.intToRGBA(nearbyImages[2][1].getPixelColor(p2p2[0], p2p2[1] - 937));
  } else {
    p2p2Color = await Jimp.intToRGBA(nearbyImages[1][1].getPixelColor(p2p2[0], p2p2[1]));
  }

  await tf.tidy(() => {
    const labelList = ["land", "water", "depthLine", "depthNumber"];
    const input = tf.tensor2d([
      [
        m2m2Color.r,
        m2m2Color.g,
        m2m2Color.b,
        zm2Color.r,
        zm2Color.g,
        zm2Color.b,
        p2m2Color.r,
        p2m2Color.g,
        p2m2Color.b,
        m1m1Color.r,
        m1m1Color.g,
        m1m1Color.b,
        zm1Color.r,
        zm1Color.g,
        zm1Color.b,
        p1m1Color.r,
        p1m1Color.g,
        p1m1Color.b,
        m2zColor.r,
        m2zColor.g,
        m2zColor.b,
        m1zColor.r,
        m1zColor.g,
        m1zColor.b,
        zzColor.r,
        zzColor.g,
        zzColor.b,
        p1zColor.r,
        p1zColor.g,
        p1zColor.b,
        p2zColor.r,
        p2zColor.g,
        p2zColor.b,
        m1p1Color.r,
        m1p1Color.g,
        m1p1Color.b,
        zp1Color.r,
        zp1Color.g,
        zp1Color.b,
        p1p1Color.r,
        p1p1Color.g,
        p1p1Color.b,
        m2p2Color.r,
        m2p2Color.g,
        m2p2Color.b,
        zp2Color.r,
        zp2Color.g,
        zp2Color.b,
        p2p2Color.r,
        p2p2Color.g,
        p2p2Color.b,
      ],
    ]);

    let results = model.predict(input);
    let argMax = results.argMax(1);
    let index = argMax.dataSync()[0];
    let label = labelList[index];

    console.log(label);
    process.exit(0);
  });
});
