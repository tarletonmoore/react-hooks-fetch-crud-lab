import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))

  }, [])

  function handleDelete(deletedQuestion) {
    console.log(deletedQuestion)
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  const questionsToDisplay = questions.filter((question) => question)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul className="Questions">
        {questionsToDisplay.map((question) => (
          <QuestionItem key={question.id} question={question} questions={questions} setQuestions={setQuestions} onDeleteQuestion={handleDelete} />
        ))}

      </ul>
    </section>
  );
}

export default QuestionList;
