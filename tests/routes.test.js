const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../src/models');

const register = {
    login: "teste",
    password: "teste123",
    name: "Bruno",
    type: 2
}


afterAll(done => {
    sequelize.connectionManager.close()
    done()
})

describe('User create route', () => {
    it('should create a new user', async() => {
        const res = await request(app).post('/registrar').send(register);
        expect(res.statusCode).toEqual(200)
    });
    it('should not create a new user', async() => {
        const res = await request(app).post('/registrar').send(register);
        expect(res.statusCode).toEqual(400) //Login não único deve causar status=400
    });
});

const login = {
    login: "teste",
    password: "teste123"
}

let token;
describe('Login route', () => {
    it('should login as a user', async() => {
        const res = await request(app).post('/logar').send(login);
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
        token = res.body.token;
    });
});

