"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chaiHttp = require("chai-http");
const chai_1 = __importDefault(require("chai"));
const server_1 = __importDefault(require("../server"));
chai_1.default.use(chaiHttp);
const { expect } = chai_1.default;
let taskId = "";
describe("Create Task", () => {
    it("Should create a task", (done) => {
        chai_1.default
            .request(server_1.default)
            .post("/api/")
            .set("Accept", "application/json")
            .send({
            icon: "😂",
            status: "open",
            title: "Purchase present",
            content: "hello",
        })
            .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.a("object");
            expect(res.body.status).to.equal("open");
            taskId = res.body._id;
            done();
        });
    });
    it("Should return error when wrong value is sent", (done) => {
        chai_1.default
            .request(server_1.default)
            .post("/api/")
            .set("Accept", "application/json")
            .send({
            icon: "😂",
            status: "open",
            title: "Purchase present",
        })
            .end((err, res) => {
            const errorData = JSON.parse(res.error.text);
            expect(res.statusCode).to.equal(400);
            expect(errorData.errors[0]).to.be.a("object");
            expect(errorData.errors[0].msg).to.equal("Content of the task is invalid");
            done();
        });
    });
});
describe("Fetch Task", () => {
    it("Should fetch a task", (done) => {
        chai_1.default
            .request(server_1.default)
            .get(`/api/${taskId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body._id).to.equal(taskId);
            done();
        });
    });
    it("Should fetch all tasks", (done) => {
        chai_1.default
            .request(server_1.default)
            .get(`/api`)
            .set("Accept", "application/json")
            .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.a("array");
            done();
        });
    });
    it("Should return error when invalid Id is sent", (done) => {
        chai_1.default
            .request(server_1.default)
            .get("/api/12345")
            .set("Accept", "application/json")
            .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.text).to.equal("item not found");
            done();
        });
    });
});
describe("Update Task", () => {
    it("Should create a task", (done) => {
        chai_1.default
            .request(server_1.default)
            .put(`/api/${taskId}`)
            .set("Accept", "application/json")
            .send({
            title: "Purchase bags",
        })
            .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            chai_1.default
                .request(server_1.default)
                .get(`/api/${taskId}`)
                .set("Accept", "application/json")
                .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.a("object");
                expect(res.body.title).to.equal("Purchase bags");
                done();
            });
        });
    });
    it("Should return error when wrong id is sent", (done) => {
        chai_1.default
            .request(server_1.default)
            .put(`/api/1234`)
            .set("Accept", "application/json")
            .send({
            title: "Purchase water",
        })
            .end((err, res) => {
            const errorData = JSON.parse(res.error.text);
            expect(res.statusCode).to.equal(400);
            expect(errorData).to.be.a("object");
            expect(errorData.errors).to.equal("Id does not exist");
            done();
        });
    });
});
describe("Delete Task", () => {
    it("Should delete a task", (done) => {
        chai_1.default
            .request(server_1.default)
            .delete(`/api/${taskId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
            expect(res.statusCode).to.equal(204);
            done();
        });
    });
    it("Should return error when invalid id is sent", (done) => {
        chai_1.default
            .request(server_1.default)
            .delete(`/api/${taskId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.errors).to.equal("Id does not exist");
            done();
        });
    });
});
