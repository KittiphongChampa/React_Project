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

// import Editdata from '../components/Editdata';
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

export default function Editprofile() {
  if (localStorage.getItem("token")) {
    if (window.location.pathname === "/login") {
      window.location = "/profile";
    }
  } else {
    window.location = "/login";
  }
  const token = localStorage.getItem("token");
  const [userId, setUserID] = useState("");
  const [username, setUsername] = useState();
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");

  const [bankname, setBankname] = useState("");
  const [bankuser, setBankuser] = useState("");
  const [banknum, setBanknum] = useState("");

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

  const handleInputChange = (event) => {
    setEditedData({ ...editedData, [event.target.name]: event.target.value });
  };
  const [editedData, setEditedData] = useState({
    usernames: "",
    bios: "",
    bankname: "",
    bankuser: "",
    banknum: "",
  });
  console.log(editedData);

  useEffect(() => {
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
          setUserID(data.users[0].id);
          setUsername(data.users[0].username);
          setBio(data.users[0].urs_bio);
          setEmail(data.users[0].email);
          setProfile(data.users[0].urs_profile_img);
          setBankname(data.users[0].urs_bank_accname);
          setBankuser(data.users[0].urs_bank_name);
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
      .put("http://localhost:3333/updateprofile_img", formData, {
        headers: {
          "Content-type": "multipart/form-data",
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
  };

  const profileupdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", editedData.usernames);
    formData.append("bio", editedData.bios);
    handleClose();
    await axios
      .put("http://localhost:3333/updateprofile", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        body: formData,
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
  };

  const addbank = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("bankuser", editedData.bankuser);
    formData.append("bankname", editedData.bankname);
    formData.append("banknum", editedData.banknum);
    handleClose();
    await axios
      .post("http://localhost:3333/addbank", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert("Add Success");
          window.location = "/editprofile";
        } else {
          toast.error(data.message, toastOptions);
        }
      });
  };

  const editbank = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("bankuser", editedData.bankuser);
    formData.append("bankname", editedData.bankname);
    formData.append("banknum", editedData.banknum);
    handleClose();
    await axios
      .put("http://localhost:3333/addbank", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert("Add Success");
          window.location = "/editprofile";
        } else {
          toast.error(data.message, toastOptions);
        }
      });
  };

  const UserDelete = async () => {
    axios
      .delete("http://localhost:3333/delete_account", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert(data.message);
          localStorage.removeItem("token");
          window.location = "/welcome";
        } else if (data.status === "error") {
          toast.error(data.message, toastOptions);
        } else {
          toast.error("ไม่พบผู้ใช้งาน", toastOptions);
        }
      });
  };

  const [mode, setMode] = useState("เพิ่มบัญชีธนาคาร");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = () => {
    setMode(mode === "เพิ่มบัญชีธนาคาร" ? "แก้ไขข้อมูลบัญชี" : "เพิ่มบัญชีธนาคาร");
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
            <img src={profile} alt="Profile" />
            <Button
              variant="primary"
              onClick={editprofile_image}
              className="mb-3"
            >
              แก้ไขรูปโปรไฟล์
            </Button>
            <p>{username}</p>
            <p>{bio}</p>
            <p>{email}</p>
            <Button
              variant="primary"
              onClick={editprofile_data}
              className="mb-3"
            >
              แก้ไขโปรไฟล์
            </Button>
            {/* <Editdata /> */}

            <h2>บัญชีธนาคาร</h2>
            <p>{bankuser}</p>
            <p>{bankname}</p>
            <p>{banknum}</p>

            {bankuser.length === 0 ? (
              <Button variant="primary" onClick={handleShow} className="mb-3">
                เพิ่มบัญชีธนาคาร
              </Button>
            ) : (
              <Button variant="primary" onClick={handleShow} className="mb-3">
                แก้ไขข้อมูลบัญชี
              </Button>
            )}

            {/* <Button variant="primary" onClick={handle_addbank} className="mb-3">
              เพิ่มบัญชีธนาคาร
            </Button>

            <Button variant="primary" onClick={handle_editbank} className="mb-3">
              แก้ไขชีธนาคาร
            </Button> */}

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
                placeholder={email}
                aria-label="Disabled input example"
                disabled
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control
                type="text"
                name="usernames"
                placeholder={username}
                defaultValue={username}
                onChange={(e) => handleInputChange(e)}
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
                name="bios"
                placeholder={bio}
                defaultValue={bio}
                onChange={(e) => handleInputChange(e)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" form="myForm">
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "เพิ่มบัญชีธนาคาร" ? "เพิ่มบัญชีธนาคาร" : "แก้ไขข้อมูลบัญชี"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mode === "เพิ่มบัญชีธนาคาร" && (
            <form>
              <Form onSubmit={addbank} id="bankForm_add">
                <Form.Group className="mb-3">
                  <Form.Label>ชื่อบัญชีธนาคาร</Form.Label>
                  <Form.Control
                    type="text"
                    name="bankuser"
                    onChange={(e) => handleInputChange(e)}
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>บัญชีธนาคาร</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="bankname"
                    onChange={(e) => handleInputChange(e)}
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
                    name="banknum"
                    onChange={(e) => handleInputChange(e)}
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </form>
          )}
          {mode === "แก้ไขข้อมูลบัญชี" && (
            <form>
              <Form onSubmit={editbank} id="bankForm_edit">
                <Form.Group className="mb-3">
                  <Form.Label>ชื่อบัญชีธนาคาร</Form.Label>
                  <Form.Control
                    type="text"
                    name="bankuser"
                    placeholder={bankuser}
                    defaultValue={bankuser}
                    onChange={(e) => handleInputChange(e)}
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>บัญชีธนาคาร</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="bankname"
                    defaultValue={bankname}
                  >
                    <option defaultValue={bankname}>{bankname}</option>
                    <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                    <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
                    <option value="ธนาคารไทยพานิช">ธนาคารไทยพานิช</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>เลขบัญชีธนาคาร</Form.Label>
                  <Form.Control
                    type="text"
                    name="banknum"
                    placeholder={banknum}
                    defaultValue={banknum}
                    onChange={(e) => handleInputChange(e)}
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
        {mode === "เพิ่มบัญชีธนาคาร" && (
          <Button variant="primary" type="submit" form="bankForm_add">
            บันทึก
          </Button>
        )}{mode === "แก้ไขข้อมูลบัญชี" && (
          <Button variant="primary" type="submit" form="bankForm_edit">
            บันทึก
          </Button>
        )}
        </Modal.Footer>
      </Modal>

      {/* <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มบัญชีธนาคาร</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addbank} id="bankForm">
            <Form.Group className="mb-3">
              <Form.Label>ชื่อบัญชีธนาคาร</Form.Label>
              <Form.Control
                type="text"
                name="bankuser"
                onChange={(e) => handleInputChange(e)}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>บัญชีธนาคาร</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="bankname"
                onChange={(e) => handleInputChange(e)}
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
                name="banknum"
                onChange={(e) => handleInputChange(e)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" form="bankForm">
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขบัญชีธนาคาร</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editbank} id="bankForm_edit">
            <Form.Group className="mb-3">
              <Form.Label>ชื่อบัญชีธนาคาร</Form.Label>
              <Form.Control
                type="text"
                name="bankuser"
                placeholder={bankuser}
                defaultValue={bankuser}
                // onChange={(e) => handleInputChange(e)}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>บัญชีธนาคาร</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="bankname"
                defaultValue={bankname}
              >
                <option defaultValue={bankname}>{bankname}</option>
                <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
                <option value="ธนาคารไทยพานิช">ธนาคารไทยพานิช</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>เลขบัญชีธนาคาร</Form.Label>
              <Form.Control
                type="text"
                name="banknum"
                placeholder={banknum}
                defaultValue={banknum}
                // onChange={(e) => handleInputChange(e)}
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
      </Modal> */}

      <ToastContainer />
    </>
  );
}
