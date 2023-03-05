import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
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
        } else if (data.status === "no_access") {
          alert(data.message);
          navigate("/");
        }
      });
  };

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
    const filtered = user.filter((item) =>
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
      <ToastContainer />
    </>
  );
}
