"use strict";

// resizing img service

const { Responder } = require("cote");
const jimp = require("jimp");

// State the service
const responder = new Responder({ name: "image resizing service" });

// new image size dates

responder.on("resize-image", (req, done) => {
  const { photo } = req;
  const originalImage = `../nodepop/public/images/anuncios/${photo}`;

  jimp
    .read(originalImage)
    .then((image) => {
      image
        .resize(100, 100)
        .write(`../nodepop/public/images/thumbnails/thumbnail_${photo}`);
    })
    .catch((err) => {
      console.log(err);
    });

  const result = "Thumbnail created by resizing image service";
  done(console.log(result));
});
