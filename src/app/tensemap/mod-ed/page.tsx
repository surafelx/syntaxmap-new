"use client";
import Link from "next/link";
import { useState } from "react";

const StudentDashboard = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  return (
    <div className="px-12 py-6 bg-gray-900 min-h-screen text-white relative flex flex-col items-center">
      <h2 className="mt-12 max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
        Conditionals
      </h2>
      {/* Labels for Tenses on the Side */}

      <div className="mt-10 shadow-lg flex flex-col gap-8 w-full lg:max-w-[1200px] rounded-lg ">
        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="flex flex-wrap gap-8 justify-center py-4 items-center">
            <Link href="/tense/must past">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                Must t-1
                <p className="text-sm">point of view of the object</p>
              </button>
            </Link>
            <Link href="">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                Was were supposed to
                <p className="text-sm">
                  not saaying if the action was carried out
                </p>
              </button>
            </Link>
            <Link href="">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                Had to (t-1/t-n)
                <p className="text-sm">necesarily did occur</p>
              </button>
            </Link>
          </div>
        </div>

        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="flex flex-wrap gap-8 justify-center py-4 items-center">
            <Link href="/tense/would past">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                Would t-n
                <p className="text-sm">
                  strong relation between subject and verb
                </p>
              </button>
            </Link>
            <Link href="/tense/would future in past">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                Would t+1
                <p className="text-sm">Future in the past link FUT MAP</p>
              </button>
            </Link>
            <Link href="">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                Used to (t-n)
              </button>
            </Link>
            <Link href="">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                ED
              </button>
            </Link>
          </div>
        </div>

        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="flex flex-wrap gap-8 justify-center py-4 items-center">
            <Link href="/tense/should past">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                Should
                <p className="text-sm">Advice</p>
              </button>
            </Link>
          </div>
        </div>

        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="flex flex-wrap gap-8 justify-center py-4 items-center">
            <Link href="/tense/could past">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                Could t-1/t-n
                <p className="text-sm">
                 not necesarily occurred, general capacity
                </p>
              </button>
            </Link>
            <Link href="/tense/would future in past">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
              Was, were able to (t-1)
                <p className="text-sm">necessarily did occur</p>
              </button>
            </Link>
          </div>
        </div>
        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="flex flex-wrap gap-8 justify-center py-4 items-center">
            <Link href="/tense/might past">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                Might
                <p className="text-sm">
                future in the past (Possibility)
                </p>
              </button>
            </Link>
            <Link href="/tense/would future in past">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
             Was, were allowed to 
                <p className="text-sm">Permission</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
