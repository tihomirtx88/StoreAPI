const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const search = 'a';

    const porducts = await Product
    .find({
        name: {$regex: search, $options: 'i'}
    })
    .sort('name price')
    .select('name price -_id')
    .limit(4); 
    res.status(200).json({porducts, nbHits:porducts.length});
};

const getAllProductsUsingQuery = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query;
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

    //Sorting
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else{
        result = result.sort('createdAt');
    }

    // Select
    if (fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const porducts = await result;
    res.status(200).json({porducts, nbHits:porducts.length});
};

module.exports = {
    getAllProducts,
    getAllProductsUsingQuery
};