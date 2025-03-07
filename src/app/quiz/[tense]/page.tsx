// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

function updateSession() {
  const formattedDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  let session = localStorage.getItem("session") || "";

  // Determine new session value
  session = session.startsWith(formattedDate)
    ? `${formattedDate}_${parseInt(session.split("_")[1]) + 1}`
    : `${formattedDate}_1`;

  // Save updated session
  localStorage.setItem("session", session);

  return session;
}

const Quiz = () => {
  const { tense } = useParams();
  const [quizResult, setQuizResult] = useState([]);
  const [quizState, setQuizState] = useState("initial");
  const [tenseQuiz, setTenseQuiz] = useState<any[]>([]);

  const [timePerQuestion, setTimePerQuestion] = useState(20);
  const [questionAmount, setQuestionAmount] = useState(20);

  const fetchData = () => {
    fetch(`https://syntaxmap-back-p4ve.onrender.com/quiz/` + tense, {
      method: "GET", // You can change this to POST/PUT if necessary
      headers: { Authorization: localStorage.getItem("jstoken") || "" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Decision", data);
        setTenseQuiz(data.questions);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [note, setNote] = useState();

  useEffect(() => {
    if (timePerQuestion === 0) {
      handleNextQuestion(null); // Move to next question if time runs out
    }

    const timer = setInterval(() => {
      setTimePerQuestion((prev: any) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timePerQuestion, setTimePerQuestion]);

  function getWrongQuestions(questionResults: any) {
    return questionResults
      .filter((item: any) => !item.correct) // Filter out incorrect answers
      .map((item: any) => item.question_id); // Extract question IDs
  }

  const handleSaveQuiz = (e: any) => {
    e.preventDefault();

    const mistakes = getWrongQuestions(quizResults);

    const quizData = {
      questions_wrong_id: mistakes || [],
      session_name: localStorage.getItem("session"),
    };

    const noteData = {
      note: note,
      session_name: localStorage.getItem("session"),
    };

    fetch("https://syntaxmap-back-p4ve.onrender.com/mistakeQuestion", {
      method: "POST",
      body: JSON.stringify(quizData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("jstoken") || "",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("https://syntaxmap-back-p4ve.onrender.com/notepad", {
      method: "POST",
      body: JSON.stringify(noteData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("jstoken") || "",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setQuizState("submitted");
  };

  const handleNextQuestion = (answer: string | null) => {
    if (answer) {
      setQuizResults((prev) => [
        ...prev,
        {
          question_id: tenseQuiz[currentIndex].question_id,
          selected_answer: answer,
          correct: answer === tenseQuiz[currentIndex].right_answer,
        },
      ]);
    }

    if (currentIndex < questionAmount) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimePerQuestion(timePerQuestion); // Reset timer
    } else {
      setQuizState("completed");
    }
  };

  if (!tenseQuiz.length) return <p>No questions available</p>;

  const currentQuestion = tenseQuiz[currentIndex];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center ">
      <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
        <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg mb-4 h-[500px] flex justify-center items-center">
          <div
            className={`${
              quizState == "initial" ? "flex" : "hidden"
            }  flex-col items-center  justify-between p-4  md:flex-col`}
          >
            <h2 className="max-w-full text-center mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              Quiz
            </h2>
            <p className=" mb-8 text-lg text-center  tracking-tight leading-none md:text-xl xl:text-2xl dark:text-white">
              You can double click a word to see its definition. While you read
              the definition, the timer is stopped. Set the following parameters
              before you start the quiz.
            </p>

            <div className="w-1/2 flex justify-between gap-4 mb-10 ">
              <div className="w-full ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Seconds Per
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={timePerQuestion}
                  onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                >
                  <option value="20">20</option>
                  <option value="15">15</option>
                  <option value="10">10</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="w-full ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Start With
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={questionAmount}
                  onChange={(e) =>
                    setQuestionAmount(Number(e.target.value) - 1)
                  }
                >
                  <option value="20">20</option>
                  <option value="15">15</option>
                  <option value="10">10</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setQuizState("started");
                updateSession();
              }}
              type="button"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Start Quiz
            </button>
          </div>
          <div
            className={`${
              quizState == "started" ? "flex" : "hidden"
            } flex flex-col items-center  justify-between p-4  md:flex-col`}
          >
            <div className="flex flex-col items-center justify-between p-4">
              <div className="flex justify-center gap-4 mb-8">
                <p className="text-md border-white rounded-lg px-2 py-2 border dark:text-white">
                  Question: {currentIndex + 1}
                </p>
                <p className="text-md border-white rounded-lg px-2 py-2 border dark:text-white">
                  Time Left: {timePerQuestion}s
                </p>
              </div>

              <h2 className="text-center mb-8 text-3xl font-extrabold tracking-tight leading-none dark:text-white">
                {currentQuestion.question_title}
              </h2>

              <div className="w-1/2 flex justify-between gap-4 mb-10">
                {["a", "b", "c", "d"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleNextQuestion(option)}
                    className={`w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg ${
                      selectedAnswer === option ? "bg-green-700" : "bg-blue-700"
                    } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300`}
                  >
                    {currentQuestion[`answer_title_${option}`]}
                  </button>
                ))}
              </div>

              <button className="px-4 py-2 text-sm font-medium text-white rounded-lg">
                Report Error
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSaveQuiz}
            className={`${
              quizState == "completed" ? "flex" : "hidden"
            } flex flex-col items-center  justify-between p-4  md:flex-col`}
          >
            <h2 className=" text-center mb-8 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              Quiz Complete!
            </h2>
            <p className=" text-center text-md  mb-4  md:text-lg xl:text-xl dark:text-white">
              Your Result is
            </p>
            <div className="flex justify-center gap-4  flex items-center  mb-8 ">
              <p className=" text-center text-md border-white rounded-lg px-2 py-2 border md:text-lg xl:text-xl dark:text-white">
                {` ${
                  quizResults.filter((result) => result.correct).length
                } / ${questionAmount}`}
              </p>
            </div>

            <p className="flex px-4 py-2 text-sm font-medium text-white ">
              Take a note for this batch. You will be able to see it in your
              notepad.
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              placeholder="Write quiz note here."
            ></textarea>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </form>
          <div
            className={`${
              quizState == "submitted" ? "flex" : "hidden"
            } flex flex-col items-center  justify-between p-4  md:flex-col`}
          >
            <h2 className=" text-center mb-8 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              You have saved your result and note.
            </h2>
            <Link href="/tensemap">
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go back to Syntax Map
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
