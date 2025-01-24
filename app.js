require("dotenv").config();

const express = require("express");
const ConnectDB = require("./db/db");
const app = express();

const errorHandlerMiddleware = require("../StoreAPI/middleware/error-handler");
const notFound = require("./middleware/not-found");

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res)=>{
    res.send('<h1>STore API</h1>');
});

//Product routes
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3500;

const start = async () => {
    try {
        //Contect to DB
        await ConnectDB(process.env.MONGO_URL );
        app.listen(port, console.log(`- Local: http://localhost:${port}/`));

    } catch (error) {
        console.log(error);
        
    }
};

start();
