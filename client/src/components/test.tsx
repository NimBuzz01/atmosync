"use client";
import React, { useEffect, useState } from "react";

function Test() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return <div>{message}</div>;
}

export default Test;
