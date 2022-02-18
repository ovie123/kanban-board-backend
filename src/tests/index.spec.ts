import chaiHttp = require("chai-http");
import chai from "chai";
import app from "../server";

chai.use(chaiHttp);
const { expect } = chai;
let taskId: string = "";

describe("Create Task", () => {
  it("Should create a task", (done) => {
    chai
      .request(app)
      .post("/api/")
      .set("Accept", "application/json")
      .send({
        icon: "😂",
        status: "open",
        title: "Purchase present",
        content: "hello",
      })
      .end((err, res: any) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.a("object");
        expect(res.body.status).to.equal("open");
        taskId = res.body._id;
        done();
      });
  });

  it("Should return error when wrong value is sent", (done) => {
    chai
      .request(app)
      .post("/api/")
      .set("Accept", "application/json")
      .send({
        icon: "😂",
        status: "open",
        title: "Purchase present",
      })
      .end((err, res: any) => {
        const errorData = JSON.parse(res.error.text);
        expect(res.statusCode).to.equal(400);
        expect(errorData.errors[0]).to.be.a("object");
        expect(errorData.errors[0].msg).to.equal(
          "Content of the task is invalid"
        );
        done();
      });
  });
});

describe("Fetch Task", () => {
  it("Should fetch a task", (done) => {
    chai
      .request(app)
      .get(`/api/${taskId}`)
      .set("Accept", "application/json")
      .end((err, res: any) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body._id).to.equal(taskId);
        done();
      });
  });
  it("Should fetch all tasks", (done) => {
    chai
      .request(app)
      .get(`/api`)
      .set("Accept", "application/json")
      .end((err, res: any) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a("array");
        done();
      });
  });

  it("Should return error when invalid Id is sent", (done) => {
    chai
      .request(app)
      .get("/api/12345")
      .set("Accept", "application/json")
      .end((err, res: any) => {
        expect(res.statusCode).to.equal(404);
        expect(res.text).to.equal("item not found");
        done();
      });
  });
});

describe("Update Task", () => {
  it("Should create a task", (done) => {
    chai
      .request(app)
      .put(`/api/${taskId}`)
      .set("Accept", "application/json")
      .send({
        title: "Purchase bags",
      })
      .end((err, res: any) => {
        expect(res.statusCode).to.equal(200);
        chai
          .request(app)
          .get(`/api/${taskId}`)
          .set("Accept", "application/json")
          .end((err, res: any) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body.title).to.equal("Purchase bags");
            done();
          });
      });
  });

  it("Should return error when wrong id is sent", (done) => {
    chai
      .request(app)
      .put(`/api/1234`)
      .set("Accept", "application/json")
      .send({
        title: "Purchase water",
      })
      .end((err, res: any) => {
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
    chai
      .request(app)
      .delete(`/api/${taskId}`)
      .set("Accept", "application/json")
      .end((err, res: any) => {
        expect(res.statusCode).to.equal(204);
        done();
      });
  });

  it("Should return error when invalid id is sent", (done) => {
    chai
      .request(app)
      .delete(`/api/${taskId}`)
      .set("Accept", "application/json")
      .end((err, res: any) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors).to.equal("Id does not exist");
        done();
      });
  });
});
