import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import LineChart from "../components/DashboardArtist/LineChart";
import BarChart from "../components/DashboardArtist/BarChart";
import PieChart from "../components/DashboardArtist/PieChart";
import Scrollbars from 'react-scrollbars-custom';

export default function Dashboard() {
  return (
    <>
      <div className="artist-mn-container">
        <div className="headding">
          <h1>แดชบอร์ด</h1>
        </div>
        {/* <div class="watermarked" data-watermark="howbloggerz">
                    <img src="../boo.jpg" />
                </div> */}
        {/* <div className="image-container">
                    <img src="../boo.jpg" alt="Your Image" className="image" />
                </div> */}
        <div className="artist-mn-card">
          <Scrollbars>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  padding: 30,
                  borderRadius: 20,
                  backgroundColor: "blue",
                  color: "white",
                  marginRight: 10,
                  width: "250px",
                }}
              >
                <h3>50,124</h3>
                <p>รายได้</p>
              </div>

              <div
                style={{
                  padding: 30,
                  borderRadius: 20,
                  backgroundColor: "green",
                  color: "white",
                  marginRight: 10,
                  width: "250px",
                }}
              >
                <h3>50</h3>
                <p>ออเดอร์</p>
              </div>

              <div
                style={{
                  padding: 30,
                  borderRadius: 20,
                  backgroundColor: "yellow",
                  color: "white",
                  marginRight: 10,
                  width: "250px",
                }}
              >
                <h3>80</h3>
                <p>คอมมิชชัน</p>
              </div>

              <div
                style={{
                  padding: 30,
                  borderRadius: 20,
                  backgroundColor: "red",
                  color: "white",
                  marginRight: 10,
                  width: "250px",
                }}
              >
                <h3>124</h3>
                <p>ผู้ติดตาม</p>
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "15px" }}>
              <div
                style={{
                  borderRadius: "20px",
                  border: "3px",
                  backgroundColor: "white",
                  width: "850px",
                  padding: "20px",
                }}
              >
                <h4>รายได้</h4>
                <BarChart />
              </div>
              <div
                style={{
                  borderRadius: "20px",
                  border: "3px",
                  backgroundColor: "white",
                  width: "850px",
                  padding: "20px",
                }}
              >
                <h4>หัวข้อที่นิยม</h4>
                <PieChart />
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "15px" }}>
              <div
                style={{
                  borderRadius: "20px",
                  border: "3px",
                  backgroundColor: "white",
                  width: "850px",
                  padding: "20px",
                }}
              >
                <h4>จำนวนผู้ติดตาม</h4>
                <LineChart />
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    </>
  );
}
