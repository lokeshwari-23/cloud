const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require("dotenv").config()

const routes=require('./routes/router');

app.use('/',routes);





app.listen(8000,()=>{
    console.log('listening on 8000')
})