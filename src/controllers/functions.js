const {machines,instances}=require('../models/instances')
exports.machine_details=(req,res)=>
{
    machines.find({}).then((data)=>{
        res.send(data);
    })
    
}
exports.user_selected_machine=(req,res)=>{
    var name=req.body.name;
    var ram_size=req.body.ram_size;
    var ram_unit=req.body.ram_unit;
    var disk_size=req.body.disk_size;
    var disk_unit=req.body.disk_unit;
    var cpu_size=req.body.cpu_size;

    machines.find({name:name}).then((data)=>{
        let disk_units=0,disks=0,maindisks=0,ram_units=0,rams=0,mainrams=0,maincpus=0

        if(data[0].disk_unit==="TB"){//db-disk
            disk_units=data[0].disk_size*1000
            console.log("if")
        }
        else if(data[0].disk_unit==="GB"){
            disk_units=data[0].disk_size
            console.log("else",data[0].disk_unit)
        }
        if(disk_unit==="TB"){//body-disk
            disks=disk_size*1000
        }
        else if(disk_unit==="GB"){
            disks=disk_size
        }
        if(data[0].ram_unit==="TB"){//db-ram
          ram_units=data[0].ram_size*1000
        }
        else if(data[0].ram_unit==="GB"){
            ram_units=data[0].ram_size
        }
        if(ram_unit==="TB"){//body-ram
            rams=ram_size*1000
        }
        else if(ram_unit==="GB"){
            rams=ram_size
        }
        console.log(disk_units,disks,ram_units,rams,data[0].cpu_size,cpu_size)
        if(disk_units>=disks&&ram_units>=rams &&data[0].cpu_size>=cpu_size){
            maindisks=disk_units-disks 
            mainrams=ram_units-rams
            maincpus=data[0].cpu_size-cpu_size
            console.log(maindisks,mainrams,maincpus)
            machines.updateOne({name:name},{$set:{disk_size:maindisks,disk_unit:"GB",ram_size:mainrams,ram_unit:"GB",cpu_size:maincpus,cpu_unit:"CORE"}}).then((data)=>{
                instances.create({name:name,disk_size:disks,disk_unit:"GB",ram_size,ram_unit:"GB",cpu_size,cpu_unit:"CORE"}).then((res)=>{
                    console.log("inserted")
                })
                res.send("success")
            })
        }
        else{
          res.send("error")
        }
       

    })
}
   