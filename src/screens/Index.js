import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Index() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState([]);
  const [urs_token, setUrs_token] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
    getUser();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("http://localhost:3333/index", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setUserdata(data.users[0]);
          setUrs_token(data.urs_token);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/welcome");
  };

  return (
    <div className="Index">
      <h1>
        Welcome,
        {userdata.id + " " + userdata.urs_email + " " + userdata.urs_name}
      </h1>
      <img src={userdata.urs_profile_img} style={{width: "50px", height: "50px", borderRadius:"50px"}}/>
      <h3>token : {urs_token}</h3>
      <Button variant="contained" onClick={() => navigate("/buytoken")}>
        Token
      </Button>
      <Button variant="contained" onClick={() => navigate("/transaction")}>
        Transaction History
      </Button>
      <Button variant="contained" onClick={() => navigate("/profile")}>
        Profile
      </Button>
      {userdata.urs_type === 3 && (
        <>
        <h1>Admin middleware</h1>
        <Button variant="contained" onClick={() => navigate("/packagetoken")}>
          Package Token
        </Button>
        <Button variant="contained" onClick={() => navigate("/alluser")}>
          AllUser
        </Button>
        </>
      )}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}