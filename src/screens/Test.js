import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
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
export default function EditProfile() {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({});
    const [editData, setEditData] = useState({
      username: "",
      bio: "",
    });
    const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await axios.get("http://localhost:3333/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.data.status === "ok") {
      setUserData(response.data.users[0]);
      setEditData(response.data.users[0]);
    } else {
      toast.error(response.data.message, toastOptions);
    }
  };

    const handleInputChange = (event) => {
      setEditData({ ...editData, [event.target.name]: event.target.value });
    };

    const updateProfile = async () => {
      try {
        const formData = new FormData();
        formData.append("username", editData.username);
        formData.append("bio", editData.bio);

        const response = await axios.put(
          "http://localhost:3333/updateprofile",
          formData,
          {
            headers: {
              "Content-type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status === "ok") {
          setUserData({ ...editData });
          setShowForm(false);
          toast.success("Profile updated successfully!", toastOptions);
          window.location.reload();
        } else {
          toast.error(response.data.message, toastOptions);
        }
      } catch (error) {
        toast.error("Could not update profile", toastOptions);
      }
    };
  return (
    <>
      <p>{userData.urs_name}</p>
      <p>{userData.urs_bio}</p>
      <p>{userData.urs_email}</p>
      <Button variant="primary" onClick={() => setShowForm(true)}>
        Edit Profile
      </Button>
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขโปรไฟล์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateProfile} id="myForm">
            <Form.Group>
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder={userData.urs_name}
                onChange={handleInputChange}
                value={editData.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>คำอธิบายตัวเอง</Form.Label>
              <Form.Control
                type="text"
                name="bio"
                placeholder={userData.urs_bio}
                onChange={handleInputChange}
                value={editData.bio}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={setShowForm(false)}>
            ปิด
          </Button> */}
          <Button variant="primary" type="submit" form="myForm">
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}
