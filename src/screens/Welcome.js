import Button from "@mui/material/Button";
import React, { useEffect } from "react";

export default function Welcome() {
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
