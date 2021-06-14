const request = require('supertest');
const { date } = require('yup');
const app = require('../app');
const { sequelize } = require('../src/models');

afterAll(done => {
    sequelize.connectionManager.close()
    done()
})

const registerObj = {
    login: "teste",
    password: "teste123",
    name: "Bruno",
    type: 2
}

describe('/registrar route', () => {
    it('should create a new user', async() => {
        const res = await request(app).post('/registrar').send(registerObj);
        expect(res.statusCode).toEqual(201);
        expect(res.type).toEqual('application/json');
    });

    it('should NOT create a new user due to login NOT unique', async() => {
        const res = await request(app).post('/registrar').send(registerObj);
        expect(res.statusCode).toEqual(400); //Login não único deve causar status = 400
        expect({ error: "Usuário já cadastrado" });
    });

    it('should NOT create a new user due login length', async () => {
        const res = await request(app).post('/registrar').send({...registerObj, login: "stringComMaisDe20Caracteres"});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ error: "Entradas inválidas."});
        
    });

    it('should NOT create a new user due to invalid type', async () => {
        const res = await request(app).post('/registrar').send({...registerObj, type: 3});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ error: "Entradas inválidas."});
    });

    it('should NOT create a new user due to null param', async () => {
        const res = await request(app).post('/registrar').send({...registerObj, login: null});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ error: "Entradas inválidas."});
    });
});

let token;

const loginObj = {
    login: "teste",
    password: "teste123"
}

describe('/logar route', () => {
    it('should login as a user', async() => {
        const res = await request(app).post('/logar').send(loginObj);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('should NOT login as a user due to wrong password', async() => {
        const res = await request(app).post('/logar').send({...loginObj, password: "s0m3R4ndomPa$$word"});
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
    });

    it('should NOT login as a user due to wrong login', async() => {
        const res = await request(app).post('/logar').send({...loginObj, login: "someRandomLogin"});
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
    });
});

const updateObj = {
    id: 1,
    currentPassword: "teste123",
    password: "teste1234",
    passwordConfirmation: "teste1234"
}
describe('/update route', () => {
    it('should require authentication', async () => {
        const res = await request(app).put('/update');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ error: "Não autenticado"});
    });

    it('should NOT update the password due to invalid current password', async () => {
        const res = await request(app).put('/update').auth(token, { type: 'bearer' }).send({ ...updateObj, currentPassword: "teste12"});
        expect(res.statusCode).toEqual(403);
        expect(res.body).toEqual({ error: "Senha atual incorreta."});
    });

    it('should NOT update the password due to invalid password confirmation', async () => {
        const res = await request(app).put('/update').auth(token, { type: 'bearer' }).send({ ...updateObj, passwordConfirmation: "wrongPass"});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ error: "Entradas inválidas."});
    });

    it('should update the password', async () => {
        const res = await request(app).put('/update').auth(token, { type: 'bearer' }).send(updateObj);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Sucesso");
    });
});

const doctorObj = {
	"name": "Teste",
	"register": "abcdefg",
	"phone": "99999-9999",
	"cellphone": "99999-9999",
	"email": "teste@teste.com",
	"specialitiesId": 3,
	"zip_code": "12916423",
	"address": "Rua teste",
	"number": 1234,
	"neighborhood": "Bairro teste",
	"city": "Sao paulo",
	"state": "SP"
}

describe('/medicos(s) route', () => {
    it('should require authentication', async () => {
        const res = await request(app).get('/medicos');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ error: "Não autenticado"});
    });

    it('should create a doctor', async () => {
        const res = await request(app).post('/medicos').auth(token, {type: 'bearer'}).send(doctorObj);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual("Sucesso");
    });

    it('should NOT create a doctor due NOT UNIQUE "register"', async () => {
        const res = await request(app).post('/medicos').auth(token, {type: 'bearer'}).send(doctorObj);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({error: "Registro já cadastrado"});
    });

    let uuid = "";
    it('should list doctors', async () => {
        const res = await request(app).get('/medicos').auth(token, {type: 'bearer'});
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('uuid');
        uuid = res.body[0].uuid;
        
    });

    it('should update a doctor', async () => {
        const res = await request(app).put(`/medicos/${uuid}`).auth(token, {type: 'bearer'}).send({...doctorObj, addressId: 1});
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual("Sucesso");            
    });

    it('should find a doctor based on id', async () => {
        const res = await request(app).get('/medico/1').auth(token, {type: 'bearer'});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Speciality');
    });

    it('should NOT find a doctor based on id', async () => {
        const res = await request(app).get('/medico/0').auth(token, {type: 'bearer'}).send();
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

});

