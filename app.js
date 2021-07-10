require('dotenv/config');

const express = require('express');
const app = express();
const api = process.env.API_URL;
const conn = process.env.CONNECTION_STRING;
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');


app.use(cors());
app.options('*', cors());

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);

mongoose.connect(conn,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('database connection is ready...');
})
.catch((err)=>{
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('running in localhost:3000');
    console.log(api);
})