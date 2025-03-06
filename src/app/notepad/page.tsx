"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

function mergeSessions(notes: any, mistakes: any, questionsMap: any) {
  const mergedData: any = {};

  // Merge notes
  notes.forEach((note: any) => {
    const { session_name, user_id, note_id, note: noteText } = note;
    if (!mergedData[session_name]) {
      mergedData[session_name] = {
        session_name,
        user_id,
        note_id,
        note: noteText,
        questions_wrong_id: [],
        questions: [], // Store full questions
      };
    }
  });

  // Merge mistakes
  mistakes.forEach((mistake: any) => {
    const { session_name, user_id, mistake_id, questions_wrong_id } = mistake;
    if (!mergedData[session_name]) {
      mergedData[session_name] = {
        session_name,
        user_id,
        questions_wrong_id: [],
        questions: [],
      };
    }
    mergedData[session_name].mistake_id = mistake_id;
    mergedData[session_name].questions_wrong_id = questions_wrong_id || [];
    mergedData[session_name].questions = questions_wrong_id
      ? questions_wrong_id
          .map((id: number) => questionsMap[id] || null)
          .filter(Boolean)
      : [];
  });

  return Object.values(mergedData);
}

const Notepad = () => {
  const [mergedData, setMergedData] = useState<any>([]);
  const [wordsData, setWords] = useState([]);
  const [examplesData, setExamplesData] = useState([]);

  useEffect(() => {
    fetch("https://syntaxmap-back-p4ve.onrender.com/dictionnary/user/", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("jstoken") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWords(data.dictionnary);
        fetch("https://syntaxmap-back-p4ve.onrender.com/userupload/user", {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.getItem("jstoken") || "",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setExamplesData(data.userUploads);

            fetch(
              "https://syntaxmap-back-p4ve.onrender.com/mistakeQuestion/user/",
              {
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  Authorization: localStorage.getItem("jstoken") || "",
                },
              }
            )
              .then((res) => res.json())
              .then((mistakes) => {
                if (mistakes) {
                  fetch(
                    "https://syntaxmap-back-p4ve.onrender.com/notepad/user/",
                    {
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: localStorage.getItem("jstoken") || "",
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then(async (res) => {
                      if (res) {
                        const notes = res.notepads.map((note: any) => note);

                        // Collect all unique question IDs
                        const questionIds = new Set();
                        mistakes.mistakeQuestions.forEach((mistake: any) => {
                          mistake.questions_wrong_id.forEach((id: number) =>
                            questionIds.add(id)
                          );
                        });

                        // Fetch questions one by one
                        const questionsMap: any = {};
                        await Promise.all(
                          [...questionIds].map(async (id: any) => {
                            try {
                              const response = await fetch(
                                `https://syntaxmap-back-p4ve.onrender.com/quiz/${id}`,
                                {
                                  headers: {
                                    "Content-type":
                                      "application/json; charset=UTF-8",
                                    Authorization:
                                      localStorage.getItem("jstoken") || "",
                                  },
                                }
                              );
                              const data = await response.json();
                              if (data.questions && data.questions.length > 0) {
                                questionsMap[id] = data.questions[0]; // Store first result
                              }
                            } catch (error) {
                              console.error(
                                `Error fetching question ${id}:`,
                                error
                              );
                            }
                          })
                        );

                        // Merge all data
                        const data = mergeSessions(
                          notes,
                          mistakes.mistakeQuestions,
                          questionsMap
                        );
                        setMergedData(data);
                      }
                    })
                    .catch((error) => console.error(error));
                }
              })
              .catch((error) => console.error(error));
          });
      });
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex pt-10">
      <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
        <main className="h-auto ">
          <h2 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
            Notepad
          </h2>
          <div className="flex  gap-4">
            <div className="relative bg-gray-50 h-32 w-32 rounded-md items-center justify-center flex flex-col gap-2  p-4 dark:bg-gray-700">
              <span className="text-4xl font-bold">{mergedData.length}</span>
              <span className="top-10 text-lg uppercasse">QUIZES</span>
            </div>
            <div className="relative bg-gray-50 h-32 w-32 rounded-md items-center justify-center flex flex-col gap-2  p-4 dark:bg-gray-700">
              <span className="text-4xl font-bold">{examplesData.length}</span>
              <span className="top-10 text-lg uppercasse">EXAMPLES</span>
            </div>
            <div className="relative bg-gray-50 h-32 w-32 rounded-md items-center justify-center flex flex-col gap-2  p-4 dark:bg-gray-700">
              <span className="text-4xl font-bold">{wordsData.length}</span>
              <span className="top-10 text-lg uppercasse">WORDS</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-between w-full">
            <div className=" mt-10 w-full  relative overflow-x-auto shadow-md sm:rounded-lg">
              <h3 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-2xl xl:text-3xl dark:text-white">
                Quiz
              </h3>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Session
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Note
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Mistaken Questions
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mergedData.map((data: any, index: any) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {data.session_name}
                        </th>
                        <td className="px-6 py-4">{data.note}</td>
                        <td className="px-6 py-4">{data.words}</td>
                        <td className="px-6 py-4">
                          {data.questions.map((q: any) => (
                            <p>{q.question_title}</p>
                          ))}
                        </td>
                        <td className="px-6 py-4">
                          {data.questions_wrong_id.length}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex w-full gap-8 justify-between">
              <div className=" mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                <h3 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-2xl xl:text-3xl dark:text-white">
                  Examples
                </h3>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Sentence
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {examplesData.map((data: any, index: any) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {data.course_title}
                          </th>
                          <td className="px-6 py-4">{data.sentence}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className=" mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                <h3 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-2xl xl:text-3xl dark:text-white">
                  Dictionnary
                </h3>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Session
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Words
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wordsData?.map((data: any, index: any) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {data.session_name}
                          </th>
                          <td className="px-6 py-4">{data.word}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Notepad;
