import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../../components/Navbar";
import PieChart from '../../components/Dashboard/PieChart';
import LineChart from '../../components/Dashboard/LineChart';
import { styled } from 'styled-components';
import { width } from '@mui/system';

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
      .get("http://localhost:3333/admin", {
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
        if (error.response && error.response.status === 401 && error.response.data === "Token has expired") {
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
      .get("http://localhost:3333/alladmin", {
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
      .get("http://localhost:3333/alluser", {
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
      <NavbarAdmin />
      <div className="container test">
      <h3>Welcome,{admindata.admin_name}</h3>
      <h1>Dashboard</h1>
      <div style={{display: "flex"}}>
        <Link>
          <div style={{padding:30, borderRadius:10, backgroundColor: "blue", color: "white", marginRight: 10}}>
            <p>test</p>
            <p>จำนวนรีพอร์ตทั้งหมด</p>
          </div>
        </Link>
        <Link>
          <div style={{padding:30, borderRadius:10, backgroundColor: "green", color: "white", marginRight: 10}}>
            <p>test</p>
            <p>จำนวนรีพอร์ตทั้งหมด</p>
          </div>
        </Link>
        <Link to="/admin/alluser"  >
          <div style={{padding:30, borderRadius:10, backgroundColor: "yellow", color: "white", marginRight: 10}}>
            <p>{user.length} คน</p>
            <p>จำนวนผู้ใช้งานทั้งหมด</p>
          </div>
        </Link>
        <Link to="/admin/alladmin" >
          <div style={{padding:30, borderRadius:10, backgroundColor: "red", color: "white", marginRight: 10}}>
            <p>{admins.length} คน</p>
            <p>จำนวนแอดมินทั้งหมด</p>
          </div>
        </Link>
      </div>

        <div style={{display: 'flex', marginTop:20}}>
          <LineChart />
          <PieChart />
        </div>

      </div>
    </>
  );
}
