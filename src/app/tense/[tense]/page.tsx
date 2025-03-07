"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const TensePage = () => {
  const { tense } = useParams();
  const [sentence, setSentence] = useState("");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [userExamples, setExamples] = useState([]);

  const [tenseData, setTenseData] = useState({
    course_title: "",
    course_data: "",
    course_id: "",
  });

  let courseId = "";
  function capitalizeWords(input: string): string {
    return input
      .toLowerCase()
      .replace(/\b[a-z]/g, (char) => char.toUpperCase()); // Ensure only letters are capitalized
  }
  const fetchData = (tense: any) => {
    console.log(tense);
    fetch(`https://syntaxmap-back-p4ve.onrender.com/course/${tense}`, {
      method: "GET", // You can change this to POST/PUT if necessary
      headers: { Authorization: localStorage.getItem("jstoken") || "" },
    })
      .then((res) => res.json())
      .then((res) => {
        setTenseData(res.courses[0]);
        courseId = res.courses[0].course_id;
        fetch("https://syntaxmap-back-p4ve.onrender.com/userupload/user/", {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.getItem("jstoken") || " ",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              const filtered = data.userUploads.filter(
                (ex: any) => ex.course_id == courseId
              );
              setExamples(filtered);
            }
          })
          .catch((err) => {
            console.log("Encountering Error");
            console.error(err);
          });
      });
  };

  useEffect(() => {
    fetchData(tense);
  }, [setExamples, setTenseData]);

  const handleExampleSubmit = (e: any) => {
    e.preventDefault();

    // Check if the token exists
    // Prepare data for upload (no image)
    const data = {
      sentence: sentence,
      course_id: tenseData.course_id,
    };

    fetch("https://syntaxmap-back-p4ve.onrender.com/userupload", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("jstoken") || "",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsCourseModalOpen(false);
        reload(); // Reload after success
        fetchData(tense);
      })
      .catch((err) => {
        console.log(err);
        setIsCourseModalOpen(false);
        fetchData(tense);
      });
  };

  return (
    <div className="">
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          !isCourseModalOpen && "hidden"
        } fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center`} // Flexbox for centering and overlay with opacity
      >
        <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Example
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
          <form className="p-4 md:p-5" onSubmit={handleExampleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Example Sentence
                </label>
                <input
                  type="text"
                  value={sentence}
                  onChange={(e) => setSentence(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter sentence"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              Upload Example
            </button>
          </form>
        </div>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 h-screen flex pt-10">
        <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
          <div className="flex justify-between">
            <h2 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              {capitalizeWords(tenseData.course_title || "")}
            </h2>
            <Link href={`/quiz/${tenseData.course_id}`}>
              <button
                type="button"
                className="flex items-center justify-center px-4 h-full py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                Go to Quiz
              </button>
            </Link>
          </div>

          <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg mb-4">
            <div className="flex flex-col  justify-between p-4  md:flex-col">
              <h3 className=" mb-2 text-lg font-extrabold tracking-tight leading-none md:text-xl xl:text-2xl dark:text-white">
                Definition
              </h3>
              <p>{tenseData.course_data}</p>
            </div>
          </div>
          <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg mb-4">
            <div className="flex flex-col  justify-between p-4  md:flex-col">
              <div className="flex justify-between">
                <h3 className=" mb-2 text-lg font-extrabold tracking-tight leading-none md:text-xl xl:text-2xl dark:text-white">
                  Examples
                </h3>
                <button onClick={() => setIsCourseModalOpen(true)}>
                  Upload Example
                </button>
              </div>

              {userExamples.map(({ sentence }) => (
                <p>{sentence}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TensePage;
function reload() {
  throw new Error("Function not implemented.");
}
