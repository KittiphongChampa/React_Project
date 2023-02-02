import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState,useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/verify") {
        window.location = "/register";
      }
    } else {
      window.location = "/verify";
    }
  }, []);


  const [values, setValues] = useState({
    username: "", 
    password: "",
    confirmpassword: "",
  })

  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setFile(image);
    setPreviewUrl(URL.createObjectURL(image));
  };

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
    const {password, confirmpassword, username} = values;
    if(password !== confirmpassword){
      toast.error("password and confirm password should be same", toastOptions)
      return false;
    }else if(username.length<3){
      toast.error("username should be greater than 4 characters", toastOptions)
      return false;
    }else if(password.length<8){
      toast.error("password should be greater than 8 characters", toastOptions)
      return false;
    }
    return true;
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(handleValidation()){
      const formData = new FormData();
      formData.append("file", file);
      formData.append('username', values.username);
      formData.append('password', values.password);
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3333/register", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        body: formData
      })
      .then(response => {
        const data = response.data;
        if (data.status === "ok") {
          localStorage.setItem("token", data.token);
          window.location = "/";
        } else if(data.status === "error") {
          toast.error(data.message, toastOptions)
        }else {
          toast.error("Register Failed", toastOptions);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            สร้างบัญชี
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12} container pacing={0} direction="column" alignItems="center" justifyContent="center">
                <input type="file" className="file-input" onChange={handleFileChange} accept="image/png ,image/gif ,image/jpeg"/>
                {previewUrl && <img src={previewUrl} alt="Preview" width={250} height={250}/>}
              </Grid>
    
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="confirmpassword"
                  label="Confirm-Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="condirm-password"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ยืนยันการสร้างบัญชี
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  มีไอดีแล้ว? เข้าสู่ระบบ
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