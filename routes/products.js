const express = require("express");
const router = express.Router(); 

const { getAllProducts, getAllProductsUsingQuery } = require("../controllers/products");

router.route('/').get(getAllProductsUsingQuery);
router.route('/static').get(getAllProducts)

module.exports = router;