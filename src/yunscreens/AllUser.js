import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function AllUser() {
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState("");
  const [coins, setCoins] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/alluser");
      }
    } else {
      navigate("/login");
    }
    getUser();
  }, []);

  useEffect(() => {
    // update filtered user when user state changes
    setFilteredUser(user);
  }, [user]);

  const getUser = async () => {
    await axios
      .get("http://localhost:3333/alluser", {
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setUser(data.users);
          setAdmin(data.results[0]);
        } else if (data.status === "no_access") {
          alert(data.message);
          navigate("/");
        }
      });
  };

  //โอนเหรียญ
  const [selectedItem, setSelectedItem] = useState({});
  const [popup, setpopup] = useState(false);
  const Close = () => setpopup(false);
  // const handleClick = () => setpopup(true);
  const handleClick = (item) => {
    setSelectedItem(item);
    setpopup(true);
  };

  const transferCoins = async(e) => {
    const adminId = admin.id;
    const userId = selectedItem.id;
    e.preventDefault();
    await axios
      .post("http://localhost:3333/alluser/transferCoins", {
        adminId,
        userId,
        coins,
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert(data.message);
          window.location = "/alluser";
        } else {
          alert(data.message);
          window.location = "/alluser";
        }
      });
    Close();
  }

  const deleteUser = async (id) => {
    await axios
      .put(`http://localhost:3333/alluser/delete/${id}`)
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert(data.message);
          window.location = "/alluser";
        } else {
          toast.error(data.message, toastOptions);
        }
      });
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = user.filter(
      (item) =>
        item.urs_name.toLowerCase().includes(query) ||
        item.urs_email.toLowerCase().includes(query)
    );
    setFilteredUser(filtered);
  };

  return (
    <>
      <div>
        <Card>
          <Card.Body>
            <Card.Title>ผู้ใช้งานทั้งหมด {user.length} คน</Card.Title>
          </Card.Body>
        </Card>
      </div>
      <input
        className="search-box"
        type="search"
        placeholder="search"
        onChange={handleSearch}
      />
      <Container>
        <div className="columns mt-5 is-centered">
          <div className="column is-half">
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>ชื่อผู้ใช้</th>
                  <th>อีเมล</th>
                  <th>เหรียญ</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUser.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                      <img
                        src={item.urs_profile_img}
                        alt="Profile"
                        className="img"
                      />
                      {item.urs_name}
                    </td>
                    <td>{item.urs_email}</td>
                    <td>{item.urs_token}</td>
                    <td>
                      <Link to={`/profile/${item.id}`} variant="primary">
                        ดูโปรไฟล์
                      </Link>
                      <Button
                        onClick={() => handleClick(item)}
                        // onClick={handleClick}
                        variant="success"
                      >
                        โอนเหรียญ
                      </Button>
                      <Button
                        onClick={() => deleteUser(item.id)}
                        variant="danger"
                      >
                        แบน
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>

      <Modal show={popup} onHide={Close}>
        <Modal.Header closeButton>
          <Modal.Title>transferCoins</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>จาก : {admin.urs_name}</h5>
          <h5>ไป : {selectedItem.urs_name}</h5>
          <Form onSubmit={transferCoins} id="myForm">
            <Form.Label>จำนวนเหรียญ</Form.Label>
            <Form.Control
              type="number"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
            ปิด
          </Button>
          <Button
            variant="success"
            type="submit"
            form="myForm"
          >
            โอน
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
}
