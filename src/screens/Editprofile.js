import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

// import Editdata from '../components/Editdata';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function Editprofile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);
  const [name, setName ] = useState("");
  const [bio, setBio ] = useState("");
  const [bankname, setBankname ] = useState("");
  const [bankuser, setBankuser ] = useState("");
  const [banknum, setBanknum ] = useState("");
  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setFile(image);
    setPreviewUrl(URL.createObjectURL(image));
  };

  const [form_image, setForm_image] = useState(false);
  const Close_form_image = () => setForm_image(false);
  const editprofile_image = () => setForm_image(true);

  const [form_data, setForm_data] = useState(false);
  const Close_form_data = () => setForm_data(false);
  const editprofile_data = () => setForm_data(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handle_addbank = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handle_editbank = () => setShow2(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/profile");
      }
    } else {
      navigate("/login");
    }
    getUser();
  }, []);

  const getUser = async () => {
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
          setName(data.users[0].urs_name);
          setBio(data.users[0].urs_bio);
          setBankuser(data.users[0].urs_bank_name);
          setBankname(data.users[0].urs_bank_accname);
          setBanknum(data.users[0].urs_bank_number);
        } else if (data.status === "error") {
          toast.error(data.message, toastOptions);
        } else {
          toast.error("ไม่พบผู้ใช้งาน", toastOptions);
        }
      });
  };

  const profileupdate_img = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    await axios
      .put("http://localhost:3333/profile_img/update", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert("Update Success");
          // navigate("/editprofile");
          window.location = "/editprofile";
        } else {
          toast.error(data.message, toastOptions);
        }
      });
  };

  const profileupdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    await axios.patch("http://localhost:3333/profile/update", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert("Update Success");
          window.location = "/editprofile";
        } else {
          toast.error(data.message, toastOptions);
        }
      });
    Close_form_data();
  };

  const handleValidation = () => {
    // const {password, confirmpassword, username} = values;
    if (bankuser.length < 3) {
      toast.error("username should be greater than 4 characters", toastOptions);
      return false;
    } else if (bankname === "") {
      toast.error("บัญชีธนาคารห้ามว่าง", toastOptions);
      return false;
    } else if (banknum.length < 10) {
      toast.error("banknum should be greater at 10 characters", toastOptions);
      return false;
    }
    return true;
  };

  const addbank = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const formData = new FormData();
      formData.append("bankuser", bankuser);
      formData.append("bankname", bankname);
      formData.append("banknum", banknum);
      handleClose1();
      await axios
        .post("http://localhost:3333/bank/add", formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.status === "ok") {
            alert("Add Success");
            // navigate("/editprofile");
            window.location = "/editprofile";
          } else {
            toast.error(data.message, toastOptions);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const editbank = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const formData = new FormData();
      formData.append("bankuser", bankuser);
      formData.append("bankname", bankname);
      formData.append("banknum", banknum);
      handleClose2();
      await axios
        .patch("http://localhost:3333/bank/update", formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.status === "ok") {
            alert("Update Success");
            window.location = "/editprofile";
          } else {
            toast.error(data.message, toastOptions);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const UserDelete = async() => {
    const tested = "";
    await axios
      .put("http://localhost:3333/delete_account", tested,{
        headers: {
          Authorization: "Bearer " + token
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert(data.message);
          localStorage.removeItem("token");
          navigate("/welcome");
          window.location = "/welcome";
        } else if (data.status === "error") {
          toast.error(data.message, toastOptions);
        } else {
          toast.error("ไม่พบผู้ใช้งาน", toastOptions);
        }
      });
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
            <h1>โปรไฟล์</h1>
            <img src={userdata.urs_profile_img} alt="Profile" className="myimg"/>
            <Button
              variant="primary"
              onClick={editprofile_image}
              className="mb-3"
            >
              แก้ไขรูปโปรไฟล์
            </Button>

            <p>{userdata.urs_name}</p>
            <p>{userdata.urs_bio}</p>
            <p>{userdata.urs_email}</p>
            <Button
              variant="primary"
              onClick={editprofile_data}
              className="mb-3"
            >
              แก้ไขโปรไฟล์
            </Button>

            <h2>บัญชีธนาคาร</h2>
            <p>{userdata.urs_bank_name}</p>
            <p>{userdata.urs_bank_accname}</p>
            <p>{userdata.urs_bank_number}</p>
            {userdata.urs_bank_accname === "" &&
            userdata.urs_bank_accname === "" &&
            userdata.urs_bank_number === "" ? (
              <Button
                variant="primary"
                onClick={handle_addbank}
                className="mb-3"
              >
                เพิ่มบัญชีธนาคาร
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handle_editbank}
                className="mb-3"
              >
                แก้ไขบัญชีธนาคาร
              </Button>
            )}

            <Button variant="primary" onClick={UserDelete} className="mb-3">
              ลบบัญชีการใช้งาน
            </Button>
          </Box>
        </Container>
      </ThemeProvider>

      <Modal show={form_image} onHide={Close_form_image}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขรูปโปรไฟล์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={profileupdate_img} id="edit_img">
            <Form.Group className="mb-3">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>แก้ไขโปรไฟล์</Form.Label>
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
          <Button variant="secondary" onClick={Close_form_image}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" form="edit_img">
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={form_data} onHide={Close_form_data}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขโปรไฟล์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={profileupdate} id="myForm">
            <Form.Group className="mb-3">
              <Form.Label>อีเมล</Form.Label>
              <Form.Control
                type="text"
                placeholder={userdata.urs_email}
                aria-label="Disabled input example"
                disabled
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control
                type="text"
                placeholder={name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>คำอธิบายตัวเอง</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder={bio}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close_form_data}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" form="myForm">
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มบัญชีธนาคาร</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addbank} id="bankForm_add">
            <Form.Group className="mb-3">
              <Form.Label>ชื่อบัญชีธนาคาร</Form.Label>
              <Form.Control
                type="text"
                value={bankuser}
                onChange={(e) => setBankuser(e.target.value)}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>บัญชีธนาคาร</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={bankname}
                onChange={(e) => setBankname(e.target.value)}
              >
                <option>เลือกธนาคาร</option>
                <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
                <option value="ธนาคารไทยพานิช">ธนาคารไทยพานิช</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>เลขบัญชีธนาคาร</Form.Label>
              <Form.Control
                type="text"
                value={banknum}
                onChange={(e) => setBanknum(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" form="bankForm_add">
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขบัญชีธนาคาร</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editbank} id="bankForm_edit">
            <Form.Group className="mb-3">
              <Form.Label>ชื่อบัญชีธนาคาร</Form.Label>
              <Form.Control
                type="text"
                value={bankuser}
                placeholder={bankuser}
                onChange={(e) => setBankuser(e.target.value)}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>บัญชีธนาคาร</Form.Label>
              <Form.Select
                aria-label="Default select example"
                placeholder={bankname}
                value={bankname}
                onChange={(e) => setBankname(e.target.value)}
              >
                <option value={bankname}>{bankname}</option>
                <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
                <option value="ธนาคารไทยพานิช">ธนาคารไทยพานิช</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>เลขบัญชีธนาคาร</Form.Label>
              <Form.Control
                type="text"

                value={banknum}
                placeholder={banknum}
                onChange={(e) => setBanknum(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" form="bankForm_edit">
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
}
