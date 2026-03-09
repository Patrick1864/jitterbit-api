const express = require("express");
const router = express.Router();

const orderController = require("./controller");

router.post("/order", orderController.createOrder);
router.get("/orders", orderController.listOrders);

module.exports = router;