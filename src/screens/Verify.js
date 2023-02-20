
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
import React, { useState,useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Verify() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/verify") {
        navigate("/")
      }
    }
  }, []);

  const [values, setValues] = useState({
    email: "",
    otp: ""
  })
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const toastOptions = {
    position : "bottom-right",
    autoClose : 1000,
    pauseOnHover : true,
    draggable : true,
    theme : "dark",
  }

  const handleValidation = () => {
    const { email } = values;
    if(email === ""){
      toast.error("email is required", toastOptions)
      return false;
    }
    return true;
  }
  const handleValidationOTP = () => {
    const { otp } = values;
    if(otp === ""){
      toast.error("otp is required", toastOptions)
      return false;
    }
    return true;
  }

  const handleSubmitotp = async(event) => {
    event.preventDefault();
    if(handleValidation()){
      const { email } = values;
      const jsondata = {
        email
      };
      await fetch("http://localhost:3333/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsondata),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          toast.success("Send OTP success", toastOptions)
        } else {
          toast.error("Send OTP Failed " + data.message, toastOptions)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(handleValidationOTP()){
      const { otp, email } = values;
      const jsondata = {
        otp,
        email
      };
      console.log(jsondata);
      fetch("http://localhost:3333/verify/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsondata),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          toast.success(data.message, toastOptions)
          localStorage.setItem("token", data.token); //ส่ง token ไว้ที่ตัวแปร token แล้วส่งไปหน้า /
          window.location = "/register";
        } else {
          toast.error(data.message, toastOptions)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  }

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
              สร้างบัญชี
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmitotp}
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={0}>
                <Grid item xs={8} sm={8}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={4} sm={4} >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1 }}
                  >
                    ส่งรหัส OTP
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
            >
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="otp"
                      label="OTP"
                      name="otp"
                      autoComplete="otp"
                      autoFocus
                      onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  >
                  ยืนยันรหัส
                </Button>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid sx={{ mt: 1 }}>
                  <Link href="/login" variant="body2">
                    เข้าสู่ระบบ
                  </Link>
                </Grid>
              </Grid>
            </Box>
            
          </Box>
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
