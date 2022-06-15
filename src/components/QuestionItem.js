import React from "react";

function QuestionItem({ question, questions, setQuestions, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteQuestion() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then(() => onDeleteQuestion(question))
  }

  function handleAnswerQuestion() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        correctIndex: parseInt(question.correctIndex),
      }),

    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion
          console.log(question.id)
          console.log(question)
          return q
        })
        setQuestions(updatedQuestions)
      })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerQuestion}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
