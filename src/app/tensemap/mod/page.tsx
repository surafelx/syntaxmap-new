"use client";
import Link from "next/link";
import { useState } from "react";

const StudentDashboard = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  return (
    <div className="px-12 py-6 bg-gray-900 min-h-screen text-white relative flex flex-col items-center">
      <h2 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
        MOD
      </h2>
      {/* Labels for Tenses on the Side */}
      <div className="w-full lg:max-w-[1200px] flex">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Highest Probability
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Verb
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white text-center "
              >
                Destiny
              </th>
              <td className="px-6 py-4 text-center">To Be To</td>
              <td className="px-6 py-4 text-center "></td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white text-center "
              >
                Obligation
              </th>
              <td className="px-6 py-4 text-center">Must</td>
              <td className="px-6 py-4 text-center ">Deduuction / Assertion</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white text-center "
              >
                Prediction / Obligation
              </th>
              <td className="px-6 py-4 text-center">Shall</td>
              <td className="px-6 py-4 text-center ">Neutral Proposal</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white text-center "
              >
                Personal Advice
              </th>
              <td className="px-6 py-4 text-center">Should</td>
              <td className="px-6 py-4 text-center ">Opinion</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white text-center "
              >
                Willingness / Immediate Decision / Conditionaal 1
              </th>
              <td className="px-6 py-4 text-center">Will</td>
              <td className="px-6 py-4 text-center ">
                Prediction / Strong Characterization
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white text-center "
              >
                Desire / Conditionaal 2
              </th>
              <td className="px-6 py-4 text-center">Would</td>
              <td className="px-6 py-4 text-center ">
                Very Strong Characterization
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white text-center "
              >
                Knowledge / Ability / Permissiion
              </th>
              <td className="px-6 py-4 text-center">Can</td>
              <td className="px-6 py-4 text-center ">
                Possibility / Impossibility
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white text-center "
              ></th>
              <td className="px-6 py-4 text-center">Could</td>
              <td className="px-6 py-4 text-center ">Probability</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white text-center "
              >
                Permission
              </th>
              <td className="px-6 py-4 text-center">May</td>
              <td className="px-6 py-4 text-center ">Probability</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white text-center "
              ></th>
              <td className="px-6 py-4 text-center">Might</td>
              <td className="px-6 py-4 text-center ">Low Probability</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
