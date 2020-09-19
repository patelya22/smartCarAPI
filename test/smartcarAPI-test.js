process.env.NODE_ENV = 'test';

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();


chai.use(chaiHttp);

describe("GET /vehicles/:id", () => {
    it("It should give an error when passing a wrong ID", (done)=> {
        chai.request(server)
            .get("/vehicles/123")
            .end((err, res) => {
                res.should.have.status(404);
            done();
            })
    })
    it("It should give us info about the car ID 1234", (done) => {
        chai.request(server)
            .get("/vehicles/1234")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("vin");
                res.body.should.have.property("color");
                res.body.should.have.property("doorCount");
                res.body.should.have.property("driveTrain");
            done();
            })
    })
})

describe("GET /vehicles/:id/doors", () => {
    it("It should give an error when passing a wrong id", (done)=> {
        chai.request(server)
            .get("/vehicles/123/doors")
            .end((err, res) => {
                res.should.have.status(404);
            done();
            })
    })
    it("It should give us security Info about the car ID 1234", (done) => {
        chai.request(server)
            .get("/vehicles/1234/doors")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            })
    })
})

describe("GET /vehicles/:id/fuel", () => {
    it("It should give an error when passing a wrong id", (done) => {
        chai.request(server)
            .get("/vehicles/123/fuel")
            .end((err, res) => {
                res.should.have.status(404);
            })
            done();
    })
    it("It should tell us to go to fuel since this is a fuel car", (done) => {
        chai.request(server)
            .get("/vehicles/1234/battery")
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("Message");
                res.body.should.have.property("endpoint");
            })
            done();
    })
    it("It should give us fuel percentage for the fuel car", (done) => {
        chai.request(server)
            .get("/vehicles/1234/fuel")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("percent");
            })
            done();
    })
});

describe("GET /vehicles/:id/battery", () => {
    it("It should give an error when passing a wrong id", (done) => {
        chai.request(server)
            .get("/vehicles/123/battery")
            .end((err, res) => {
                res.should.have.status(404);
            })
            done();
    })
    it("It should tell us to go to fuel since this is a fuel car", (done) => {
        chai.request(server)
            .get("/vehicles/1235/fuel")
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("Message");
                res.body.should.have.property("endpoint");
            })
            done();
    })
    it("It should give us fuel percentage for the fuel car", (done) => {
        chai.request(server)
            .get("/vehicles/1235/battery")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("percent");
            })
            done();
    })
});

describe("POST /vehicles/:id/engine", () => {
    it("It should give an error when passing a wrong id", (done) => {
        chai.request(server)
            .post("/vehicles/123/engine")
            .send({"action" : "START"})
            .end((err, res) => {
                res.should.have.status(404);
            })
            done();
    })
    it("It should give an error when user does not pass the data", (done) => {
        chai.request(server)
            .post("/vehicles/1234/engine")
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("message")
            })
            done();
    })
    it("It should give an error when passing wrong data", (done) => {
        chai.request(server)
            .post("/vehicles/1234/engine")
            .send({"action" : "WRONG_DATA"})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("message")
                res.body.message.should.equal("INVALID ACTION PASSED. VALID ACTION 'START' OR 'STOP'")
            })
            done();
    })
    it("It should pass when user STOP the car", (done) => {
        chai.request(server)
            .post("/vehicles/1234/engine")
            .send({"action" : "STOP"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("status");
            });
            done();
    })
    it("It should pass when user START the car", (done) => {
        chai.request(server)
            .post("/vehicles/1234/engine")
            .send({"action" : "START"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("status");
            });
            done();
    })
})