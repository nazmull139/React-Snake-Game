const express = require('express');
const { userRegistration, userLoggedIn, userLogOut, updateHighScore, getHighScore } = require('./user.controller.js');

const router = express.Router();




//// REGISTRATION


router.post("/register", userRegistration);
router.post("/login", userLoggedIn);
router.post("/logout",userLogOut);
router.put("/high-score/:id", updateHighScore);
router.get("/gethigh-score/:id", getHighScore);

module.exports = router ; 