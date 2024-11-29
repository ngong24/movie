const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/popcorn.controller");

router.get("/", controller.index);

module.exports = router;