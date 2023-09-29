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
import Lottie from "lottie-react";
import loading from "../loading.json";

const title = 'ManageCommission';

export default function ManageCommission() {
    const navigate = useNavigate();
    const jwt_token = localStorage.getItem("token");
    const [userdata, setUserdata] = useState([]);
    let userID = userdata.id;
    const [isLoading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No selected file");
    const [previewUrl, setPreviewUrl] = useState("");
    const [packages, setPackages] = useState([]);
    const [counter, setCounter] = useState(1);

    //โค้ดสำหรับการอัพโหลดรูปภาพหลายไฟล์
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };
    const handleUpload = async () => {
        const formData = new FormData();
    
        for (const image of selectedFiles) {
        //   formData.append('images', image);
          formData.append("image_file", image);
        }

        try {
            await axios.post('http://localhost:3333/api/upload', formData, {
            // await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
          setUploaded(true);
        } catch (error) {
          console.error('Error uploading images:', error);
        }
    };

    //---------------------------------------------------------------------

    const [additionalFields, setAdditionalFields] = useState({
        topic: '',
        queue: ''
    });

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

    const handleAdditionalFieldChange = (field, event) => {
        const { value } = event.target;
        if (field === 'topic') {
            setAdditionalFields(prevFields => ({ ...prevFields, topic: value }));
        } else if (field === 'queue') {
            setAdditionalFields(prevFields => ({ ...prevFields, queue: value }));
        }
    };

    const handlePackageFieldChange = (id, field, event) => {
        const { value } = event.target;
    
        setPackages(prevPackages =>
            prevPackages.map(pkg =>
                pkg.id === id ? { ...pkg, [field]: value } : pkg
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
            if (error.response && error.response.status === 401 && error.response.data === "Token has expired") {
                alert("Token has expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
              } else {
                console.error("Error:", error);
              }
          });
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

    const AddCommission = async(event) => {//ส่งฟอร์ม
        setLoading(true);
        event.preventDefault();
        const formData = new FormData();
        const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');
        const selectedRadioValue = selectedRadio ? selectedRadio.value : '';
        // formData.append("image_file", image);
        for (const image of selectedFiles) {
              formData.append("image_file", image);
        }
        formData.append('commission_name', event.target.querySelector('.input-text').value);
        formData.append('commission_description', event.target.querySelector('.input-textarea').value);
        formData.append('selected_radio_value', selectedRadioValue);
        formData.append('commission_topic', additionalFields.topic);
        formData.append('commission_que', additionalFields.queue);

        packages.forEach(packageData => {
            formData.append(`packageID`, packageData.id);
            formData.append(`package_name`, packageData.package_name);
            formData.append(`package_detail`, packageData.package_detail);
            formData.append(`duration`, packageData.duration);
            formData.append(`price`, packageData.price);
            formData.append(`edits`, packageData.edits);
        });

        axios.post("http://localhost:3333/commission/add", formData,{
            headers: {
                Authorization: "Bearer " + jwt_token,
                "Content-type": "multipart/form-data",
            },
        }).then((response) => {
            formData.append("userID", userID);
            const data = response.data;
            const res_array = data.images;
            const arr_imageID = [];
            const arr_image_name = [];
            if (data.status == "ok") {
                if (Array.isArray(res_array)) {
                    // formData.append("images", data.images)
                    res_array.forEach((fileItem) => {
                      // ทำสิ่งที่ต้องการกับแต่ละ fileItem
                      arr_imageID.push(fileItem.example_img_Id)
                      arr_image_name.push(fileItem.image_name)
                    });
                    formData.append("arr_imageID", arr_imageID)
                    formData.append("arr_image_name", arr_image_name)
                    axios.post("http://localhost:5000/api/upload", formData ,{
                    // axios.post("http://127.0.0.1:5000/upload-json", formData ,{
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((response) => {
                        setLoading(false);
                        const arr_similar_multi = response.data.similar_filenames;
                        if (response.data.status == "ok") {
                            axios.patch(`http://localhost:3333/commission/update/${data.insertedCommissionId}`,{
                                headers: {
                                    Authorization: "Bearer " + jwt_token,
                                },
                                status: "pass"
                            }).then((response) => {
                                if (response.data.status == "ok") {
                                    console.log("upload pass");
                                    Swal.fire({ ...alertData.uploadpass }).then(() => {
                                        window.location.reload(false);
                                    });
                                } else {
                                    console.log("upload fail");
                                    Swal.fire({ ...alertData.uploadfail }).then(() => {
                                        window.location.reload(false);
                                    });
                                }
                            })
                        } else if (response.data.status == "similar") {
                            console.log("arr_similar_multi : ",arr_similar_multi);
                            axios.patch(`http://localhost:3333/commission/update/${data.insertedCommissionId}`,{
                                headers: {
                                    Authorization: "Bearer " + jwt_token,
                                },
                                status: "pending"
                            }).then((response) => {
                                if (response.data.status == "ok") {
                                    console.log("upload fail");
                                    axios.post(`http://localhost:3333/example_img/update`,{
                                        headers: {
                                            Authorization: "Bearer " + jwt_token,
                                        },
                                        similar : arr_similar_multi
                                    }).then((response) => {
                                        console.log(response.data);
                                        if (response.data.status == 'ok') {
                                            console.log("บันทึกรูปผิดพลาดสำเร็จ");
                                            Swal.fire({ ...alertData.similar }).then(() => {
                                                window.location.reload(false);
                                            });
                                        } else {
                                            console.log("Error");
                                            Swal.fire({ ...alertData.IsError }).then(() => {
                                                window.location.reload(false);
                                            });
                                        }
                                    })
                                } else {
                                    console.log("upload");
                                    Swal.fire({ ...alertData.changeCoverIsError }).then(() => {
                                        window.location.reload(false);
                                    });
                                }
                            })
                        } else {
                            console.log("error บางอย่างที่ Array.isArray(res_array)");
                        }
                    })
                } else {
                    // กรณีที่ file เป็นอ็อบเจกต์เดี่ยว
                    const imageID = data.example_img_Id;
                    const image_name = data.image_name;
                    formData.append("image_name", image_name)
                    formData.append("imageID", imageID)
                    // axios.post("http://localhost:5000/api/upload", formData ,{
                    axios.post("http://127.0.0.1:5000/upload-json", formData ,{
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((response) => {
                        setLoading(false);
                        console.log(response.data);
                        const arr_similar_single = response.data.similar_filenames;
                        console.log(arr_similar_single);
                        if (response.data.status == "ok"){
                            axios.patch(`http://localhost:3333/commission/update/${data.insertedCommissionId}`,{
                                headers: {
                                    Authorization: "Bearer " + jwt_token,
                                },
                                status: "pass"
                            }).then((response) => {
                                if (response.data.status == "ok") {
                                    console.log("upload pass");
                                    Swal.fire({ ...alertData.uploadpass }).then(() => {
                                        window.location.reload(false);
                                    });
                                } else {
                                    console.log("upload fail");
                                    Swal.fire({ ...alertData.uploadfail }).then(() => {
                                        window.location.reload(false);
                                    });
                                }
                            })
                        } else if (response.data.status == "similar"){
                            axios.patch(`http://localhost:3333/commission/update/${data.insertedCommissionId}`,{
                                headers: {
                                    Authorization: "Bearer " + jwt_token,
                                },
                                status: "pending"
                            }).then((response) => {
                                if (response.data.status == "ok") {
                                    console.log("upload fail");
                                    axios.patch(`http://localhost:3333/example_img/update/${data.example_img_Id}`,{
                                        headers: {
                                            Authorization: "Bearer " + jwt_token,
                                        },
                                        similar : arr_similar_single
                                    }).then((response) => {
                                        // ******************************************************************
                                        if (response.data.status == 'ok') {
                                            console.log("บันทึกรูปผิดพลาดสำเร็จ");
                                            Swal.fire({ ...alertData.similar }).then(() => {
                                                window.location.reload(false);
                                            });
                                        } else {
                                            console.log("Error");
                                            Swal.fire({ ...alertData.IsError }).then(() => {
                                                window.location.reload(false);
                                            });
                                        }
                                    })
                                } else {
                                    console.log("upload");
                                    Swal.fire({ ...alertData.changeCoverIsError }).then(() => {
                                        window.location.reload(false);
                                    });
                                }
                            })
                        } else {
                            console.log("error บางอย่าง");
                        }
                    })
                }
            } else {
                Swal.fire({ ...alertData.changeCoverIsError }).then(() => {
                    window.location.reload(false);
                });
            }
        })
        
        setLoading(true);
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
                {/* {isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                    <Lottie animationData={loading} loop={true} />
                    </div>
                ) : (
                    <div>
                        <p>tst</p>
                        <input type="file" multiple onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload</button>
                        {uploaded && <p>Images uploaded successfully!</p>}
                    </div>
                )} */}

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
                            {/* <div className="d-flex justify-content-center mt-3">
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
                            </div> */}

                            <input type="file" multiple onChange={handleFileChange} />

                            <p className="content-P mt-3">ชื่อคอมมิชชัน</p>
                            <input type="text" className="input-text mt-1" />
                            <p className="content-P mt-3">คำอธิบาย</p>
                            <textarea className="input-textarea mt-1" rows="4" cols="50" />
                            <p className="content-P mt-3">ประเภทการใช้งานที่รับ</p>
                            <div className="d-flex mt-1">
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" name="flexRadioDefault" id="flexRadioDefault1" value="Personal use"/>
                                    <label class="form-check-label" for="flexRadioDefault1">Personal use (ใช้ส่วนตัว)</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" name="flexRadioDefault" id="flexRadioDefault2" value="License"/>
                                    <label class="form-check-label" for="flexRadioDefault2">License (มีสิทธ์บางส่วน)</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" name="flexRadioDefault" id="flexRadioDefault3" value="Exclusive right"/>
                                    <label class="form-check-label" for="flexRadioDefault3">Exclusive right (ซื้อขาด)</label>
                                </div>
                            </div>
                            <p className="content-P mt-3">หัวข้อ</p>
                            <input 
                                type="text" 
                                className="input-text mt-1" 
                                value={additionalFields.topic}
                                onChange={event => handleAdditionalFieldChange('topic', event)}
                            />
                            <p className="content-P mt-3">จำนวนคิว</p>
                            <div className="d-flex">
                                <input 
                                    type="number" 
                                    className="input-text mt-1" 
                                    value={additionalFields.queue}
                                    onChange={event => handleAdditionalFieldChange('queue', event)}
                                />
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
                                                    <input type="number"
                                                        className="input-text-package me-2"
                                                        value={packageData.duration}
                                                        onChange={event => handlePackageFieldChange(packageData.id, 'duration', event)}
                                                    />
                                                    <p>วัน</p>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <p className="content-P">ราคาเริ่มต้น</p>
                                                <div className="d-flex mt-1">
                                                    <input type="number" 
                                                        className="input-text-package me-2"
                                                        value={packageData.price}
                                                        onChange={event => handlePackageFieldChange(packageData.id, 'price', event)}
                                                    />
                                                    <p>P</p>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <p className="content-P">จำนวนแก้ไข</p>
                                                <div className="d-flex mt-1">
                                                    <input type="number" 
                                                        className="input-text-package me-2"
                                                        value={packageData.edits}
                                                        onChange={event => handlePackageFieldChange(packageData.id, 'edits', event)}
                                                    />
                                                    <p>ครั้ง</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="sub-menu selected" onClick={addPackage}>+ เพิ่มแพ็กเกจ</button>
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