const clientObj = {
	"name": "Teste",
	"cpf": "44714032810",
	"phone": "1234-5678",
	"cellphone": "1234-5678",
	"email": "teste@teste.com",
	"bloodtypesId": 1,
	"zip_code": "12916423",
	"address": "Rua teste",
	"number": "123",
	"complement": "",
	"neighborhood": "Bairro teste",
	"city": "Sao Paulo",
	"state": "SP"
}

describe('/cliente(s) route', () => {
    it('should require authentication', async () => {
        const res = await request(app).get('/clientes');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ error: "Não autenticado"});
    });

    it('should create a client', async () => {
        const res = await request(app).post('/clientes').auth(token, {type: 'bearer'}).send(clientObj);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual("Sucesso");
    });

    it('should NOT create a client due NOT UNIQUE cpf', async () => {
        const res = await request(app).post('/clientes').auth(token, {type: 'bearer'}).send(clientObj);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({error: "CPF já cadastrado"});
    });

    it('should NOT create a client due INVALID cpf', async () => {
        const res = await request(app).post('/clientes').auth(token, {type: 'bearer'}).send({...clientObj, cpf: "123456"});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({error: "CPF não válido!!"});
    });

    it('should list clients', async () => {
        const res = await request(app).get('/clientes').auth(token, {type: 'bearer'});
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('uuid');
        uuid = res.body[0].uuid;
    });

    it('should update a client', async () => {
        const res = await request(app).put(`/clientes/${uuid}`).auth(token, {type: 'bearer'}).send({...clientObj,addressId: 1});
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual("Sucesso");            
    });

    it('should find a client based on uuid', async () => {
        const res = await request(app).get(`/cliente/${uuid}`).auth(token, {type: 'bearer'});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('BloodType');
    });

    it('should NOT find a client based on uuid', async () => {
        const res = await request(app).get(`/cliente/123`).auth(token, {type: 'bearer'});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});

describe('/tipos Route', () => {
    it('should require authentication', async () => {
        const res = await request(app).get('/tipos');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ error: "Não autenticado"});
    });

    it('should list all bloodtypes', async () => {
        const res = await request(app).get('/tipos').auth(token, {type: 'bearer'});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('/especialidades Route', () => {
    it('should require authentication', async () => {
        const res = await request(app).get('/tipos');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ error: "Não autenticado"});
    });

    it('should list all specialities', async () => {
        const res = await request(app).get('/especialidades').auth(token, {type: 'bearer'});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

const consultasObj = {
	"scheduling_date": "2021-06-08T20:26:34.330",
	"value": 200,
	"clientsId": 1,
	"doctorsId": 1,
	"appointments_statusId": 1
};

describe('Consulta(s) Route', () => {
    it('should require authentication', async () => {
        const res = await request(app).get('/consultas');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ error: "Não autenticado"});
    });

    it('should schedule an appointment', async () => {
        const res = await request(app).post('/agendarConsulta').auth(token, {type: 'bearer'}).send(consultasObj);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');
    });

    it('should list all appointments', async () => {
        const res = await request(app).get('/consultas').auth(token, {type: 'bearer'});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('appointments');
        uuid = res.body.appointments[0].uuid;
    });

    it('should find an appointment based on uuid', async () => {
        const res = await request(app).get(`/consulta/${uuid}`).auth(token, {type: 'bearer'});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

    it('should update an appointment', async () => {
        const res = await request(app).put(`/alterarConsulta/${uuid}`).auth(token, {type: 'bearer'}).send({...consultasObj, value: 500});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

    it('should end an appointment', async () => {
        const res = await request(app).post(`/realizarConsulta/${uuid}`).auth(token, {type: 'bearer'}).send({
            description: "Teste",
	        appointment_date: new Date(),
	        clientsId: 1,
	        doctorsId: 1,
	        appointments_statusId: 2
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('medicalHistory');
    });
});