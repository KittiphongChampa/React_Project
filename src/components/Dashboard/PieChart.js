import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const host = "http://localhost:3333";

export const options = {
    responsive: true,
    // plugins: {
    //   legend: {
    //     position: 'top',
    //   },
    //   title: {
    //     display: true,
    //     text: 'จำนวนนักวาดต่อผู้ใช้งานทั่วไป',
    //   },
    // },
};

  


const PieChart = () => {
    const [artist, setArtist] = useState([]);
    const [customer, setCustomer] = useState([]);
    useEffect(() => {
      getData();
    },[]);

    const getData = async () => {
        await axios.get(`${host}/getdataPieChart`).then((response) => {
            const data = response.data;
            setArtist(data.results[0]);
            setCustomer(data.results[1]);
        })
    }
    const pieChartData = {
        labels: ['นักวาด', 'ผู้ใช้งานทั่วไป'],
        datasets: [
            {
            data: [artist.count, customer.count],
            backgroundColor: ['red', 'blue'],
            borderColor: ['red','blue'],
            },
        ],
    };
    return (
      <div style={{width: 450}}>
        <Pie options={options} data={pieChartData} />
      </div>
    );
};
  
export default PieChart;