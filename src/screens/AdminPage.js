import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

export default function AdminPage() {
  const navigate = useNavigate();
  const [admindata, setAdmindata] = useState([]);
  const [admintoken, setAdmintoken] = useState();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/admin");
      }
    } else {
      navigate("/login");
    }
    getAdmin();
  }, []);

  const getAdmin = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("http://localhost:3333/admin", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
            setAdmindata(data.admins[0]);
            setAdmintoken(data.admintoken);
        } else if (data.status === "no_access") {
          console.log("no_access");
          alert(data.message);
          navigate("/");
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
    <>
      <h1>Welcome,{admindata.admin_name}</h1>
      <Button variant="contained" onClick={() => navigate("/editcoin")}>
        Edit Coins
      </Button>
      <Button variant="contained" onClick={() => navigate("/alluser")}>
        AllUser
      </Button>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
