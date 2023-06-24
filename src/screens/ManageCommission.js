import React, { useState, useEffect, useRef } from "react";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as alertData from "../alertdata/alertData";
import { Helmet } from "react-helmet";
import "../css/manageCommission.css";
import { colors } from "@mui/material";

const title = 'ManageCommission';

export default function ManageCommission() {
    const navigate = useNavigate();
    const [userdata, setUserdata] = useState([]);
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No selected file");
    const [previewUrl, setPreviewUrl] = useState("");

    const [packages, setPackages] = useState([]);
    const [counter, setCounter] = useState(1);

    const addPackage = () => {
        setPackages(prevPackages => [...prevPackages, { id: counter, package_name: '', package_detail: '' }]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const PackegeNameChange = (id, event) => {
        const { value } = event.target;
        // setPackages(prevPackages => {
        //   const updatedPackages = [...prevPackages];
        //   const packageIndex = updatedPackages.findIndex(pkg => pkg.id === id);
        //   updatedPackages[packageIndex].package_name = value;
        //   return updatedPackages;
        // });
        setPackages(prevPackages =>
            prevPackages.map(pkg =>
              pkg.id === id ? { ...pkg, package_name: value } : pkg
            )
        );
    };

    const PackageDetailAgeChange = (id, event) => {
        const { value } = event.target;
        // setPackages(prevPackages => {
        //     const updatedPackages = [...prevPackages];
        //     const packageIndex = updatedPackages.findIndex(pkg => pkg.id === id);
        //     updatedPackages[packageIndex].package_detail = value;
        //     return updatedPackages;
        // });
        setPackages(prevPackages =>
            prevPackages.map(pkg =>
              pkg.id === id ? { ...pkg, package_detail: value } : pkg
            )
        );
    };

    const deletePackage = id => {
        // setPackages(prevPackages => prevPackages.slice(0, -1));
        // setCounter(prevCounter => prevCounter - 1);
        setPackages(prevPackages => prevPackages.filter(pkg => pkg.id !== id));
      };

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const token = localStorage.getItem("token");
        await axios
          .get("http://localhost:3333/index", {
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
            console.error("Error:", error);
          });
    };

    const AddCommission = (event) => {//ส่งฟอร์ม
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setImage(file);
        setFileName(file.name);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
    <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <NavbarUser />
        <div class="body-nopadding" style={{backgroundColor: "#F4F1F9"}}>
            <div className="container mt-4">
                <div className="content-container">
                    <div className="content-type">
                        <button className="sub-menu selected">คอมมิชชัน</button>
                        <button className="sub-menu">แกลลอรี่</button>
                    </div>
                    <h3 className="content-header d-flex justify-content-center mt-4">เพิ่มคอมมิชชัน</h3>
                    <div className="content-body">
                        <h5>รายละเอียดคอมมิชชัน</h5>
                        <form
                            onSubmit={(event) => AddCommission(event)}
                        >
                            <p className="content-P">เพิ่มหน้าปก</p>
                            <div className="d-flex justify-content-center mt-3">
                                <div className="dragNdrop" 
                                    onClick={() => document.querySelector(".input-field").click()}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <input
                                        type="file"
                                        accept="image/png ,image/gif ,image/jpeg"
                                        className="input-field"
                                        hidden
                                        required
                                        onChange={({ target: { files } }) => {
                                            files[0] && setFileName(files[0].name);
                                            if (files) {
                                            setImage(files[0]);
                                            setPreviewUrl(URL.createObjectURL(files[0]));
                                            }
                                        }}
                                    />
                                        {previewUrl ? (
                                        <img src={previewUrl} alt={fileName} className="imagePreview" />
                                    ) : (
                                        <h4>Drop images here</h4>
                                    )}
                                </div>
                            </div>
                            <p className="content-P mt-3">ชื่อคอมมิชชัน</p>
                            <input type="text" className="input-text mt-1" required/>
                            <p className="content-P mt-3">คำอธิบาย</p>
                            <textarea className="input-textarea mt-1" rows="4" cols="50" required/>
                            <p className="content-P mt-3">ประเภทการใช้งานที่รับ</p>
                            <div className="d-flex mt-1">
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" name="flexRadioDefault" id="flexRadioDefault1"/>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Personal use (ใช้ส่วนตัว)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" name="flexRadioDefault" id="flexRadioDefault2"/>
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        License (มีสิทธ์บางส่วน)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" name="flexRadioDefault" id="flexRadioDefault3"/>
                                    <label class="form-check-label" for="flexRadioDefault3">
                                        Exclusive right (ซื้อขาด)
                                    </label>
                                </div>
                            </div>
                            <p className="content-P mt-3">หัวข้อ</p>
                            <input type="text" className="input-text mt-1" required/>
                            <p className="content-P mt-3">จำนวนคิว</p>
                            <div className="d-flex">
                                <input type="number" className="input-text mt-1" required/>
                                <div className="col-10 mt-1" style={{marginLeft:10}}>
                                    <p>คิว</p>
                                </div>
                            </div>
                            <div className="commission_packege mt-4">
                                <h5>แพ็กเกจ</h5>
                                {packages.map(packageData => (
                                    <div key={packageData.id}>
                                        <div className="d-flex">
                                            <button type="button" className="btn-close" onClick={() => deletePackage(packageData.id)}></button>
                                            <p>แพ็คเกจ {packageData.id}</p>
                                        </div>
                                        <p className="content-P mt-3">ชื่อแพ็คเกจ</p>
                                        <input
                                            className="input-text mt-1"
                                            type="text"
                                            value={packageData.package_name}
                                            onChange={event => PackegeNameChange(packageData.id, event)}
                                        />
                   
                                        <p className="content-P mt-3">คำอธิบาย</p>
                                        <textarea
                                            className="input-textarea mt-1" rows="3" cols="50"
                                            value={packageData.package_detail}
                                            onChange={event => PackageDetailAgeChange(packageData.id, event)}
                                        />
                                        <div className="d-flex mt-3 mb-3">
                                            <div className="col-3">
                                                <p className="content-P">ระยะเวลาทำงาน</p>
                                                <div className="d-flex mt-1">
                                                    <input type="number" className="input-text-package me-2"/>
                                                    <p>วัน</p>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <p className="content-P">ราคาเริ่มต้น</p>
                                                <div className="d-flex mt-1">
                                                    <input type="number" className="input-text-package me-2"/>
                                                    <p>P</p>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <p className="content-P">จำนวนแก้ไข</p>
                                                <div className="d-flex mt-1">
                                                    <input type="number" className="input-text-package me-2"/>
                                                    <p>ครั้ง</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="sub-menu selected" onClick={addPackage}>+ เพิ่มแพ็กเกจ</button>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary mt-2">บันทึก</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
