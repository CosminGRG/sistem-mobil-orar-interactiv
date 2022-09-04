import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { Context as UserContext } from "../../store/Context";

import { MdLogin } from "react-icons/md";

function LoginPage() {
  const { state, onSignin } = useContext(UserContext);
  const { message } = state;

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    onSignin({ email, password }, authCallback);
  }

  const authCallback = () => {
    const returnUrl = router.query.returnUrl || "/";
    router.push(returnUrl);
  };

  return (
    <div className="w-2/6 mx-auto mt-32">
      <div className="card bg-light">
        <form onSubmit={submitHandler}>
          <div className="card-header bg-gray-900 text-white text-uppercase">
            Login
          </div>
          <div className="card-body">
            <div className="w-4/6 mx-auto">
              <div className="form-group mb-2">
                <label className="form-label" htmlFor="groupname">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="example@test.com"
                  required
                ></input>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Parola
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    required
                  ></input>
                </div>
              </div>
              <button className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-1.5 px-2 border border-gray-600 hover:border-transparent rounded">
                <div className="flex items-center">
                  <MdLogin className="mr-1"></MdLogin>
                  <span>Login</span>
                </div>
              </button>
              <div className="text-red-600">{message}</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
