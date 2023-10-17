import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Dropdown from 'react-dropdown';
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const host = "http://localhost:3333";

const LineChart = () => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const handleDateChange = () => {
  
  };

  
  useEffect(() => {
    getData();
  },[startDate, endDate, selectedYear]);

  const getData = async() => {
    await axios.get(`${host}/getdata`).then((response) => {
      const data = response.data.results;
      const datetime = data.map((item) => item.date);
      const artistsData = data.map((item) => item.artist_count);
      const usersData = data.map((item) => item.customer_count);
      const signup_count = data.map((item) => item.signup_count);

      // เช็คปีที่เลือก (ถ้ามี)
      // if (selectedYear) {
      //   data = data.filter((item) => item.date.endsWith(selectedYear));
      // }
      // const firstDate = datetime[0];
      // const lastDate = datetime[datetime.length - 1];
      // เติมข้อมูลเดือนที่ขาดหายไป
      const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
      const monthNames = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ];
      const newData = months.map((month) => {
        const index = datetime.findIndex((date) => date.startsWith(month));
        if (index !== -1) {
          return {
            date: monthNames[parseInt(month) - 1],
            artist_count: artistsData[index],
            customer_count: usersData[index],
            signup_count: signup_count[index],
          };
        } else {
          return {
            date: monthNames[parseInt(month) - 1],
            artist_count: 0,
            customer_count: 0,
            signup_count: 0,
          };
        }
      });

      setLineChartData({
        labels: monthNames,
        datasets: [
          {
            label: 'นักวาด',
            data: newData.map((item) => item.artist_count),
            fill: false,
            borderColor: 'red',
            backgroundColor: 'red',
            tension: 0.1,
          },
          {
            label: 'ผู้ใช้งานทั่วไป',
            data: newData.map((item) => item.customer_count),
            borderColor: 'blue',
            backgroundColor: 'blue',
            tension: 0.1,
          },
        ],
      });
      // setLineChartData({
      //   labels: datetime,
      //   datasets: [
      //     {
      //       label: 'นักวาด',
      //       data: artistsData,
      //       fill: false,
      //       borderColor: 'red',
      //       backgroundColor: 'red',
      //       tension: 0.1,
      //     },
      //     {
      //       label: 'ผู้ใช้งานทั่วไป',
      //       data: usersData,
      //       borderColor: 'blue',
      //       backgroundColor: 'blue',
      //       tension: 0.1,
      //     },
      //   ],
      // });
    })
  }
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'นักวาด',
        data: [],
        fill: false,
        borderColor: 'red',
        backgroundColor: 'red',
        tension: 0.1,
      },
      {
        label: 'ผู้ใช้งานทั่วไป',
        data: [],
        borderColor: 'blue',
        backgroundColor: 'blue',
        tension: 0.1,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div style={{width: 1000}}>
      <div>
        <label>ช่วง: </label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        <label>ถึง: </label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
        <button onClick={handleDateChange}>กรอง</button>
      </div>
      {/* <div>
        <label>เลือกปี: </label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">ทั้งหมด</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div> */}
      <Line options={options} data={lineChartData} />
    </div>
  )
}
export default LineChart;
