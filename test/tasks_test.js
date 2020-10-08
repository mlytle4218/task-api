process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
const { response } = require('express');
let should = chai.should();

chai.use(chaiHttp);
describe('Task test', () => {
    let userToken;
    before((done) => {
        let user = {
            username: 'corp\bob',
            password: '123'
        };
        chai.request(server)
            .post('/api/v1/user/authenticate')
            .send(user)
            .end((error, response) => {
                console.log(response.body.token);
                userToken = response.body.token
                done();
            })
    })
    beforeEach((done) => {
        done();
    })
    /*
    * dummy test
    */
    describe('dummy test', () => {
        it('it should do nothing', (done) => {
            done();
        })
    });
    /*
    test that it gets all the tasks avaiable, for now.
    */
    describe('/GET tasks', () => {
        it('it should GET all tasks', (done) => {
            chai.request(server)
                .get('api/v1/task')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
    test that it creates a new task
     */
    describe('/POST task', () => {
        it('it should create a task', (done) => {
            let task = {
                'name':'task name'
            }
            let body = {
                "token":userToken,
                "task":task
            }
            chai.request(server)
            
            .post('/api/v1/task')
            .send(body)
            .end((err, res) => {
                response.should.have.status(200);
                response.body.should.have.property('task');
                response.body.task.should.be.a('object');

            })
        })
    })

});