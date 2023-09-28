const mongoose = require('mongoose');
require("dotenv").config()

const schema=new mongoose.Schema({
    ram_size:Number,
    ram_unit:String,
    cpu_size:Number,
    cpu_unit:String,
    disk_size:Number,
    disk_unit:String,
    processor:String,
    name:String
})
const schema1=new mongoose.Schema({
    ram_size:Number,
    ram_unit:String,
    cpu_size:Number,
    cpu_unit:String,
    disk_size:Number,
    disk_unit:String,
    name:String 
})
const machines=mongoose.model(`${process.env.COLL_NAME1}`,schema)
const instances=mongoose.model(`${process.env.COLL_NAME2}`,schema1)
module.exports ={machines,instances}