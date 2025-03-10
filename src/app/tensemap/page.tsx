"use client";
import Link from "next/link";
import { useState } from "react";

const StudentDashboard = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  return (
    <div className="px-12 py-6 bg-gray-900 min-h-screen text-white relative flex flex-col items-center">
      <h2 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
        Tense Map
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
            <Link href="/tensemap/future">
              <button className="cursor-pointer bg-gray-700 w-[200px] text-center text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500">
                NO FUTURE
              </button>
            </Link>
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
              <Link href="/tensemap/conditionals">
                <button className="cursor-pointer bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                  WHEN / IF COND
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="w-full bg-gray-800 py-2">
            {" "}
            <h2 className="text-center text-xl font-bold text-white ">
              PRESENT
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 justify-center py-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/tense/present-simple"
                className="bg-gray-700 w-[200px] text-center text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500"
              >
                DO / S
              </Link>
              <Link href="/tensemap/mod">
                <button className="cursor-pointer bg-gray-700 w-[200px] text-center text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500">
                  MOD
                </button>
              </Link>

              <Link
                href="/tense/present-perfect"
                className="bg-gray-700 w-[200px] text-center text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500"
              >
                HAVE EN
              </Link>
              <Link href="/tense/present-continous">
                <button className="cursor-pointer bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                  BEING
                </button>
              </Link>
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
              <Link href="/tense/past-simple">
                <button className="cursor-pointer bg-gray-700 w-[200px] text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500">
                  DID (t-1)
                </button>
              </Link>
              <Link href="/tensemap/mod-ed">
                <button className="cursor-pointer bg-gray-700 w-[200px] text-center text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500">
                  MOD ED
                </button>
              </Link>
              <Link href="/tense/past-perfect">
                <button className="cursor-pointer bg-gray-700 w-[200px] text-center text-white text-xl font-semibold p-3 rounded-lg shadow border border-gray-500">
                  HAD EN (t-2 ⊂ t-1)
                </button>
              </Link>
              <Link href="/tense/past-continous">
                <button className="cursor-pointer bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                  WAS / WERE / ING
                </button>
              </Link>
            </div>
          </div>

          {/* Future */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
