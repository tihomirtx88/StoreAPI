require("dotenv").config();
const connectDB = require("./db/db");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const start = async (req, res) => {
    try {
        await connectDB(process.env.MONGO_URL);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Success');
        process.exit(0);
        
    } catch (error) {
        console.log(error);
    }
};

start();