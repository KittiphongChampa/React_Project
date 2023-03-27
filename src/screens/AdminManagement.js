
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "axios";
import "../css/indexx.css";
import "../css/allbutton.css";
import "../css/profileimg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import DefaultInput from "../components/DefaultInput";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import UserBox from "../components/UserBox";
import inputSetting from "../function/function";
import ProfileImg from "../components/ProfileImg";
// import Profile from './Profile';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const title = 'จัดการแอดมิน';
const bgImg = ""
const body = { backgroundColor: "#F4F1F9" }


export default function AdminManagement() {
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
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        const filtered = user.filter(
          (item) =>
            item.urs_name.toLowerCase().includes(query) 
            // || item.urs_email.toLowerCase().includes(query)
        );
        setFilteredUser(filtered);
    };

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {/* <Navbar /> */}
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
                    <div className="user-item-area">
                        {filteredUser.map((item, index) => (
                            <div key={index}>
                                <UserBox src={item.urs_profile_img} username={item.urs_name} userid={item.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}