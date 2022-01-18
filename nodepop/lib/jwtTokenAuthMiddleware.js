"use strict";

const jwt = require("jsonwebtoken");

// middleware module

module.exports = (req, res, next) => {
  // get the jwtToken from the header
  const jwtToken =
    req.get("Authorization") || req.query.token || req.body.token;
  if (!jwtToken) {
    const error = new Error("no token provided");
    error.status = 401;
    next(error);
    return;
  }

  // verify the token
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      err.message = "invalid token";
      err.status = 401;
      next(err);
      return;
    }

    req.apiAuthUserId = payload._id;

    next();
  });
};
