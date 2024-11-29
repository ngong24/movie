const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/ticket.controller");

router.post("/add/:movieId", controller.addPost);

// router.put("/update/:movieId/:adultQuantity", controller.updateAdult);


module.exports = router;