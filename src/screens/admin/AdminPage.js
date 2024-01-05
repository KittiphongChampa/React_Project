import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  NavbarUser,
  NavbarAdmin,
  NavbarHomepage,
} from "../../components/Navbar";
import PieChart from "../../components/DashboardAdmin/PieChart";
import LineChart from "../../components/DashboardAdmin/LineChart";
import { styled } from "styled-components";
import { width } from "@mui/system";
import AdminMenuAside from "./AdminMenuAside";

const host = "http://188.166.218.38:3333";
// const host = "http://localhost:3333";

export default function AdminPage() {
  const navigate = useNavigate();
  const [admindata, setAdmindata] = useState([]);
  // const [admintoken, setAdmintoken] = useState();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/admin");
      }
    } else {
      navigate("/login");
    }
    getAdmin();
    getAdminData();
    getData();
  }, []);

  const token = localStorage.getItem("token");
  const [admins, setAdmins] = useState([]);
  const [user, setUser] = useState([]);

  const getAdmin = async () => {
    await axios
      .get(`${host}/admin`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setAdmindata(data.admins[0]);
          // setAdmintoken(data.admintoken);
        } else if (data.status === "no_access") {
          console.log("no_access");
          alert(data.message);
          navigate("/");
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Token has expired"
        ) {
          // Handle token expired error
          alert("Token has expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          // Handle other errors here
          console.error("Error:", error);
        }
      });
  };

  const getAdminData = async () => {
    await axios
      .get(`${host}/alladmin`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        setAdmins(data.admins);
      });
  };

  const getData = async () => {
    await axios
      .get(`${host}/alluser`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        setUser(data.users);
      });
  };


  return (
    <>
      <div className="body-con">
        <NavbarAdmin />

        <div className="chatbox-container">
          <div className="aside-chatbox">
            <AdminMenuAside onActive={null} />
          </div>
          <div className="aside-main-card" style={{ padding: "1.3rem 3rem" }}>
            <div className="container">
              {/* <h3>Welcome,{admindata.admin_name}</h3> */}
              <h1>Dashboard</h1>
              <div style={{ display: "flex" }}>
                <Link>
                  <div
                    style={{
                      padding: 30,
                      borderRadius: 20,
                      backgroundColor: "white",
                      color: "black",
                      marginRight: 10,
                      width: "250px",
                    }}
                  >
                    <p>41</p>
                    <p>ภาพที่รอตรวจความคล้าย</p>
                  </div>
                </Link>
                <Link to="/admin/adminmanage/report">
                  <div
                    style={{
                      padding: 30,
                      borderRadius: 20,
                      backgroundColor: "white",
                      color: "black",
                      marginRight: 10,
                      width: "250px",
                    }}
                  >
                    <p>20</p>
                    <p>จำนวนรีพอร์ตทั้งหมด</p>
                  </div>
                </Link>
                <Link to="/admin/adminmanage/alluser">
                  <div
                    style={{
                      padding: 30,
                      borderRadius: 20,
                      backgroundColor: "white",
                      color: "black",
                      marginRight: 10,
                      width: "250px",
                    }}
                  >
                    <p>{user.length} คน</p>
                    <p>จำนวนผู้ใช้งานทั้งหมด</p>
                  </div>
                </Link>
                <Link to="/admin/adminmanage/alladmin">
                  <div
                    style={{
                      padding: 30,
                      borderRadius: 20,
                      backgroundColor: "white",
                      color: "black",
                      marginRight: 10,
                      width: "250px",
                    }}
                  >
                    <p>{admins.length} คน</p>
                    <p>จำนวนแอดมินทั้งหมด</p>
                  </div>
                </Link>
              </div>

              {/* <div style={{ marginTop: "20px" }}>
                <label>ช่วง: </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <label>ถึง: </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
                <button onClick={handleDateChange}>กรอง</button>
              </div> */}

              <div style={{ display: "flex", marginTop: "15px" }}>
                <div
                  style={{
                    borderRadius: "20px",
                    border: "3px",
                    backgroundColor: "white",
                    // width: "650px",
                    flex: 5,
                    padding: "20px",
                  }}
                >
                  <h4>อัตราส่วนสมัครสมาชิกของผู้ว่าจ้างและนักวาด</h4>
                  <LineChart />
                </div>
                <div
                  style={{
                    borderRadius: "20px",
                    border: "3px",
                    backgroundColor: "white",
                    // width: "500px",
                    flex: 1,
                    marginLeft: "15px",
                    padding: "20px",
                  }}
                >
                  <h4>อัตราส่วนระหว่างผู้ว่าจ้างและนักวาด</h4>
                  <PieChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
