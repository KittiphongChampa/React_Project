import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f2f2f2'
    },
    title: {
      fontSize: 36,
      marginBottom: 20
    },
    body:{
      display: 'block'
    }
  };
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/welcome") {
        navigate("/")
      }
    }
  }, []);
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome</h1>
      <div style={styles.body}>
        <Button variant="contained" href="/login">Login</Button>
        <Button variant="contained" href="/verify">Register</Button>
      </div>
    </div>
  );

}
