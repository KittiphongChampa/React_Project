import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function VerifyMail_ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  console.log(email);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");

  const verfiyOTP = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:3333/check_otp", { otp, email })
        .then((response) => {
          const data = response.data;
          if (data.status === "ok") {
            // console.log(data.users[0].id);
            setUserId(data.users[0].id)
            alert("รหัสถูกต้อง");
            const queryParams = new URLSearchParams({ email });
            navigate(`/reset-password?${queryParams.toString()}`)
            // window.location = `/verify-resetPassword?${queryParams.toString()}`;
          } else {
            toast.error(data.message, toastOptions);
          }
        });
    } catch (err) {
      console.error(err);
      alert("Failed to send email");
    }
  };

  return (
    <>
      {/* <h1>{email}</h1> */}
      <form onSubmit={verfiyOTP}>
        <label>OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify Account</button>
      </form>
      <ToastContainer />
    </>
  );
}
