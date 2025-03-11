"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Users = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://syntaxmap-back-p4ve.onrender.com/user")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.users);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const updateUser = (userId: any, updatedUser: any) => {
    console.log(updatedUser, "Humor");
    setIsLoading(true);
    fetch(`http://localhost:8000/user/update/${userId}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("jstoken") || "",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        fetch("https://syntaxmap-back-p4ve.onrender.com/user")
          .then((res) => res.json())
          .then((res) => {
            setUsers(res.users);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const deleteUser = (userId: any) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("jstoken") || "",
      },
    })
      .then((res) => {
        res.json();
      })
      .then((res) => {
        fetch("https://syntaxmap-back-p4ve.onrender.com/user")
          .then((res) => res.json())
          .then((res) => {
            setUsers(res.users);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    userId: any,
    field: string
  ) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.user_id === userId) {
          return { ...user, [field]: e.target.value };
        }
        console.log(user);
        return user;
      });
    });
  };

  const createUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const userData = {
      user_email_address: formData.get("email") as string,
      user_role: formData.get("role") as string,
      user_password: formData.get("password") as string,
    };

    fetch("http://localhost:8000/user/add", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("jstoken") || "",
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetch("https://syntaxmap-back-p4ve.onrender.com/user")
          .then((res) => res.json())
          .then((res) => {
            setUsers(res.users);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
        setIsUserModalOpen(false); // Close the modal
      })
      .catch((err) => console.log(err));
  };

  if (isLoading)
    return (
      <div className="dark:bg-gray-900 h-screen w-screen z-[100] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="overflow-y-scroll min-h-screen bg-gray-900">
      {/* Modal */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          !isUserModalOpen && "hidden"
        } fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New User
            </h3>
            <button
              onClick={() => setIsUserModalOpen(false)}
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
          <form className="p-4 md:p-5" onSubmit={createUser}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type user email"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Role
                </label>
                <select
                  name="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={0}>Admin</option>
                  <option value={3}>Student</option>
                </select>
              </div>
              <div className="col-span-2 mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="********"
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
              Add new User
            </button>
          </form>
        </div>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 h-screen flex pt-10">
        <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
          <h2 className="mt-12 max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
            Users
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
                  onClick={() => setIsUserModalOpen(true)}
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
                  Add User
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
                    Email Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((course: any, index: any) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {course?.user_id}
                      </th>
                      <td className="px-6 py-2">
                        {course?.user_email_address}
                      </td>
                      <td className="px-6 py-2">
                        <select
                          value={course?.user_role}
                          onChange={(e) =>
                            handleChange(e, course?.user_id, "user_role")
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value={0}>Admin</option>
                          <option value={3}>Student</option>
                        </select>
                      </td>
                      <td className="px-6 py-2">
                        <button
                          onClick={() => deleteUser(course?.user_id)}
                          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => updateUser(course?.user_id, course)}
                          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Save
                        </button>
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

export default Users;
