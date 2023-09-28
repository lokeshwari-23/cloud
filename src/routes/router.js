const express=require('express');
const router=express.Router();
const controller=require('../controllers/functions')

router.get('/machineDetails',controller.machine_details)
router.post('/userSelectedDetails',controller.user_selected_machine)



module.exports = router;