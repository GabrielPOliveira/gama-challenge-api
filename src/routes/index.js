var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/home_controller');
const UserController = require('../controllers/users_controller');

router.get('/', HomeController.index);

module.exports = router;