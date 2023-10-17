import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LineChart = () => {
  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  // สร้างข้อมูลแบบ fake สำหรับกราฟ
  const generateFakeData = () => {
    const data = {
      labels: monthNames,
      datasets: [
        {
          label: 'จำนวนผู้ติดตาม',
          data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 20)), // สร้างข้อมูลสุ่ม
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'blue',
          tension: 0.1,
        }
      ],
    };
    return data;
  };

  const [lineChartData, setLineChartData] = useState(generateFakeData());

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
      <Line options={options} data={lineChartData} />
    </div>
  );
};

export default LineChart;
