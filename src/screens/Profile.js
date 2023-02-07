import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const theme = createTheme();

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function Profile() {
  if (localStorage.getItem("token")) {
    if (window.location.pathname === "/login") {
      window.location = "/profile";
    }
  } else {
    window.location = "/login";
  }
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    // const response = await axios.get("http://localhost:3333/profile", {
    await axios.get("http://localhost:3333/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setUsername(data.users[0].username);
          setProfile(data.users[0].urs_profile_img);
        } else if (data.status === "error") {
          toast.error(data.message, toastOptions);
        } else {
          toast.error("ไม่พบผู้ใช้งาน", toastOptions);
        }
      });
  };

  const handleSubmit = (event) => {};

  return (
    <>
      {/* <img src={profile} alt="Profile"/> */}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={profile} alt="Profile" />
            <h4>{username}</h4>
            <p>ผู้ติดตาม {0} คน</p>
            <p>คะแนน {0} คะแนน</p>
            <p>เสร็จงานแล้ว {0} งาน</p>
            <Button variant="contained" href="/editprofile" sx={{ mb: 2 }}>
              จัดการบัญชี
            </Button>
            <Button variant="contained" href="" fullWidth>
              เพิ่มผลงานหรือคอมมิชชัน
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
