var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/home_controller');
const UserController = require('../controllers/users_controller');
const ClientController = require('../controllers/client_controller.js');



router.get('/', HomeController.index);
router.post('/registrar', UserController.create);
router.get('/list', UserController.read);

router.post('/clientes', ClientController.create);
// router.put('/clientes/:id', ClientController.update);
// router.delete('/clientes/:id', ClientController.delete);


module.exports = router;