var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/home_controller');
const LoginController = require('../controllers/login_controller');
const UserController = require('../controllers/users_controller');
const ClientController = require('../controllers/client_controller.js');
const DoctorController = require('../controllers/doctor_controller');
const AppointmentController = require('../controllers/appointment_controller');
const StatusController = require('../controllers/status_controller');
const BloodTypesController = require('../controllers/bloodtypes_controller');
const SpecialityController = require('../controllers/speciality_controller');

const AuthMiddleware = require('../middlewares/auth');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.get('/', HomeController.index);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.post('/registrar', UserController.create);
router.post('/logar', LoginController.login);


router.use(AuthMiddleware);
router.get('/list', UserController.read);
router.put('/update', UserController.update);

router.get('/clientes', ClientController.index);
router.get('/cliente/:uuid', ClientController.find);
router.post('/clientes', ClientController.create);
router.put('/clientes/:uuid', ClientController.update);
router.get('/cliente/:uuid/prontuario', ClientController.getMedicalRecords);

router.get('/medicos', DoctorController.index);
router.get('/medico/:id', DoctorController.find);
router.post('/medicos', DoctorController.create);
router.put('/medicos/:uuid', DoctorController.update);


router.get('/consultas', AppointmentController.index);
router.get('/consulta/:uuid', AppointmentController.find);
router.post('/agendarConsulta', AppointmentController.create);
router.put('/alterarConsulta/:uuid', AppointmentController.update);
router.post('/realizarConsulta/:uuid', AppointmentController.endAppointment);

router.get('/status', StatusController.index);

router.get('/tipos', BloodTypesController.index);
router.get('/especialidades', SpecialityController.index);


module.exports = router;