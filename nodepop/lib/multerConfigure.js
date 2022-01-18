"use strict";

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/images/anuncios",
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const multerConf = multer({
  storage,
}).single("photo");

module.exports = multerConf;
