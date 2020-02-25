const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/authCtrl');

router.post('/login', AuthCtrl.login);
router.post('/register', AuthCtrl.register);

router.use(AuthCtrl.check_token);

router.get('/user', AuthCtrl.user_data);

module.exports = router;