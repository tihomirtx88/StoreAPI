const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const search = 'a';

    const porducts = await Product.find({
        name: {$regex: search, $options: 'i'}
    }).sort('name price');
    res.status(200).json({porducts, nbHits:porducts.length});
};

const getAllProductsUsingQuery = async (req, res) => {
    const { featured, company, name, sort } = req.query;
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

    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else{
        result = result.sort('createdAt');
    }
    const porducts = await result;
    res.status(200).json({porducts, nbHits:porducts.length});
};

module.exports = {
    getAllProducts,
    getAllProductsUsingQuery
};