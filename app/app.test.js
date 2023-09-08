const app = require("./app.js");
const chai = require("chai");
const supertest = require("supertest");

describe("Teste da API", () => {
  it("Criação de uma tarefa no banco", (done) => {
    supertest(app)
      .post("/")
      .set("Content-Type", "application/json")
      .send({
        uuid: "4b898bf8-afbd-464b-9078-d589052e9325",
        tarefa: "exemplo",
      })
      .expect(200)
      .end((error, res) => {
        if (error) done(error);
        chai.expect(res.text).to.equal("Tarefa registrada");
        done();
      });
  });
  
  it("Leitura das tarefas do banco", (done) => {
    supertest(app).get("/getTarefas").expect(200, done);
  });
  
  it("Alteração das tarefas do banco", (done) => {
    supertest(app)
      .put("/4b898bf8-afbd-464b-9078-d589052e9325")
      .set("Content-Type", "application/json")
      .send({
        tarefa: "exemplo atualizado",
      })
      .expect(200)
      .end((error, res) => {
        if (error) done(error);
        chai.expect(res.text).to.equal("Tarefa atualizada")
        done();
      });
  });
  it("Deleção das tarefas do banco", (done) => {
    supertest(app)
      .del("/")
      .set("Content-Type", "application/json")
      .send({
        uuid: "4b898bf8-afbd-464b-9078-d589052e9325",
      })
      .expect(200)
      .end((error, res) => {
        if (error) done(error);
        chai.expect(res.text).to.equal("Tarefa removida")
        done();
      });
  });
});
