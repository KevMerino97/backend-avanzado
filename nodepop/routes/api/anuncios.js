"use strict";

const express = require("express");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");
const resizeImgRequester = require("../resizeImgRequester");

// /api/anuncios
// It returns a anuncio list
router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    const price = req.query.price;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const select = req.query.select;
    const sort = req.query.sort;
    const sale = req.query.sale;
    const tags = req.query.tags;

    const filter = {};

    if (name) {
      filter.name = new RegExp("^" + req.query.name, "i");
    }

    if (price) {
      const minMaxPrice = price.split("-");
      filter.price = {
        $gte: minMaxPrice[0] ? parseFloat(minMaxPrice[0]) : 0,
        $lte: minMaxPrice[1] ? parseFloat(minMaxPrice[1]) : Number.MAX_VALUE,
      };
    }

    if (sale) {
      filter.sale = sale;
    }

    if (tags) {
      const tagsFilter = tags
        .split(",")
        .map((tag) => new RegExp("^" + tag, "i"));

      filter.tags = {
        $all: tagsFilter,
      };
    }

    const anuncios = await Anuncio.list(filter, skip, limit, select, sort);
    res.json({ results: anuncios });
  } catch (err) {
    next(err);
  }
});

// CRUD

// GET/api/anuncios:id
router.get("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;

    const anuncio = await Anuncio.find({ _id: _id });
    res.json({ result: anuncio });
  } catch (err) {
    next(err);
  }
});

// POST /api/anuncios (body)

router.post("/", async (req, res, next) => {
  const thumbnailURL = "./images/thumbnail/thumbnail_";
  try {
    const photoName = req.file.originalname;
    const fileData = "./images/anuncios/" + photoName;
    resizeImgRequester(photoName);
    const productData = {
      ...req.body,
      photo: fileData,
      thumbnail: `${thumbnailURL}${photoName}`,
    };
    const anuncio = new Anuncio(productData);

    const createdProduct = await anuncio.save();
    res.status(201).json({ result: createdProduct });
  } catch (err) {
    next(err);
  }
});

// PUT /api/agentes:id (body)   ----UPDATE a anuncio
router.put("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const productData = req.body;

    const updatedProduct = await Anuncio.findOneAndUpdate(
      { _id: _id },
      productData,
      {
        new: true, // This returns the updated document
      }
    );

    if (!updatedProduct) {
      res.status(404).json({ error: "not found" });
      return;
    }

    res.json({ result: updatedProduct });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/anuncios:id
router.delete("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;

    await Anuncio.deleteOne({ _id: _id });
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
