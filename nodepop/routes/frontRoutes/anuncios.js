"use strict";

const express = require("express");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");

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
    res.render("anuncios", { title: "Nodepop", anuncios });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
