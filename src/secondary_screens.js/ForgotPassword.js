import React, { useState } from "react";
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

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3333/forgot-password", { email })
        .then((response) => {
          const data = response.data;
          if (data.status === "ok") {
            alert('ส่งข้อมูลสำเร็จ')
            const queryParams = new URLSearchParams({ email });
            // window.location = `/verify-resetPassword?${queryParams.toString()}`;
            navigate(`/verify-resetPassword?${queryParams.toString()}`);
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset password</button>
      </form>
      <ToastContainer />
    </>
  );
}
