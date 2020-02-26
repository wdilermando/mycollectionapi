const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/authCtrl');
const itemCtrl = require('../controllers/itemCtrl');

router.use(authCtrl.check_token);

router.get('/items', itemCtrl.all);
router.post('/items', itemCtrl.create);

module.exports = router;