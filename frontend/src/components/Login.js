import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../auth";

function Login() {
  const auth = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const { usernameField, passwordField } = form;

    const username = usernameField.value;
    const password = passwordField.value;

    auth.login(username, password);
  };

  if (auth.user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="p-2 min-w-3/4">
        <div className="border-b-2 border-blue-500 text-2xl font-thin pb-1 mb-4">
          Log in
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col mb-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              name="usernameField"
              id="username"
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="passwordField"
              id="password"
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button className="px-2 rounded-md border-2 border-blue-200 mr-4 bg-blue-200 hover:bg-blue-500 hover:border-blue-500 hover:text-white font-semibold">
            Log in
          </button>
        </form>
        <div className="flex mt-4 text-sm text-gray-500">
          <div className="hover:underline hover:cursor-pointer">
            Forgot password?
          </div>
        </div>
        <div className="flex text-sm text-gray-500">
          <div className="hover:underline hover:cursor-pointer">
            Don't have an account? Sign up!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
