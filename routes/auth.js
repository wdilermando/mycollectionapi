const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/authCtrl');

router.post('/login', AuthCtrl.login);

router.use(AuthCtrl.check_token);

router.get('/user', AuthCtrl.user_data);
router.post('/register', AuthCtrl.register);

module.exports = router;