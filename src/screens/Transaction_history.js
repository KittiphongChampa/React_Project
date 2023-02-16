import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position : "bottom-right",
  autoClose : 1000,
  pauseOnHover : true,
  draggable : true,
  theme : "dark",
}

export default function Transaction_history() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   if (window.location.pathname === "/login") {
    //     navigate("/");
    //   }
    // } else {
    //   navigate("/login");
    // }
    getTransaction();
  }, []);
  const getTransaction = async () => {
    await axios
      .get("http://localhost:3333/transaction", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === "ok") {
          setData(data.results);
        } else {
          
        }
      });
  };

  return (
    <>
    <div>
      <h1>Transaction</h1>
      {data.map((item, index) => (
        <div key={index}>
          <p>{item.createdat}</p>
          <p>เติมเงิน</p>
          <p>{item.p_price}</p>
        </div>
      ))}
    </div>
    <ToastContainer />
    </>
  );
}
