const getAllProducts = async (req, res) => {
    res.status(200).json({product: 'Testing product'});
};

module.exports = {
    getAllProducts
};