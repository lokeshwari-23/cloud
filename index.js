const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require("dotenv").config()
mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.DB_NAME}`,{useNewUrlParser:true,useUnifiedTopology:true})
const routes=require('./src/routes/router');
const db = mongoose.connection;
db.on('open',()=>{
    console.log('connected to database')    
})

app.use('/',routes);

app.listen(8000,()=>{
    console.log('listening on 8000')
})