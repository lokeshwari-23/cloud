const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// mongoose.connect('mongodb://0.0.0.0:27017/openstack',{useNewUrlParser:true,useUnifiedTopology:true})
// const db = mongoose.connection;
// db.on('open',()=>{
//     console.log('connected to database')    
// })
const MongoClient = require("mongodb").MongoClient
// const ObjectId=require("mongodb").ObjectId
const client=new MongoClient("mongodb://0.0.0.0:27017/openstack");
client.connect()
.then(()=>{
  console.log("connected");
})
const db=client.db("openstack");
var coll=db.collection("machines");
var coll1=db.collection("instance");
app.get('/machineDetails',(req,res)=>{
coll.find({}).toArray().then((data)=>{
    res.send(data);
})
})
app.post('/userSelectedMachines',(req,res)=>{
    var Name=req.body.Name;
    var RAM=req.body.RAM;
    var RAM_UNIT=req.body.RAM_UNIT;
    var DISK=req.body.DISK;
    var DISK_UNIT=req.body.DISK_UNIT;
    var CPU=req.body.CPU;

    coll.find({Name:Name}).toArray().then((data)=>{
        let disk_unit=0,disk=0,maindisk=0,ram_unit=0,ram=0,mainram=0,maincpu=0
        if(data[0].DISK_UNIT==="TB"){//db-disk
            disk_unit=data[0].DISK*1000
        }
        else if(data[0].DISK_UNIT==="GB"){
            disk_unit=data[0].DISK
        }
        if(DISK_UNIT==="TB"){//body-disk
            disk=DISK*1000
        }
        else if(DISK_UNIT==="GB"){
            disk=DISK
        }
        if(data[0].RAM_UNIT==="TB"){//db-ram
          ram_unit=data[0].RAM*1000
        }
        else if(data[0].RAM_UNIT==="GB"){
            ram_unit=data[0].RAM
        }
        if(RAM_UNIT==="TB"){//body-ram
            ram=RAM*1000
        }
        else if(RAM_UNIT==="GB"){
            ram=RAM
        }
        console.log(disk_unit,disk,ram_unit,ram)
        if(disk_unit>=disk&&ram_unit>=ram &&data[0].CPU>=CPU){
            maindisk=disk_unit-disk 
            mainram=ram_unit-ram
            maincpu=data[0].CPU-CPU
            coll.updateOne({Name:Name},{$set:{DISK:maindisk,DISK_UNIT:"GB",RAM:mainram,RAM_UNIT:"GB",CPU:maincpu,CPU_UNIT:"CORE"}}).then((data)=>{
                coll1.insertOne({Name:Name,DISK:disk,DISK_UNIT:"GB",RAM:ram,RAM_UNIT:"GB",CPU:CPU,CPU_UNIT:"CORE"}).then((res)=>{
                    console.log("inserted")
                })
                res.send("success")
            })
        }
        else{
          res.send("error")
        }
       

    })
})
app.post('/userRequirements',(req,res)=>{
   
    

   
})


app.listen(8000,()=>{
    console.log('listening on 8000')
})