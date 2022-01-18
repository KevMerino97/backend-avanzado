"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

userSchema.statics.hashPassword = function (uncryptedPassword) {
  return bcrypt.hash(uncryptedPassword, 7);
};

userSchema.methods.comparePassword = function (uncryptedPassword) {
  return bcrypt.compare(uncryptedPassword, this.password);
};

// Model
const Usuario = mongoose.model("Usuario", userSchema);

// Export
module.exports = Usuario;
