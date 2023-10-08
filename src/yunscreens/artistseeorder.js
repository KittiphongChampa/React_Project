import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";


const host = "http://localhost:3333";

export default function Artistseeorder() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [userdata, setUserdata] = useState([]);
    const [data, setData] = useState([]);
    console.log(data);
    useEffect(() => {
        getUser();
        getData()
    }, []);
    const getUser = async () => {
        await axios
        .get(`${host}/index`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            },
        })
        .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
            setUserdata(data.users[0]);
            } else if (data.status === "no_access") {
            alert(data.message);
            navigate("/admin");
            } else {
            localStorage.removeItem("token");
            navigate("/login");
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 401 && error.response.data === "Token has expired") {
            // Handle token expired error
            alert("Token has expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
            } else {
            // Handle other errors here
            console.error("Error:", error);
            }
        });
    };
    const getData = () => {
        axios .get(`${host}/allOrder`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            const data = response.data;
            if(response.data = 200){
                setData(data.results)
            }else{
                console.log('error');
            }
        })
    }
  return (
    <>
    <table className="table is-striped is-fullwidth">
        <thead>
            <tr>
                <th>ลำดับ</th>
                <th>ชื่อคอมมิชชัน</th>
                <th>แพ็คเกจ</th>
                <th>ชื่อผู้ใช้</th>
                <th>วันที่ส่งคำขอจ้าง</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.cms_name}</td>
                    <td>{item.pkg_name}</td>
                    <td>{item.urs_name}</td>
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
        
                    <td>
                        <button >รับออเดอร์</button>
                        <button >ปฏิเสธ</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}
