import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../css/indexx.css";
import "../css/allbutton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
// import Navbar from "../components/Navbar";
import BgBody from "../components/BgBody";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as alertData from "../alertdata/alertData";
import {
  NavbarUser,
  NavbarAdmin,
  NavbarHomepage,
  NavbarGuest,
} from "../components/Navbar";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

const host = "http://localhost:3333";
const title = "เข้าสู่ระบบ";
const bgImg = "url('mainmoon.jpg')";
const body = { backgroundImage: bgImg };

export default function SignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/");
      }
    }
  }, []);

  const onFinish = (values) => {

    console.log("Success:", values.email, values.password);
    axios .post(`${host}/login`,{
      email: values.email,
      password: values.password
    }).then((response)=>{
      const data = response.data;
      if (data.status === "ok_admin") {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else if (data.status === "ok") {
        localStorage.setItem("token", data.token); //ส่ง token ไว้ที่ตัวแปร token แล้วส่งไปหน้า /
        navigate("/");
      } else if (data.status === "hasDelete") {
        alert(data.message);
      } else {
        Swal.fire({ ...alertData.LoginError }).then(() => {
          // window.location.reload(false);
        });
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="body-con">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavbarGuest />
      <div className="body" style={body}>
        <div className="container">
          <div className="login-soloCard">
            <div className="login-col-img">
              <img className="login-img" src="ภาพตัด.png" alt="" />
            </div>
            <div className="login-col-text">
              <div className="input-login-box">
                <h1>เข้าสู่ระบบ </h1>
                <Form
                  layout="vertical"
                  name="login"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="อีเมล"
                    name="email"
                    id="email"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกอีเมล",
                      },
                      { type: "email" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="รหัสผ่าน"
                    name="password"
                    id="password"
                    className="to"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกรหัสผ่าน",
                      },
                      { type: "password" },
                    ]}
                  >
                    <Input.Password style={{ borderRadius: "1rem", padding:"0.5rem 1rem"}}/>
                  </Form.Item>

                  {/* <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  ></Form.Item> */}
                  <div className="text-align-right">
                    <a href="/forgot-password">ลืมรหัสผ่าน</a>
                  </div>
                  <div className="login-btn-group">
                    {/* <button className="login-btn" type="submit">
                      เข้าสู่ระบบ
                    </button> */}
                    <Button htmlType="submit" type="primary" shape="round" size="large">เข้าสู่ระบบ</Button>
                    <a href="/verify">สมัครสมาชิก</a>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
