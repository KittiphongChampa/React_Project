import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function Editdata() {
  const token = localStorage.getItem("token");
  const [userId, setUserID] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editedData, setEditedData] = useState({
    usernames: "",
    bios: "",
    bankuser: "",
    banknum: "",
  });
  //   console.log(editedData);
  const handleInputChange = (event) => {
    setEditedData({ ...editedData, [event.target.name]: event.target.value });
  };
  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setFile(image);
    setPreviewUrl(URL.createObjectURL(image));
  };

  const profileupdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append("file", file);
    formData.append("username", editedData.usernames);
    formData.append("bio", editedData.bios);
    // console.log(formData);
    handleClose();
    await axios
      .post("http://localhost:3333/updateprofile", formData, {
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

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        แก้ไขโปรไฟล์
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขโปรไฟล์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={profileupdate} id="myForm">
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
                  accept="image/png ,image/gif ,image/jpeg"
                />
              </Form.Group>

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
      <ToastContainer />
    </>
  )
}
