
const mongoose = require('mongoose');
require("dotenv").config();

const db1 = mongoose.createConnection(process.env.DB_NAME1, { useNewUrlParser: true, useUnifiedTopology: true });
const db2 = mongoose.createConnection(process.env.DB_NAME2, { useNewUrlParser: true, useUnifiedTopology: true });

const db1_baremetal = db1;
const db2_cloud = db2;

db1_baremetal.on('open', () => {
    console.log('Connected to database 1');
});

db2_cloud.on('open', () => {
    console.log('Connected to database 2');
});

const sharedSchema = mongoose.Schema({
    size: {
        ram: Number,
        cpu: Number,
        disk: Number
    },
    unit: {
        ram: String,
        cpu: String,
        disk: String
    },
    name: String,
    processor: String,
    system_id: Number
});

const schema1 = mongoose.Schema({
    ram_size: Number,
    ram_unit: String,
    cpu_size: Number,
    cpu_unit: String,
    disk_size: Number,
    disk_unit: String,
    name: String,
    system_id: Number
});

const machines = db1.model(process.env.COLL_NAME1, sharedSchema);
const instances = db2.model(process.env.COLL_NAME2, schema1);

module.exports = { machines, instances };

