"use strict";

const { Requester } = require("cote");

const requester = new Requester({ name: "publisher" });

const resizeImgRequester = (photo) => {
  const req = {
    type: "resize-image",
    photo: photo,
  };

  requester.send(req, (done) => {
    console.log(
      `resized ${photo} to 100x100px thumbnail_${photo} located on ./nodepop/public/images/thumbnails/thumbnail_${photo}`
    );
  });
};

module.exports = resizeImgRequester;
