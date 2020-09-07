process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
// let server = "localhost:8080/api/v1"
const { response } = require('express');
let should = chai.should();

chai.use(chaiHttp);
describe('User authentication', () => {
    beforeEach((done) => {
        done();
    })
    describe('/POST Authenticate user', () => {
        it('it should authenticate a user against the windows domain using domain', (done) => {
            let user = {
                username: 'corp\bob',
                password: '123'
            }
            chai.request(server)
                .post('/api/v1/user/authenticate')
                .send(user)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('token');
                    response.body.should.have.property('users');
                    response.body.users.should.be.a('array');
                    done();
                })
        });
        it('it should authenticate a user against the windows domain using full email address', (done) => {
            let user = {
                username: 'bob@jsatautomation.com',
                password: '123'
            }
            chai.request(server)
                .post('/api/v1/user/authenticate')
                .send(user)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('token');
                    response.body.should.have.property('users');
                    response.body.users.should.be.a('array');
                    done();
                })
        });
        it('it should return an error that the username is missing', (done) => {
            let user = {
                password: '123'
            }
            chai.request(server)
                .post('/api/v1/user/authenticate')
                .send(user)
                .end((error, response) => {
                    response.should.have.status(401);
                    response.body.errors.should.have.property('username');
                    response.body.errors.username.should.have.property('missing');
                    done();
                })
        });
        it('it should retrun an error that the password is missing.', (done) => {
            let user = {
                username: 'bob'
            }
            chai.request(server)
                .post('/api/v1/user/authenticate')
                .send(user)
                .end((error, response) => {
                    response.should.have.status(401);
                    response.body.errors.should.have.property('password');
                    response.body.errors.password.should.have.property('missing');
                    done();
                })
        })
    });
});