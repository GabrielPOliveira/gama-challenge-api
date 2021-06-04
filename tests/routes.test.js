const request = require('supertest');
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
    //login: "teste",
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

    it('should NOT update the login due to repeated login', async () => {
        const res = await request(app).put('/update').auth(token, { type: 'bearer' }).send({ login: "teste"});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ error: "Login em uso."});
    });

    it('should update the login', async () => {
        const res = await request(app).put('/update').auth(token, { type: 'bearer' }).send({ login: "newLogin"});
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Sucesso');
    });


    it('should NOT update the password due to invalid current password', async () => {
        const res = await request(app).put('/update').auth(token, { type: 'bearer' }).send({ ...updateObj, currentPassword: "teste12"});
        expect(res.statusCode).toEqual(401);
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
        const res = await request(app).get('/clientes');
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
});