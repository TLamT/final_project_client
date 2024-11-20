"use client";

import { useState } from "react";

function SignUp({ setLogin }) {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [comment, setComment] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
      setEmailError(
        "Invalid email format. Please use a correct email address."
      );
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
    if (
      !validateUsername(user.username) ||
      !validateEmail(user.email) ||
      !validatePassword(user.password)
    ) {
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
    <div className="flex flex-col items-center m-5">
      <div className="text-3xl m-2">Register</div>
      <input
        className="border-2 border-black rounded-lg p-1 m-1"
        placeholder="Please enter username"
        onChange={(ev) => {
          const username = ev.target.value;
          // Only update the username if it follows the regex
          if (validateUsername(username)) {
            setUser((prev) => ({ ...prev, username }));
          }
        }}
      />
      {usernameError && <div className="text-red-500">{usernameError}</div>}
      <input
        className="border-2 border-black rounded-lg p-1 m-1"
        placeholder="Please enter email"
        onChange={(ev) => {
          const email = ev.target.value;
          // Only update the email if it follows the regex
          if (validateEmail(email)) {
            setUser((prev) => ({ ...prev, email }));
          }
        }}
      />
      {emailError && <div className="text-red-500">{emailError}</div>}
      <input
        className="border-2 border-black rounded-lg p-1 m-1"
        placeholder="Please enter password"
        type="password"
        onChange={(ev) => {
          const password = ev.target.value;
          setUser((prev) => ({ ...prev, password }));
          validatePassword(password);
        }}
      />
      {passwordError && <div className="text-red-500">{passwordError}</div>}
      <div className="flex flex-row m-3 items-center">
        <button
          className={`border-2 cursor-pointer m-1 p-1 rounded-lg ${
            usernameError || emailError || passwordError
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500"
          }`}
          disabled={usernameError || emailError || passwordError}
          onClick={signUp}
        >
          Submit
        </button>
        <div
          className="border-2 cursor-pointer m-1 p-1 rounded-lg"
          onClick={() => setLogin(true)}
        >
          To Login
        </div>
      </div>
      {comment && <div className="text-red-500">{comment}</div>}
    </div>
  );
}

export default SignUp;
