import chai, { assert, expect } from 'chai'; 
import chaiHttp from 'chai-http';
import { it } from 'mocha';
import server from '../server'
import mongoose from 'mongoose';

const MONGO_DB_URI: string = require('../configuration').default;

//Assertions
chai.use(chaiHttp);

before(async () => {
});

describe('Test database connection', () => {
    it('It should establish connection to the database', async () => {
        await mongoose.connect(MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    }).timeout(10000)
    it('Mongoose connection readystate should equal 1', () =>{
        assert.equal(mongoose.connection.readyState, 1);
    })
})
describe('Server APIs', () =>{
    describe('Test root page', () => {
        it("It should return 200 statuscode and be in HTML format", async () =>{
            chai.request(server).get('/').end((err, res) => {
                assert.equal(res.status, 200);
                expect(res).to.be.html;

            });
        })
    })
    describe('Test a bogey page eg. /asdfasdfasdf', () => {
        it("It should return 200 statuscode and be in HTML format because it redirects to the root page", async () =>{
            chai.request(server).get('/asdfasdfasdf').end((err, res) => {
                assert.equal(res.status, 200);
                expect(res).to.be.html;

            });
        })
    })
    describe('Test listings endpoint at /listings', () => {
        it("It should return 200 statuscode and be in JSON format", async () =>{
            chai.request(server).get('/listings').then((res) => {
                assert.equal(res.status, 200);
                expect(res).to.be.json;

            }).catch((err) => {
                throw err;
            });
        })
        
    })  
})