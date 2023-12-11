import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'; 
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
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1)); // วันแรกของปีปัจจุบัน
  const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), 11, 31)); // วันสุดท้ายของปีปัจจุบัน
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

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleDateChange = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(`${host}/getdata`, {
      params: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
    });

    const data = response.data.results;
    const datetime = data.map((item) => item.date);
    const artistsData = data.map((item) => item.artist_count);
    const usersData = data.map((item) => item.customer_count);
    const signup_count = data.map((item) => item.signup_count);

    // คำนวณเดือนและปีจากข้อมูลที่ได้
    const newData = datetime.map((date, index) => {
      const [year, month] = date.split('-');
      return {
        date: `${month}-${year}`,
        artist_count: artistsData[index],
        customer_count: usersData[index],
        signup_count: signup_count[index],
      };
    });

    setLineChartData({
      labels: newData.map((item) => item.date),
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
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        <label>ช่วง: </label>
        <DatePicker selected={startDate} onChange={handleStartDateChange} />
        <label>ถึง: </label>
        <DatePicker selected={endDate} onChange={handleEndDateChange} />
        <button onClick={handleDateChange}>กรอง</button>
      </div>
      <Line options={options} data={lineChartData} />
    </div>
  );
};

export default LineChart;
