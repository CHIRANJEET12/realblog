const { Router } = require("express");
const User = require('../models/user');

const router = Router();

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", async (req, res) => {
    console.log("Form submitted:", req.body);
    try {
      const { fullname, email, password } = req.body;
      const newUser = new User({ fullname, email, password });
      await newUser.save();
      return res.redirect("/signin");
    } 
    catch (err) {
      console.error("Error in signup:", err);
      return res.status(500).send("Signup failed. Please try again.");
    }
    console.log("submited")
  });

module.exports = router;
