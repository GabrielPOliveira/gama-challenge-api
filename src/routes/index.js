var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/home_controller');
const LoginController = require('../controllers/login_controller');
const UserController = require('../controllers/users_controller');
const AuthMiddleware = require('../middlewares/auth');

router.get('/', HomeController.index);
router.post('/registrar', UserController.create);
router.post('/logar', LoginController.login);

router.get('/list', AuthMiddleware, UserController.read);

module.exports = router;