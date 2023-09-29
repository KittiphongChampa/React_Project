import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'ตุลาคม', ยอดขาย: 65 },
//   { name: 'พฤศจิกายน', ยอดขาย: 59 },
//   { name: 'ธันวาคม', ยอดขาย: 80 },
//   { name: 'มกราคม', ยอดขาย: 81 },
//   { name: 'กุมภาพันธ์', ยอดขาย: 56 },
// ];

const BarChartComponent = () => {
  const host = "http://localhost:3333";
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  },[]);
  
  const transformData = (data) => {
    // แปลงข้อมูลที่ดึงมาจากเซิร์ฟเวอร์ให้อยู่ในรูปแบบที่ Recharts สามารถอ่านได้
    const transformedData = data.map((item) => ({
      month: item.month, // หรือตามชื่อของฟิลด์ที่มีข้อมูลเดือนในข้อมูลจริง
      signup_count: item.signup_count, // หรือตามชื่อของฟิลด์ที่มีข้อมูลจำนวนผู้สมัครในข้อมูลจริง
    }));
    return transformedData;
  };
  
  const getData = async () => {
    await axios.get(`${host}/getdata`).then((response) => {
      const res = response.data;
      const transformedData = transformData(res.results);
      setData(transformedData);
    });
  };
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="signup_count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
