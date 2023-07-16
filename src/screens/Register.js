import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import loading from "../loading.json";
import "../css/indexx.css";
import "../css/allbutton.css";

//import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
// import Navbar from "../components/Navbar";
import ProfileImg from "../components/ProfileImg.js";
// import ImportScript from "../components/ImportScript";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as alertData from "../alertdata/alertData";

const title = "สร้างบัญชี";

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  // console.log(email);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const [pdpaAccept, setPdpaAccept] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });
  console.log(values);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setPdpaAccept(checked);
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  // console.log(file);

  //หยุน
  // const handleFileChange = (event) => {
  //   const image = event.target.files[0];
  //   setFile(image);
  //   setPreviewUrl(URL.createObjectURL(image));
  // };

  //มิ้นท์
  const addProfileImg = () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreviewUrl(URL.createObjectURL(image));
    }
    input.accept="image/png ,image/gif ,image/jpeg";
    input.click();
  }

  const handleValidation = () => {
    const { password, confirmpassword, username } = values;
    if (password !== confirmpassword) {
      toast.error("password and confirm password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("username should be greater than 4 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("password should be greater than 8 characters", toastOptions);
      return false;
    } else if (pdpaAccept != true) {
      toast.error("ไม่สามารถสมัครสมาชิกได้เนื่องจากไม่ได้ยอมรับเงื่อนไขการใช้บริการ", toastOptions);
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("file", file);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("pdpaAccept", pdpaAccept);
      const token = localStorage.getItem("token");
      await axios
        .post("http://localhost:3333/register", formData, {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.status === "ok") {
            localStorage.setItem("token", data.token);
            // navigate("/");
            Swal.fire({ ...alertData.registerSuccess }).then(
              navigate("/")
            )
          } else if (data.status === "error") {
            toast.error(data.message, toastOptions);
          } else {
            toast.error("Register Failed", toastOptions);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div
        className="body"
        style={{
          backgroundImage: "url('mainmoon.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <Navbar /> */}
        <div className="container">
          <div className="createaccount-soloCard">
            <div className="createaccount-col-text">
              <h1 className="text-center">{title} </h1>

              <ProfileImg src={previewUrl} onPress={addProfileImg}/>

              <p className="text-center">รูปโปรไฟล์</p>

              <form onSubmit={handleSubmit}>
                <DefaultInput 
                  headding="อีเมล" 
                  type="email" 
                  id="email"
                  name="email"
                  defaultValue={email}
                  disabled={true}
                />
                <DefaultInput 
                  headding="ชื่อที่แสดง" 
                  type="text" 
                  id="username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
                <DefaultInput 
                  headding="รหัสผ่าน" 
                  type="password" 
                  id="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                <DefaultInput 
                  headding="ยืนยันรหัสผ่าน" 
                  type="password" 
                  id="confirmpassword"
                  name="confirmpassword"
                  onChange={(e) => handleChange(e)}
                />
                <div class="form-check">
                  <input  class="form-check-input"
                    type="checkbox"
                    name="pdpaAccept"
                    value={pdpaAccept}
                    id="flexCheckDefault"
                    onChange={handleChange}/>
                  <label class="form-check-label" for="flexCheckDefault">
                    ยอมรับเงื่อนไขการใช้บริการ
                  </label>
                </div>
                <div className="text-align-center">
                  <button className="gradiant-btn" type="submit">
                    ยืนยันการสร้างบัญชี
                  </button>
                  {/* <button className="lightblue-btn" onClick={() => navigate("/login")}>
                    ยกเลิก
                  </button> */}
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>

      {/* <ThemeProvider theme={theme}>
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
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Lottie animationData={loading} loop={true} />
            </div>
          ) : (
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
          )}

        </Box>
      </Container>
    </ThemeProvider> */}
      <ToastContainer />
    </>
  );
}
