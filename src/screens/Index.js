import Button from "@mui/material/Button";
import React, { useState,useEffect } from "react";

export default function Index() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3333/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status==='ok') {
          setEmail(data.users[0].email);
          setUsername(data.users[0].username);
        }else{
          localStorage.removeItem("token");
          window.location = "/welcome";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = "/welcome";
  };

  const handleProfile = (event) => {
    event.preventDefault();
    window.location = "/profile";
  };

  return (
    
    <div className="Index">
      <h1>Welcome, {email+' '+username}</h1>
      <Button variant="contained" onClick={handleProfile}>Profile</Button>
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
    </div>
  );
}
