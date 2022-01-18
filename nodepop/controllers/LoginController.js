"use strict";

const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

class LoginController {
  index(req, res, next) {
    res.locals.error = "";
    // res.render('login')
  }

  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      // search user
      const user = await Usuario.findOne({ email });

      // if not found or wrong pass --> err
      if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // if user exists and validates password
      // create a JWT containing the user _id
      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }
          // give back the token
          res.json({ token: jwtToken });
        }
      );
    } catch (err) {
      next();
    }
  }
}

module.exports = LoginController;
