const express = require("express");
const router = express.Router();
const allCountryHandler = require("../controllers/allCountryHandler");

router.route("/").get(allCountryHandler.getCountry);

module.exports = router;
