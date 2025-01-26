const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const search = 'a';

    const porducts = await Product.find({
        name: {$regex: search, $options: 'i'}
    });
    res.status(200).json({porducts, nbHits:porducts.length});
};

const getAllProductsUsingQuery = async (req, res) => {
    const { featured, company, name } = req.query;
    const queryObject = {};
    
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }

    const porducts = await Product.find(queryObject);
    res.status(200).json({porducts, nbHits:porducts.length});
};

module.exports = {
    getAllProducts,
    getAllProductsUsingQuery
};