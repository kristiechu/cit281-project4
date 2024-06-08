/* CIT 281 Project 4
Name: Kristie Chu
*/

const fs = require('fs');
const { data } = require("./p4-data.js");

function getQuestions() {
    return ['Q1', 'Q2', 'Q3' ];
}

function getAnswers() {
    return ['A1', 'A2', 'A3' ];
}

function getQuestionsAnswers() {
    const question = getQuestions();
    const answer = getAnswers();
    const qa = [];
    for (let i = 0; i < question.length; i++) {
        qa.push({question: question[i], answer: answer[i]});
    }
    const clonedQa = [...qa];
    return clonedQa;
}

function getQuestion(number = "") {
   const questObj = {error:'', question:'', number:''};
   const num = parseInt(number);
   if (isNaN(num)) {
       questObj.error = 'Question number must be an integer';
       return questObj;
   }
   if (num < 1) {
       questObj.error = 'Question number must be >= 1';
       return questObj;
   }
    if (num > data.length) {
         questObj.error = `Question number must be less than the number of questions (${data.length})`;
         return questObj;
    }
    questObj.question = data[num - 1].question;
    questObj.number = num;
    return questObj;
}

function getAnswer(number = "") {
    const answObj = {error:'', answer:'', number:''};
   const num = parseInt(number);
   if (isNaN(num)) {
    answObj.error = 'Answer number must be an integer';
       return answObj;
   }
   if (num < 1) {
    answObj.error = 'Answer number must be >= 1';
       return answObj;
   }
    if (num > data.length) {
        answObj.error = `Answer number must be less than the number of questions (${data.length})`;
         return answObj;
    }
    answObj.answer = data[num - 1].answer;
    answObj.number = num;
    return answObj;
    
}

function getQuestionAnswer(number = "") {
    const qaObj = {error:'', question:'', number:'', answer:''};
    if (number !== undefined) {
        const num = parseInt(number);
        if (isNaN(num)) {
            qaObj.error = 'Question number must be an integer';
            return qaObj;
        }
        if (num < 1) {
            qaObj.error = 'Question number must be >= 1';
            return qaObj;
        }
        if (num > data.length) {
            qaObj.error = `Question number must be less than the number of questions (${data.length})`;
            return qaObj;
        }
        qaObj.question = data[num - 1].question;
        qaObj.number = num;
        if (data[num - 1].answer !== undefined) {
            qaObj.answer = data[num - 1].answer;
            
        }
        return qaObj;

    }
    
};
    
function addQuestionAnswer(info = {}){
  //const addObj = {error:'', message:'', number:''};
    const {question = '', answer = ''} = info;
    if (!question) {
        return {error: 'Object question property required'};
      } else if (!answer) {
        return {error: 'Object answer property required'};
      }
    data.push({question: question, answer: answer});
    return {message: 'Question added', number: data.length};
    };

function updateQuestionAnswer(info = {}){
    //const updateObj = {error:'', message:'', number:''};
    const {question = '', answer = ''} = info;
    if (!question || !answer) {
        return {error: 'Object question property or answer property required'};
      } 
    if (typeof number !== 'number') {
        return {error: 'Object number property must be a valid integer'};
    }
    data.push({question: question, answer: answer});
    return {message: `Question ${number} updated`, number: data.length};
    
};

function deleteQuestionAnswer(info = {}) {
  const deleteObj = {error:'', message:'', number:''};
  const {number} = info;
  if (isNaN(number)) {
    return {error: 'Object number property must be a valid integer'};
}
  else if (number > 1) {
    return {error: 'Question/answer number must be >= 1'};
  }
  else if (number > data.length) {
      return {error: `Question/answer number must be less than the number of questions/answers (${data.length})`};
  }
      data.push({question: question, answer: answer});
  return {message: `Question ${number} deleted`, number: data.length};
};
/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
    console.log(`\n** Testing ${category} **`);
    console.log("-------------------------------");
    for (const o of args) {
      console.log(`-> ${category}${o.d}:`);
      console.log(o.f);
    }
  }
  
  // Set a constant to true to test the appropriate function
  const testGetQs = false; //works
  const testGetAs = false; //works
  const testGetQsAs = false; 
  const testGetQ = false;
  const testGetA = false;
  const testGetQA = false;
  const testAdd = false;      // Extra credit
  const testUpdate = false;   // Extra credit
  const testDelete = true;   // Extra credit

  // getQuestions()
if (testGetQs) {
    testing("getQuestions", { d: "()", f: getQuestions() });
  }
  
  // getAnswers()
  if (testGetAs) {
    testing("getAnswers", { d: "()", f: getAnswers() });
  }
  
  // getQuestionsAnswers()
  if (testGetQsAs) {
    testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
  }
  
  // getQuestion()
  if (testGetQ) {
    testing(
      "getQuestion",
      { d: "()", f: getQuestion() },      // Extra credit: +1
      { d: "(0)", f: getQuestion(0) },    // Extra credit: +1
      { d: "(1)", f: getQuestion(1) },
      { d: "(4)", f: getQuestion(4) }     // Extra credit: +1
    );
  }
  
  // getAnswer()
  if (testGetA) {
    testing(
      "getAnswer",
      { d: "()", f: getAnswer() },        // Extra credit: +1
      { d: "(0)", f: getAnswer(0) },      // Extra credit: +1
      { d: "(1)", f: getAnswer(1) },
      { d: "(4)", f: getAnswer(4) }       // Extra credit: +1
    );
  }
  
  // getQuestionAnswer()
  if (testGetQA) {
    testing(
      "getQuestionAnswer",
      { d: "()", f: getQuestionAnswer() },    // Extra credit: +1
      { d: "(0)", f: getQuestionAnswer(0) },  // Extra credit: +1
      { d: "(1)", f: getQuestionAnswer(1) },
      { d: "(4)", f: getQuestionAnswer(4) }   // Extra credit: +1
    );
  }
// addQuestionAnswer()
if (testAdd) {
  testing(
    "addQuestionAnswer",
    { d: "()", f: addQuestionAnswer() },
    { d: "({})", f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
    {
      d: '(question: "Q4", answer: "A4")',
      f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
    }
  );
}
// updateQuestionAnswer()
if (testUpdate) {
  testing(
    "updateQuestionAnswer",
    { d: "()", f: updateQuestionAnswer() },
    { d: "({})", f: updateQuestionAnswer({}) },
    { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
    { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
    {
      d: '(question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }),
    },
    {
      d: '(number: 1, question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }),
    }
  );
  console.log(data);
}
// deleteQuestionAnswer()
if (testDelete) {
  testing(
    "deleteQuestionAnswer",
    { d: "()", f: deleteQuestionAnswer() },
    { d: "(0)", f: deleteQuestionAnswer(0) },
    { d: "(1)", f: deleteQuestionAnswer(1) },
    { d: "(0)", f: deleteQuestionAnswer(4) }
  );
  console.log(data);
}

  module.exports = {
    getQuestions,
    getAnswers,
    getQuestionsAnswers,
    getQuestion,
    getAnswer,
    getQuestionAnswer,
    addQuestionAnswer,
    updateQuestionAnswer,
    deleteQuestionAnswer
  };