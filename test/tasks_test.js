process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
const { response } = require('express');
let should = chai.should();

chai.use(chaiHttp);
describe('User authentication', () => {
    beforeEach((done) => {
        done();
    })   
    /*
    test that it gets all the tasks avaiable, for now.
    */
    // describe('/GET tasks', () => {
    //     it('it should GET all tasks', (done) => {
    //         chai.request(server)
    //         .get('/book')
    //         .end((error, response) => {
    //             response.should.have.status(200);
    //             response.body.should.be.a('array');
    //             response.body.length.should.be.eql(0);
    //             done();
    //         });
    //     });
    // });
    // /*
    // test that it creates a new task
    //  */
    // describe('/POST task', () => {
    //     it('it should ')
    // })

});