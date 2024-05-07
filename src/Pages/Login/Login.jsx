import React from "react";
import { useState } from "react";
import "./login.module.css";
export default function Login() {
  const [user, setUser] = useState({
    email: " ",
    password: " ",
  });
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              {/* <div className="login-image">
                                <img src="/images/login.png" alt="Log in your page" width="400" height="500" />
                            </div> */}
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Login in to your account
                </h2>
                <br />
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div >
                      <div className="flex items-center justify-between">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                        </div>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          required
                          autoComplete="off"
                          value={user.email}
                          onChange={handleInput}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          name="password"
                          id="password"
                          type="password"
                          placeholder="Password"
                          required
                          autoComplete="off"
                          value={user.password}
                          onChange={handleInput}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <br />
                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
