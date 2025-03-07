"use client";
import Link from "next/link";
import { useState } from "react";

const StudentDashboard = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  return (
    <div className="px-12 py-6 bg-gray-900 min-h-screen text-white relative flex flex-col items-center">
      <h2 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
        Conditionals
      </h2>
      {/* Labels for Tenses on the Side */}

      <div className="mt-10 shadow-lg flex flex-col gap-8 w-full lg:max-w-[1200px] rounded-lg ">
        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="flex flex-wrap gap-8 justify-center py-4">
            <Link href="/tense/must past">
              <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
                Must t-1
              </button>
            </Link>

            <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
              Was were supposed to
            </button>
            <button className="bg-gray-700 w-[200px] text-center  text-xl font-bold p-3 rounded-lg shadow border border-gray-500">
              Had to (t-1/t-n)
            </button>
            <p></p>
            <p>Had to (t-1/t-n)</p>
          </div>
        </div>

        {/* Conditional */}
        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="flex flex-wrap gap-3 justify-center py-4">
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <div>
                <p>As Soon as</p>
                <p>While</p>
                <p>The moment</p>
                <p>Before</p>
                <p>After</p>
              </div>
              <p>S Have En</p>
              <div className="flex gap-10">
                <div>
                  <p>Present</p>
                  <p>must</p>
                  <p>will</p>
                  <p>can</p>
                  <p>may</p>
                </div>
                <div>
                  <p>Future t+1</p>
                  <p>have to</p>
                  <p>be able to </p>
                </div>
                <div>
                  <p>Conditional 2</p>
                  <p>could</p>
                  <p>might</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" shadow-lg  rounded-lg border border-gray-600">
          <div className="w-full bg-gray-800 py-2">
            {" "}
            <h2 className="text-center text-xl font-bold text-white ">
              CONDITIONAL 2 t* : IMAGINAARY CONDITION
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 justify-center py-4">
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <p>IF</p>
              <p>COND ED</p>
              <div className="flex gap-10">
                <div>
                  <p>Would</p>
                  <p>Could</p>
                  <p>Might</p>
                </div>
                <div>
                  <p>Have to </p>
                  <p>Be able to </p>
                </div>
                <div>
                  <p>Conditional 2</p>
                  <p>could</p>
                  <p>might</p>
                </div>
              </div>
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
                CONDITIONAL 3 t*(t-1) : IMAGINAARY CONDITION IN t-1
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 justify-center items-center">
              <p>IF</p>
              <p>COND ED + HAVE EN = HAD EN</p>
              <div className="flex gap-10 items-center">
                <div>
                  <p>Would</p>
                  <p>Could</p>
                  <p>Might</p>
                </div>

                <p>Have + EN</p>
              </div>
            </div>
          </div>

          {/* Future */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
