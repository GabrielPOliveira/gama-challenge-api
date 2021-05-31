var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/home_controller');
const LoginController = require('../controllers/login_controller');
const UserController = require('../controllers/users_controller');
const ClientController = require('../controllers/client_controller.js');
const DoctorController = require('../controllers/doctor_controller');
const AuthMiddleware = require('../middlewares/auth');


router.get('/', HomeController.index);
router.post('/registrar', UserController.create);
router.post('/logar', LoginController.login);

router.get('/list', AuthMiddleware, UserController.read);
router.put('/updatepass', AuthMiddleware, UserController.updatePass);

router.get('/clientes', ClientController.index);
router.get('/cliente', ClientController.find);
router.post('/clientes', ClientController.create);
router.put('/clientes', ClientController.update);

router.get('/medicos', DoctorController.index);
router.get('/medico', DoctorController.find);
router.post('/medicos', DoctorController.create);
router.put('/medicos', DoctorController.update);





module.exports = router;