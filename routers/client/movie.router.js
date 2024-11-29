const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/movie.controller");

router.get("/", controller.index);

router.get("/detail/:slugMovie", controller.detail);


module.exports = router;