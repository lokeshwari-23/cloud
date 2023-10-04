const express = require('express');
const router = express.Router();
const controller = require('../controllers/functions')

router.get('/machineDetails', controller.machineDetails)
router.post('/userSelectedDetails/:system_id', controller.user_selected_machine)



module.exports = router;