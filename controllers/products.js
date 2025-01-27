const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const search = 'a';

    const porducts = await Product
    .find({
        name: {$regex: search, $options: 'i'},
        price: {$gt: 30}
    })
    .sort('name price')
    .select('name price -_id')
    .limit(4); 
    res.status(200).json({porducts, nbHits:porducts.length});
};

const getAllProductsUsingQuery = async (req, res) => {
    
    const { featured, company, name, sort, fields, numericFilters } = req.query;
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

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx, (match)=> `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters.split(',').forEach((item)=>{
            const [ field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)};
            }
        });
    }
    
    console.log(queryObject);
    
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