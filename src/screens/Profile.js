import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
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

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

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
  const token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);
  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setFile(image);
    setPreviewUrl(URL.createObjectURL(image));
  };

  const [form_cover_add, setForm_cover_add] = useState(false);
  const Close_form_cover_add = () => setForm_cover_add(false);
  const addcover_image = () => setForm_cover_add(true);

  const [form_cover_edit, setForm_cover_edit] = useState(false);
  const Close_form_cover_edit = () => setForm_cover_edit(false);
  const editcover_image = () => setForm_cover_edit(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    // const response = await axios.get("http://localhost:3333/profile", {
    await axios
      .get("http://localhost:3333/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setUserdata(data.users[0]);
        } else if (data.status === "error") {
          toast.error(data.message, toastOptions);
        } else {
          toast.error("ไม่พบผู้ใช้งาน", toastOptions);
        }
      });
  };

  const coveradd_img = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    await axios
      .put("http://localhost:3333/addcover_img", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert("Update Success");
          window.location = "/profile";
        } else {
          toast.error(data.message, toastOptions);
        }
      });
  };

  const coverupdate_img = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    await axios
      .put("http://localhost:3333/updatecover_img", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert("Update Success");
          window.location = "/profile";
        } else {
          toast.error(data.message, toastOptions);
        }
      });
  };

  return (
    <>
      <img src={userdata.usr_cover_img} alt="cover" className="mystyle" />
      {userdata.usr_cover_img === "" ? (
        <Button variant="primary" onClick={addcover_image} className="mb-3">
          เพิ่มรูปปก
        </Button>
      ) : (
        <Button variant="primary" onClick={editcover_image} className="mb-3">
          แก้ไขรูปปก
        </Button>
      )}
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
            <img
              src={userdata.urs_profile_img}
              alt="Profile"
              className="myimg"
            />
            <h4>{userdata.username}</h4>
            <p>ผู้ติดตาม {0} คน</p>
            <p>คะแนน {0} คะแนน</p>
            <p>เสร็จงานแล้ว {0} งาน</p>
            <Button variant="primary" href="/editprofile" className="mb-3" >
              จัดการบัญชี
            </Button>
            <Button variant="primary" href="" fullWidth>
              เพิ่มผลงานหรือคอมมิชชัน
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
      <ToastContainer />

      <Modal show={form_cover_add} onHide={Close_form_cover_add}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มรูปปก</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={coveradd_img} id="add_img">
            <Form.Group className="mb-3">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>เพิ่มปก</Form.Label>
                <div>
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      width={250}
                      height={250}
                    />
                  )}
                </div>
                <Form.Control
                  type="file"
                  className="file-input"
                  onChange={handleFileChange}
                  accept="image/png ,image/jpeg"
                />
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close_form_cover_add}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" form="add_img">
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={form_cover_edit} onHide={Close_form_cover_edit}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขรูปปก</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={coverupdate_img} id="edit_img">
            <Form.Group className="mb-3">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>แก้ไขปก</Form.Label>
                <div>
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      width={250}
                      height={250}
                    />
                  )}
                </div>
                <Form.Control
                  type="file"
                  className="file-input"
                  onChange={handleFileChange}
                  accept="image/png ,image/jpeg"
                />
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close_form_cover_edit}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" form="edit_img">
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
