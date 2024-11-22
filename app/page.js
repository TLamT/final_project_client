"use client";

import { useState, useEffect } from "react";
import Login from "./login_component/Login";
import HomePage from "./home_component/HomePage";
import Cookies from "universal-cookie";

export default function Page() {
  const [auth, setAuth] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    checkToken(token);
  }, []);
  const checkToken = async (token) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/checkToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const data = await res.json();
      cookies.set("email", data.email);
      if (data.email) setAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!auth && <Login setAuth={setAuth} />}
      {auth && <HomePage setAuth={setAuth} />}
    </>
  );
}
