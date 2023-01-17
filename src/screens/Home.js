import Button from "@mui/material/Button";
import React, { useState,useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3333/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status==='ok') {
          // console.log(data.decoded.email);
          setEmail(data.users[0].email);
          setFname(data.users[0].fname);
        }else{
          alert("Authen Failed");
          localStorage.removeItem("token");
          window.location = "/login";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = "/login";
  };

  const handleProfile = (event) => {
    event.preventDefault();
    window.location = "/profile";
  };

  return (
    <div className="Home">
      <h1>Welcome, {email+' '+fname}</h1>
      <Button variant="contained" onClick={handleProfile}>Profile</Button>
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
    </div>
  );
}
