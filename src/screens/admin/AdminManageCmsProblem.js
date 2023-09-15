import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../../components/Navbar";
import { width } from '@mui/system';
import { styled } from 'styled-components';
import { Height } from "@mui/icons-material";

export default function AdminManageCmsProblem() {
    const navigate = useNavigate();
    const cmsID = useParams();
    const [admindata, setAdmindata] = useState([]);
    const [admintoken, setAdmintoken] = useState();
    const [cmsData, setCmsdata] = useState([]);
    const [problemImage, setProblemImage] = useState([]);
    // console.log(problemImage);
    console.log("cmsData : ",cmsData);

    const baseUrl = "http://localhost:3333/images_cms/";

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (window.location.pathname === "/login") {
              navigate("/admin");
            }
        } else {
            navigate("/login");
        }
        getAdmin();
        getData();
    }, []);

    const token = localStorage.getItem("token");
    const getAdmin = async () => {
        await axios
          .get("http://localhost:3333/admin", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
                setAdmindata(data.admins[0]);
                setAdmintoken(data.admintoken);
            } else if (data.status === "no_access") {
              console.log("no_access");
              alert(data.message);
              navigate("/");
            } else {
              localStorage.removeItem("token");
              navigate("/login");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    };
    const getData = async () => {
        await axios
        .get(`http://localhost:3333/commission/problem/${cmsID.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.status === "ok") {
              setCmsdata(data.results);
              setProblemImage(data.results[0]);
          } else {
              console.log("error");
          }
        })
    }

    const approve = async(cmsID) => {
      await axios
      .patch(`http://localhost:3333/commission/problem/approve/${cmsID}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        // if (data.status === "ok") {
        //     setCmsdata(data.results);
        //     setProblemImage(data.results[0]);
        // } else {
        //     console.log("error");
        // }
      })
    }

    const not_approve = async(cmsID) => {
      await axios
      .patch(`http://localhost:3333/commission/problem/notapprove/${cmsID}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        // if (data.status === "ok") {
        //     setCmsdata(data.results);
        //     setProblemImage(data.results[0]);
        // } else {
        //     console.log("error");
        // }
      })
    }


  return (
    <>
    <div style={{display: "flex"}}>
      <div>
        <h3>ภาพที่เป็นปัญหา</h3>
        {cmsData.map((item, index) => {
          // ตรวจสอบว่า image_similar ไม่ใช่ null
          if (item.image_similar !== null) {
            return (
              <div key={index}>
                <img src={item.ex_img_path} style={{width: "300px"}} />
                <p>xxx</p>
              </div>
            )
          } else {
            // ถ้า image_similar เป็น null ให้แสดงสิ่งที่คุณต้องการในกรณีนี้
            return (
              <div key={index}>
                {/* <img src={item.ex_img_path} style={{width: "300px"}} /> */}
                {/* <p>xxx</p> */}
              </div>
            );
          }
        })}

        {/* {cmsData.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.ex_img_path} style={{width: "300px"}} />
              <p>xxx</p>
            </div>
          )
        })} */}

        {/* <img src={problemImage.ex_img_path} style={{width: "300px"}}/> */}
      </div>
      <div>
        <h3>อาจคล้ายกับ</h3>
        {cmsData.map((item, index) => {
          // ตรวจสอบว่าข้อมูล image_similar ไม่ใช่ null หรือไม่
          if (item.image_similar !== null) {
            const similarData = JSON.parse(item.image_similar);
            return (
              <div key={index}>
              {/* <img src={`${baseUrl}${item.ex_img_name}`} alt={`Image ${index}`} /> */}
                <div style={{display: "flex"}}>
                  {similarData.map((data, dataIndex) => {
                    const [imageName, percentage] = data.split('/');
                    return (
                      <div key={dataIndex}>
                        {/* <span>Image Name: {imageName}</span> */}
                        <img src={`${baseUrl}${imageName}`} alt="Image Name" style={{width: "300px"}} />
                        <p>Similarity Percentage: {percentage}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return null; // หรือสามารถแสดงข้อความหรือสิ่งอื่น ๆ แทน
          }
        })}

      </div>
    </div>
    <button onClick={() => approve(cmsID.id)}>อนุมัติ</button>
    <button onClick={() => not_approve(cmsID.id)}>ไม่อนุมัติ</button>
    </>
  )
}
