import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect, useRef } from "react";
import "../css/indexx.css";
import "../css/allbutton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import { Table, Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import SettingAside from "../components/SettingAside";

const title = "ประวัติการใช้เหรียญ";

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function SettingCoin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/setting-coin");
      }
    } else {
      navigate("/login");
    }
    getTransaction();
  }, []);
  const getTransaction = async () => {
    await axios
      .get("http://localhost:3333/transaction", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === "ok") {
          setData(data.results);
        } else {
          alert(data.message);
          // window.location = "/profile";
        }
      });
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = filter
    ? data.filter((item) => {
        const itemDate = new Date(item.created_at);
        const today = new Date();
        const diffTime = Math.abs(today - itemDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths =
          (today.getFullYear() - itemDate.getFullYear()) * 12 +
          (today.getMonth() - itemDate.getMonth());
        if (filter === "today") {
          return diffDays === 1;
        } else if (filter === "week") {
          return diffDays <= 7;
        } else if (filter === "month") {
          return diffMonths === 0;
        } else if (filter === "year") {
          return itemDate.getFullYear() === today.getFullYear();
        }
        return true;
      })
    : data;
  console.log(filteredData);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {/* <Navbar /> */}
      <NavbarUser/>
      <div className="setting-container">
        <SettingAside onActive="coin" />
        <div className="setting-content-box">
          <div className="settingCard">
            <div>
              <h2 className="setting-headding">
                ประวัติการเติมเหรียญและใช้เหรียญ
              </h2>
              <Tabs
                defaultActiveKey="buycoin"
                id="justify-tab"
                className="mb-4 mt-4"
                justify
              >
                <Tab eventKey="buycoin" title="ประวัติการเติมเหรียญ">
                  <p className="text-align-right">ตัวกรอง</p>
                  <select className="form-select" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="today">วันนี้</option>
                    <option value="week">สัปดาห์</option>
                    <option value="month">เดือน</option>
                    <option value="year">ปี</option>
                  </select>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>จำนวนเหรียญ</th>
                        <th>จำนวนเงิน</th>
                        <th>วัน/เดือน/ปี</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.coins}</td>
                          <td>{item.p_price}</td>
                          <td>
                            {new Date(item.created_at).toLocaleString("th-TH", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="usecoin" title="ประวัติการใช้เหรียญ">
                  
                </Tab>
                {/* <Tab eventKey="longer-tab" title="Loooonger Tab">
                                </Tab>
                                <Tab eventKey="contact" title="Contact" disabled>
                                </Tab> */}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
