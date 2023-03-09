import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../css/indexx.css";
import "../css/allbutton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
// import Navbar from "../components/Navbar";
import BgBody from "../components/BgBody";

const title = 'เข้าสู่ระบบ';
const bgImg = "url('mainmoon.jpg')"
const body = { backgroundImage: bgImg }

export default function SignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/");
      }
    }
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  console.log(values);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = values;
    const jsondata = {
      email,
      password
    };
    if (email === "") {
      alert("Email is required");
    }
    if (password === "") {
      alert("password is required");
    }
    fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsondata),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem("token", data.token); //ส่ง token ไว้ที่ตัวแปร token แล้วส่งไปหน้า /
          navigate("/");
        } else if (data.status === "hasDelete") {
          alert("User has Delete");
        } else {
          alert("Login Failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="body" style={body}>
        {/* <Navbar /> */}
        <div className="container">
          <div className="login-clearpage">
            <div className="">
              <img className="login-img" src="ภาพตัด.png" alt="" />
            </div>
            <div className="login-col-text">
              <div className="input-login-box">
                <h1>เข้าสู่ระบบ </h1>
                <form onSubmit={handleSubmit}>
                  <DefaultInput 
                    headding="อีเมล" 
                    type="email" 
                    id="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
                  <DefaultInput 
                    headding="รหัสผ่าน"
                    type="password" 
                    name="password"
                    id="password"
                    onChange={(e) => handleChange(e)}
                  />

                  <div className="text-align-right">
                    <a href="/forgot-password">ลืมรหัสผ่าน</a>
                  </div>
                  <div className="text-align-center">
                    <button className="lightblue-btn" type="submit">
                      เข้าสู่ระบบ
                    </button>
                  </div>
                </form>
                <div className="text-align-center">
                  <a href="/verify">สมัครสมาชิก</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <ThemeProvider theme={theme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         เข้าสู่ระบบ
    //       </Typography>
    //       <Box
    //         component="form"
    //         onSubmit={handleSubmit}
    //         noValidate
    //         sx={{ mt: 1 }}
    //       >
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="email"
    //           label="Email Address"
    //           name="email"
    //           autoComplete="email"
    //           autoFocus
    //         />
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           id="password"
    //           autoComplete="current-password"
    //         />
    //         <FormControlLabel
    //           control={<Checkbox value="remember" color="primary" />}
    //           label="Remember me"
    //         />
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           Sign In
    //         </Button>
    //         <Grid container>
    //           <Grid item xs>
    //             <Link href="/forgot-password" variant="body2">
    //               ลืมรหัสผ่าน?
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             <Link href="/verify" variant="body2">
    //               {"ยังไม่มีบัญชี? สมัครสมาชิก"}
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //   </Container>
    // </ThemeProvider>
  );
}
