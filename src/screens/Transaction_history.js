import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Transaction_history() {
  const navigate = useNavigate();
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       if (window.location.pathname === "/login") {
//         navigate("/");
//       }
//     } else {
//       navigate("/login");
//     }
//     // getUser();
//   }, []);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
