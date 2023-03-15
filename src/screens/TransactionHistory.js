import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";

const toastOptions = {
  position : "bottom-right",
  autoClose : 1000,
  pauseOnHover : true,
  draggable : true,
  theme : "dark",
}

export default function TransactionHistory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/transaction")
      }
    } else {
      navigate("/login")
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
          window.location="/profile";
        }
      });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = filter ? data.filter((item) => {
    const itemDate = new Date(item.created_at);
    const today = new Date();
    const diffTime = Math.abs(today - itemDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const diffMonths = (today.getFullYear() - itemDate.getFullYear()) * 12 + (today.getMonth() - itemDate.getMonth());
    if (filter === "today") {
      return diffDays === 0;
    } else if (filter === "week") {
      return diffDays <= 7;
    }else if (filter === "month"){
      return diffMonths === 0;
    }else if (filter === "year") {
      return itemDate.getFullYear() === today.getFullYear();
    }
    return true;
  }) : data;
  console.log(filteredData);

  return (
    <>
    <Container>
        <div className="columns mt-5 is-centered">
          <div className="column is-half">
            <div className="mb-3">
                <label className="form-label">Filter:</label>
                <select className="form-select" onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>#ลำดับ</th>
                  <th>วัน/เวลา</th>
                  <th>บริการ</th>
                  <th>เหรียญ</th>
                  <th>บาท</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{new Date(item.created_at).toLocaleString("th-TH", {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</td>
                    <td>เติมเงิน</td>
                    <td>{item.coins}</td>
                    <td>{item.p_price}</td>
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
