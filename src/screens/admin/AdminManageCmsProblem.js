import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../../components/Navbar";
import { width } from '@mui/system';
import { styled } from 'styled-components';
import { Height } from "@mui/icons-material";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as alertData from "../../alertdata/alertData";

const host = "http://localhost:3333";

export default function AdminManageCmsProblem() {
    const navigate = useNavigate();
    const cmsID = useParams();
    const [admindata, setAdmindata] = useState([]);
    // const [admintoken, setAdmintoken] = useState();
    const [cmsData, setCmsdata] = useState([]);
    const [imageDefult, setImageDefult] = useState([]);
    const [problemImage, setProblemImage] = useState([]);

    // console.log(problemImage);
    console.log("cmsData : ",cmsData);
    console.log("imageDefult : ",imageDefult);

    const baseUrl = `${host}/images_cms/`;

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
          .get(`${host}/admin`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
                setAdmindata(data.admins[0]);
                // setAdmintoken(data.admintoken);
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
    const getData = async () => {
        await axios
        .get(`${host}/commission/problem/${cmsID.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.status === "ok") {
              setCmsdata(data.results);
              // setProblemImage(data.result[0]);
              setImageDefult(data.result);
          } else {
              console.log("error");
          }
        })
    }

    const approve = async(cmsID) => {
      await axios
      .patch(`${host}/commission/problem/approve/${cmsID}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
            // setCmsdata(data.results);
            // setProblemImage(data.results[0]);
            Swal.fire({
              title: 'อนุมัติแล้ว',
              icon: 'success',
              iconColor: '#7E9AFA',
              confirmButtonText: 'ตกลง',
            }).then(() => {
              window.location = "/admin/commission";
            });
        } else {
            Swal.fire({...alertData.IsError}).then(() => {
              window.location.reload(false);
            });
        }
      })
    }

    const not_approve = async(cmsID) => {
      Swal.fire({ 
        title: 'ไม่อนุมัติคอมมิชชันหรือไม่',
        icon: 'question',
        iconColor: '#7E9AFA',
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancleButtonText: "ยกเลิก",
       }).then((result) => {
        if (result.isConfirmed) {
          axios
          .patch(`${host}/commission/problem/notapprove/${cmsID}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const data = response.data;
            console.log(data);
            if (data.status === "ok") {
                Swal.fire({   
                  title: 'จัดการคอมมิชชันสำเร็จ',
                  icon: 'success',
                  iconColor: '#7E9AFA',
                  confirmButtonText: 'ตกลง', 
                }).then(() => {
                  window.location = "/admin/commission";
                });
            } else {
              Swal.fire({...alertData.IsError}).then(() => {
                window.location.reload(false);
              });
            }
          })
        }
      });
    }


  return (
    <>
      <div style={{display: "flex"}}>
        <div>
          <h3>ภาพที่เป็นปัญหา</h3>
          {[...new Set(cmsData.map(item => item.ex_img_path))].map((exImgPath, index) => (
            <div key={index}>
              <img src={exImgPath} style={{ width: "300px" }} />
              <p>Image ID : {cmsData.find(item => item.ex_img_path === exImgPath).ex_img_id}</p>
              <p>ความคล้าย : {cmsData.find(item => item.ex_img_path === exImgPath).percentage}</p>
            </div>
          ))}
        </div>
        <div>
          <h3>อาจคล้ายกับ</h3>
          <div style={{display: "flex"}}>
            {imageDefult.map((data, dataIndex) => {
              return (
                <div key={dataIndex}>
                  <img src={data.ex_img_path} style={{width: "300px"}}/>
                  <p>Image ID : {data.ex_img_id}</p>
                  <p>ผู้ใช้ : {data.urs_name}</p>
                  <p>คอมมิชชัน : {data.cms_name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <button onClick={() => approve(cmsID.id)}>อนุมัติ</button>
      <button onClick={() => not_approve(cmsID.id)}>ไม่อนุมัติ</button>
    </>
  )
}
