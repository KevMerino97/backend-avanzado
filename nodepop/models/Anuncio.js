"use strict";
const mongoose = require("mongoose");

// product schema
const productSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    sale: Boolean,
    photo: String,
    thumbnail: String,
    tags: [String],
  },
  {
    collection: "anuncios",
  }
);

productSchema.statics.list = function (filter, skip, limit, select, sort) {
  const query = Anuncio.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);
  return query.exec();
};

// We create the model
const Anuncio = mongoose.model("Anuncio", productSchema);

// We export the model
module.exports = Anuncio;

// NOT WORKING
/**
 * const Float = require('mongoose-float').loadType(mongoose, 2);
    price: { type: Float },
    */
