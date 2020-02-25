const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/authCtrl')
const personCtrl = require('../controllers/personCtrl');
const itemCtrl = require('../controllers/itemCtrl');

router.use(authCtrl.check_token);
router.get('/people', personCtrl.all);
router.get('/items', itemCtrl.all);

module.exports = router;