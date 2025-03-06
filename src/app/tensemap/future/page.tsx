"use client";
import Link from "next/link";
import { useState } from "react";

const StudentDashboard = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  return (
    <div className="px-12 py-6 bg-gray-900 min-h-screen text-white relative flex flex-col items-center">
      <h2 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
        No Future
      </h2>
      {/* Labels for Tenses on the Side */}

      <div className="mt-10 shadow-lg flex flex-col gap-8 w-full lg:max-w-[1200px] rounded-lg ">
        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="w-full bg-gray-800 py-2 ">
            {" "}
            <h2 className="text-center text-xl font-bold text-white ">
              FUTURE
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 justify-center py-4">
            <button className="bg-gray-700 w-[200px] text-center text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500">
              DISTANT FUTURE
            </button>
          </div>
        </div>

        {/* Conditional */}
        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="w-full bg-gray-800 py-2">
            {" "}
            <h2 className="text-center text-xl font-bold text-white ">
              CONDITIONAL
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 justify-center py-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                CONDITIONAL 1
              </button>
            </div>
          </div>
        </div>
        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="w-full bg-gray-800 py-2">
            {" "}
            <h2 className="text-center text-xl font-bold text-white ">PAST</h2>
          </div>

          <div className="flex flex-wrap gap-3 justify-center py-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href=""
                className="bg-gray-700 w-[200px] text-center text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500"
              >
                DO / S
              </Link>
              <button className="bg-gray-700 w-[200px] text-center text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500">
                BE ING
              </button>
              <Link
                href="/tense/present-perfect"
                className="bg-gray-700 w-[200px] text-center text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500"
              >
                WILL MOD
              </Link>
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                TO BE GOING TO
              </button>
            </div>
          </div>
        </div>
        {/* Tense Rows */}
        <div className=" shadow-lg  rounded-lg border border-gray-600">
          {/* Past */}
          <div className=" shadow-lg  rounded-lg border border-gray-600">
            <div className="w-full bg-gray-800 py-2">
              {" "}
              <h2 className="text-center text-xl font-bold text-white ">
                PAST
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 justify-center py-4">
              <button className="bg-gray-700 w-[200px] text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500">
                WOULD MOD ED
              </button>
            </div>
          </div>

          {/* Future */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
