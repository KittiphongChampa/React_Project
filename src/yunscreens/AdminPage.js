import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";

export default function AdminPage() {
  const navigate = useNavigate();
  const [admindata, setAdmindata] = useState([]);
  const [admintoken, setAdmintoken] = useState();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/admin");
      }
    } else {
      navigate("/login");
    }
    getAdmin();
  }, []);

  const getAdmin = async () => {
    const token = localStorage.getItem("token");
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
            setAdmintoken(data.admintoken);
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
        console.error("Error:", error);
      });
  };
  
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/welcome");
  };
  return (
    <>
      <NavbarAdmin />
      <div className="container test">
      <h1>Dashboard</h1>
      <h3>Welcome,{admindata.admin_name}</h3>
      <Button variant="contained" onClick={() => navigate("/buycoin")}>
        เติมเงิน
      </Button>
      <Button variant="contained" onClick={() => navigate("/admin/transaction")}>
        ดูประวัติการเติมเงิน
      </Button>
      <Button variant="contained" onClick={() => navigate("/editcoin")}>
        จัดการแพ็คเกจการเติมเงิน
      </Button>
      <Button variant="contained" onClick={() => navigate("/admin/alluser")}>
        จัดการบัญชีผู้ใช้งาน
      </Button>
      <Button variant="contained" onClick={() => navigate("#")}>
        จัดการแอดมิน
      </Button>

      {/* <Button variant="contained" onClick={() => navigate("/alluser")}>
        AllUser
      </Button> */}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
      </div>
    </>
  );
}
