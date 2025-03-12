// @ts-nocheck
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Courses = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courseIds, setCourseIds] = useState([]);
  const [difficulty, setDifficulty] = useState("facile"); // Default to "Facile"

  const handleCourseSelect = (e) => {
    const selectedCourseId = e.target.value;

    setCourseIds(
      (prevCourseIds) =>
        prevCourseIds.includes(selectedCourseId)
          ? prevCourseIds.filter((id) => id !== selectedCourseId) // Remove if exists
          : [selectedCourseId, ...prevCourseIds] // Add at the top if not
    );
  };

  const createQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e, courseIds, difficulty);
    setIsLoading(true);

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const quizData = {
      question_title: formData.get("question_title") as string,
      quiz_data: [
        formData.get("answer_title_a") as string,
        formData.get("answer_title_b") as string,
        formData.get("answer_title_c") as string,
        formData.get("answer_title_d") as string,
      ],
      difficulty: 1,
      online_exam_ids: courseIds,
    };

    quizData.verified = true;
    fetch("http://localhost:8000/quiz", {
      method: "POST",
      body: JSON.stringify(quizData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("jstoken") || "",
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetch("https://syntaxmap-back-p4ve.onrender.com/quiz")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setQuestions(data.questions);
            fetch("https://syntaxmap-back-p4ve.onrender.com/course")
              .then((res) => res.json())
              .then((res) => {
                setCourses(res.courses);
                setIsLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          })
          .catch((err) => console.log(err));
        setIsCourseModalOpen(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setIsLoading(true);
    fetch("https://syntaxmap-back-p4ve.onrender.com/quiz")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data.questions);
        setIsLoading(false);
        fetch("https://syntaxmap-back-p4ve.onrender.com/course")
          .then((res) => res.json())
          .then((res) => {
            setCourses(res.courses);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const updateCourse = (e: any) => {
    e.preventDefault();
    fetch(
      `https://syntaxmap-back-p4ve.onrender.com/course/${e.target[0].value}`,
      {
        method: "PUT",
        body: JSON.stringify({
          course_id: e.target[0].value,
          course_item: e.target[1].value,
          course_title: e.target[2].value,
          course_data: e.target[3].value,
          course_image: null,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.getItem("jstoken") || "",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const deleteCourse = (courseId: any) => {
    setIsLoading(true);
    fetch(`https://syntaxmap-back-p4ve.onrender.com/quiz/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("jstoken") || "",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  if (isLoading)
    return (
      <div className="dark:bg-gray-900 h-screen w-screen z-[100] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="overflow-y-scroll min-h-screen bg-gray-900">
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          !isCourseModalOpen && "hidden"
        } fixed overflow-y-scroll inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center`} // Flexbox for centering and overlay with opacity
      >
        <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Question
            </h3>
            <button
              onClick={() => setIsCourseModalOpen(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={createQuestion}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Online Exams
                </label>
                {courseIds.map((id) => (
                  <div
                    className="px-2 py-1 border-white border-2 mb-2 rounded-lg relative"
                    key={id}
                  >
                    {
                      courses.find((course) => course.course_id == id)
                        ?.course_item
                    }
                    <span
                      onClick={() =>
                        setCourseIds((prev) =>
                          prev.filter((courseId) => courseId !== id)
                        )
                      }
                      className="absolute right-5"
                    >
                      x
                    </span>
                  </div>
                ))}

                <select
                  onChange={handleCourseSelect}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.course_item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Question
                </label>
                <input
                  type="text"
                  name="question_title"
                  id="question_title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Question Here"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                  Options
                </label>
                <input
                  type="text"
                  name="answer_title_a"
                  id="answer_title_a"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Good Answer"
                  required
                />
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  name="answer_title_b"
                  id="answer_title_b"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Bad Answer"
                  required
                />
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  name="answer_title_c"
                  id="answer_title_c"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Bad Answer"
                  required
                />
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  name="answer_title_d"
                  id="answer_title_d"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Bad Answer"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Difficulty Level
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="facile"
                      checked={difficulty === "facile"}
                      onChange={() => setDifficulty("facile")}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-gray-900 dark:text-white">
                      Facile
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="toeic"
                      checked={difficulty === "toeic"}
                      onChange={() => setDifficulty("toeic")}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-gray-900 dark:text-white">TOEIC</span>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new question
            </button>
          </form>
        </div>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 h-screen flex pt-10">
        <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
          <h2 className="mt-12 max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
            Questions
          </h2>
          <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg mb-4">
            <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                <button
                  onClick={() => setIsCourseModalOpen(true)}
                  type="button"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add Question
                </button>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Online Exam IDs
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Verified
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions?.map((course: any) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {course?.question_id}
                      </th>
                      <td className="px-6 py-2">
                        {" "}
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          type="text"
                          defaultValue={course?.online_exam_ids}
                        />
                      </td>
                      <td className="px-6 py-2">
                        {" "}
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          type="text"
                          defaultValue={course?.question_title}
                        />
                      </td>
                      <td className="px-6 py-2">
                        {" "}
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          type="text"
                          defaultValue={course?.verified}
                        />
                      </td>
                      <td className="px-6 py-2">
                        {" "}
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          type="text"
                          defaultValue={course?.ifficulty}
                        />
                      </td>
                      <td className="px-6 py-2">
                        <div className="flex gap-4">
                          <button
                            onClick={updateCourse}
                            type="submit"
                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => deleteCourse(course.course_id)}
                            className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
