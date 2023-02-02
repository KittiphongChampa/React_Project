import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function Profile() {
  const [username, setUername] = useState("");
  const [img, setImg] = useState("");
  // const [userdata, setUserdata] = useState([]);

  if (localStorage.getItem("token")) {
    if (window.location.pathname === "/login") {
      window.location = "/profile";
    }
  } else {
    window.location = "/login";
  }

  useEffect(() => {
    getUser();
  }, []);
  const userid = "66";
  const getUser = async () => {
    const response = await axios.get("http://localhost:3333/profile/"+userid);
    // setUserdata(response.data);
    const test = response.data;
    // const data = test.users;
    setUername(test.users[0].username);
    setImg(test.users[0].profile);
  };

  return (
    <>
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
          <Typography component="h1" variant="h5">
            โปรไฟล์
          </Typography>

          <h1>{username}</h1>
          <img src={img} alt="Profile"/>
            {/* {image.map((user) => ( */}
              {/* <img src={user[0].profile} alt="Profile"/> */}
            {/* ))} */}
            {/* {userdata.map((user) => (
                console.log(user)
                <img src="user.profile" alt="Profile"/>
                <h1>{user.username}</h1>
            ))} */}
        </Box>
      </Container>
    </ThemeProvider>
    <ToastContainer />
    </>
  );
}
