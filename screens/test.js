let question = "ddfgdfg?";

const checkQuestionMark = () => {
  if (question.includes("?")) {
    question = question.replace("?", "");
  }
  console.log("HERE IS THE QUESION: ", question);
};

checkQuestionMark();
