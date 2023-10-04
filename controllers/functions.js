const { default: axios } = require('axios');
const { machines, instances } = require('../models/instances')

exports.machineDetails = (req, res) => {
    axios.get(`http://localhost:8001/getAllMachines`)
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function (err) {
            console.error(err)
        })
}


exports.user_selected_machine = (req, res) => {

    var name = req.body.name;
    var ram_size = req.body.ram_size;
    var ram_unit = req.body.ram_unit;
    var disk_size = req.body.disk_size;
    var disk_unit = req.body.disk_unit;
    var cpu_size = req.body.cpu_size;

    let system_id = req.params.system_id;
    axios.get(`http://localhost:8001/getSingleMachine/${system_id}`)
        .then(function (response) {
            let disk_units = 0, disks = 0, maindisks = 0, ram_units = 0, rams = 0, mainrams = 0, maincpus = 0
            console.log(response.data[0])
            if (response.data[0].unit.disk === "TB") {//db-disk
                disk_units = response.data[0].size.disk * 1000//2tb-->2000gb
                // console.log("if")
            }
            else if (response.data[0].unit.disk === "GB") {
                disk_units = response.data[0].size.disk//200gb
                // console.log("else",response.data[0].disk_unit)
            }
            if (disk_unit === "TB") {//body-disk
                disks = disk_size * 1000//e.g 1tb--->1000gb
            }
            else if (disk_unit === "GB") {
                disks = disk_size//200gb
            }
            if (response.data[0].unit.ram === "TB") {//db-ram
                ram_units = response.data[0].size.ram * 1000
            }
            else if (response.data[0].unit.ram === "GB") {
                ram_units = response.data[0].size.ram
            }
            if (ram_unit === "TB") {//body-ram
                rams = ram_size * 1000
            }
            else if (ram_unit === "GB") {//no need for cpu
                rams = ram_size
            }
            console.log(disk_units, disks, ram_units, rams, response.data[0].size.cpu, cpu_size)
            if (disk_units >= disks && ram_units >= rams && response.data[0].size.cpu >= cpu_size) {
                maindisks = disk_units - disks
                mainrams = ram_units - rams
                maincpus = response.data[0].size.cpu - cpu_size
                console.log(maindisks, mainrams, maincpus)
                machines.updateOne({ system_id }, { $set: { 'size.disk': maindisks, 'unit.disk': "GB", 'size.ram': mainrams, 'unit.ram': "GB", 'size.cpu': maincpus, 'unit.cpu': "CORE" } }).then((data) => {
                    instances.create({ name: name, disk_size: disks, disk_unit: "GB", ram_size, ram_unit: "GB", cpu_size, cpu_unit: "CORE" }).then((res) => {
                        console.log("inserted")
                    })
                    res.send("success")
                })
            }
            else {
                res.send("error")
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });

}
