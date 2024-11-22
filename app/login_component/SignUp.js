"use client";

import { useState, useRef, useEffect } from "react";

function SignUp({ setLogin }) {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [comment, setComment] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; // Adjust this value to set the speed (e.g., 0.5 is half speed)
    }
  }, []);

  function validateUsername(username) {
    // Regex for the username
    const regex = /^(?! )[a-zA-Z0-9\u4e00-\u9fa5 ]{1,12}$/;
    if (!regex.test(username)) {
      setUsernameError(
        "Username must be 1-12 characters long, cannot start with a space, and can include letters, numbers, spaces, and Chinese characters."
      );
      return false;
    }
    setUsernameError("");
    return true;
  }
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format. Please use a correct email address.");
      return false;
    }
    setEmailError("");
    return true;
  }
  function validatePassword(password) {
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  }
  async function signUp() {
    if (!validateUsername(user.username) || !validateEmail(user.email) || !validatePassword(user.password)) {
      setComment("Please correct the errors before submitting.");
      return;
    }
    const db = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user?.username,
        email: user?.email,
        password: user?.password,
      }),
    });
    const data = await db.json();
    if (data.comment) setComment(data.comment);
    if (data.acknowledged) setLogin(true);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <video
        className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
        ref={videoRef}
        autoPlay
        muted
        loop
      >
        <source src="/video/signUp.mp4" type="video/mp4" />
      </video>

      <div className=" shadow-lg rounded-lg p-6 max-w-full z-50 border-2 borderTest h-auto w-1/4">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <div className="space-y-4">
          {/* Username Input */}
          <div>
            <input
              className="w-full px-3 py-2 border border-white/20 rounded-md shadow-md focus:ring-2 bg-transparent transition duration-300"
              placeholder="Enter username"
              onChange={(ev) => {
                const username = ev.target.value;
                if (validateUsername(username)) {
                  setUser((prev) => ({ ...prev, username }));
                }
              }}
            />
            {usernameError && <p className="text-sm text-red-500 mt-1">{usernameError}</p>}
          </div>

          {/* Email Input */}
          <div>
            <input
              className="w-full px-3 py-2 border border-white/20 rounded-md shadow-md focus:ring-2 bg-transparent transition duration-300"
              placeholder="Enter email"
              onChange={(ev) => {
                const email = ev.target.value;
                if (validateEmail(email)) {
                  setUser((prev) => ({ ...prev, email }));
                }
              }}
            />
            {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
          </div>

          {/* Password Input */}
          <div>
            <input
              className="w-full px-3 py-2 border border-white/20 rounded-md shadow-md focus:ring-2 bg-transparent transition duration-300"
              type="password"
              placeholder="Enter password"
              onChange={(ev) => {
                const password = ev.target.value;
                setUser((prev) => ({ ...prev, password }));
                validatePassword(password);
              }}
            />
            {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-8">
          <button
            className={`flex-1 border-2 py-2 rounded-lg font-semibold  ${
              usernameError || emailError || passwordError
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-gray-200 transition duration-200"
            }`}
            disabled={usernameError || emailError || passwordError}
            onClick={signUp}
          >
            Submit
          </button>
          <button
            className="flex-1 border-2 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
            onClick={() => setLogin(true)}
          >
            Back to Login
          </button>
        </div>

        {/* Comment/Error Message */}
        {comment && <p className="text-center text-red-500 mt-4">{comment}</p>}
      </div>
    </div>
  );
}

export default SignUp;
