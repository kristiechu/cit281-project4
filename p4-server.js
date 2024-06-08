const fs = require("fs");
const {
  data,
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer,
} = require("./p4-module.js");
// Require the Fastify framework and instantiate it

const fastify = require("fastify")({
  logger: false,
});

fastify.get("/cit/question", (request, reply) => {
  const questions = getQuestions();
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      error: "",
      statusCode: 200,
      questions: questions,
    });
});

fastify.get("/cit/answer", (request, reply) => {
  const answers = getAnswers();
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      error: "",
      statusCode: 200,
      answers: answers,
    });
});

fastify.get("/cit/questionanswer", (request, reply) => {
  const questionsAnswers = getQuestionsAnswers();
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      error: "",
      statusCode: 200,
      questions_answers: questionsAnswers,
    });
});

fastify.get("/cit/question/:number", (request, reply) => {
  const { number } = request.params;
  const question = getQuestion(number);
  if (question.question) {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        error: "",
        statusCode: 200,
        question: question.question,
        number: question.number,
      });
  } else {
    reply
      .code(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        error: question.error,
        statusCode: 400,
      });
  }
});

fastify.get("/cit/answer/:number", (request, reply) => {
  const { number } = request.params;
  const answer = getAnswer(number);
  if (answer.answer) {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        error: "",
        statusCode: 200,
        question: answer.answer,
        number: answer.number,
      });
  } else {
    reply
      .code(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        error: answer.error,
        statusCode: 400,
      });
  }
});

fastify.get("/cit/questionanswer/:number", (request, reply) => {
  const { number } = request.params;
  const QnA = getQuestionAnswer(number);
  if (QnA.error) {
    reply
      .code(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        error: QnA.error,
        statusCode: 400,
      });
  } else {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        error: "",
        statusCode: 200,
        question: QnA.question,
        answer: QnA.answer,
        number: QnA.number,
      });
  }
});

fastify.get("*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      error: "Route not found",
      statusCode: 404,
    });
});

fastify.post("/cit/question", (request, reply) => {
  const { question, answer } = request.body;
  const result = addQuestionAnswer(question, answer);
  if (result.error) {
    reply
      .code(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        error: result.error,
        statusCode: 400,
      });
  } else {
    reply
      .code(201)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        error: "",
        statusCode: 201,
        number: result.number,
      });
  }
});

fastify.put("/cit/question", (request, reply) => {
    const { question, answer } = request.body;
    const result = updateQuestionAnswer(question, answer);
    if (result.error) {
        reply
        .code(400)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            error: result.error,
            statusCode: 400,
        });
    } else {
        reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            error: "",
            statusCode: 200,
            number: result.number,
        });
    }
    });
fastify.delete("/cit/question/:number", (request, reply) => {
    const { number } = request.params;
    const result = deleteQuestionAnswer(number);
    if (result.error) {
        reply
        .code(400)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            error: result.error,
            statusCode: 400,
        });
    } else {
        reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            error: "",
            statusCode: 200,
            number: result.number,
        });
    }
    });
// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    // fastify.log.error(err);
    console.log(err);
    process.exit(1);
  }
  // fastify.log.info(`Server listening on ${address}`);
  console.log(`Server listening on ${address}`);
});
