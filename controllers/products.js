const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const porducts = await Product.find({featured: true});
    res.status(200).json({porducts, nbHits:porducts.length});
};

const getAllProductsUsingQuery = async (req, res) => {
    const { featured } = req.query;
    const queryObject = {};
    
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    const porducts = await Product.find(queryObject);
    res.status(200).json({porducts, nbHits:porducts.length});
};

module.exports = {
    getAllProducts,
    getAllProductsUsingQuery
};