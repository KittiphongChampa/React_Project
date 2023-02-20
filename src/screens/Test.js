import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
export default function Test() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);
  // console.log(userdata);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await axios.get("http://localhost:3333/test", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    if (response.data.status === "ok") {
      setUserdata(response.data.result[0]);
      toast.success(response.data.message, toastOptions);
    }
    if (response.data.status === "no_access") {
      toast.error(response.data.message, toastOptions);
      navigate("/");
    }else if (response.data.status === "error") {
      toast.error(response.data.message, toastOptions);
      localStorage.removeItem("token");
      navigate("/welcome");
    } else {
      localStorage.removeItem("token");
      navigate("/welcome");
    }
  };

  return (
    <>
      <h1>Hello World</h1>
      <ToastContainer />
    </>
  );
}
