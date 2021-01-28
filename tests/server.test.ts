import chai, { assert, expect } from 'chai'; 
import chaiHttp from 'chai-http';
import { it } from 'mocha';
import server from '../server'

//Assertions
chai.use(chaiHttp);

describe('Server APIs', () =>{
    describe('Test root page', () => {
        it("It should return 200 statuscode and be in HTML format", (done) =>{
            chai.request(server).get('/').end((err, res) => {
                assert.equal(res.status, 200);
                expect(res).to.be.html;
                done();
            });
        })
    })
    describe('Test a bogey page eg. /asdfasdfasdf', () => {
        it("It should return 200 statuscode and be in HTML format because it redirects to the root page", (done) =>{
            chai.request(server).get('/asdfasdfasdf').end((err, res) => {
                assert.equal(res.status, 200);
                expect(res).to.be.html;
                done();
            });
        })
    })
    
})