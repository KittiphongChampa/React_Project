import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../css/indexx.css";
import "../../css/allbutton.css";
import "../../css/profileimg.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import DefaultInput from "../../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../../components/Navbar";
// import UserBox from "../components/UserBox";
import inputSetting from "../../function/function";
import ProfileImg from "../../components/ProfileImg";
// import Profile from './Profile';
// import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as alertData from "../../alertdata/alertData";
import { AdminBox, UserBox } from "../../components/UserBox";
import { Typography,Button,Input } from 'antd';

const title = "จัดการผู้ใช้งาน";
const bgImg = "";
const body = { backgroundColor: "#F4F1F9" };

export default function AdminManageUser() {
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState("");
  const [banReason, setBanReason] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/admin/alluser");
      }
    } else {
      navigate("/login");
    }
    getData();
  }, []);

  useEffect(() => {
    // update filtered user when user state changes
    setFilteredUser(user);
  }, [user]);

  const getData = async () => {
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
      {/* <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavbarAdmin />
            <div class="body-lesspadding container-fluid" style={body}>
                
                <div class="white-page container">
                    <h1 className="text-align-center">การจัดการผู้ใช้งาน</h1>
                    <h5>ผู้ใช้งานทั้งหมด {user.length}</h5>
                    <input
                        className="search-box"
                        type="search"
                        placeholder="search"
                        onChange={handleSearch}
                    />
                    <h2>รายชื่อผู้ใช้</h2>
                    <table className="table is-striped is-fullwidth">
                      <thead>
                        <tr>
                          <th>#ID</th>
                          <th>ชื่อผู้ใช้</th>
                          <th>อีเมล</th>
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
                            <td>
                              <Link to={`/profile/${item.id}`} variant="primary">
                                ดูโปรไฟล์
                              </Link>
                              <Button
                                // onClick={() => deleteUser(item.id)}
                                onClick={() => handleClick(item)}
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
            <Modal show={popup} onHide={Close}>
              <Modal.Header>
                <Modal.Title>เหตุผลการแบน</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  <Form.Control
                    as="textarea" rows={3}
                    placeholder="เหตุผลการแบน..."
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                  />
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={Close}>
                  ปิด
                </Button>
                <Button
                  variant="danger"
                  onClick={deleteUser}
                >
                  แบนไอดี
                </Button>
              </Modal.Footer>
            </Modal> */}

      {/* <div className="body-con"> */}
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {/* <NavbarAdmin /> */}
      {/* <div class="body-lesspadding container-fluid" style={body}>
          <div class="white-page container"> */}
      <h1 className="">การจัดการผู้ใช้งาน</h1>
      <div className="all-user-head">
        <h2>รายชื่อผู้ใช้ ({user.length})</h2>
        <div>

        <Input type="search" onChange={handleSearch} placeholder=" ค้นหา..." />
          {/* <input type="search"
            placeholder="search"
            onChange={handleSearch} style={{ borderRadius: "200px", border: "1px solid gray" }}></input> */}
        </div>
      </div>
      <div className="user-item-area">



        {filteredUser.map((item, index) => (
          <div key={index}>
            <UserBox
              src={item.urs_profile_img}
              username={item.urs_name}
              userid={item.id}
              email={item.urs_email}
            />
          </div>
        ))}
      </div>
      {/* </div>
        </div> */}

      {/* </div> */}
    </>
  );
}
