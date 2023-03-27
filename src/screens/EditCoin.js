import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from "react-feather";
import "../css/indexx.css";
import "../css/allbutton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../components/Navbar";
import BuyCoinItem from "../components/BuyCoinItem";
import EditDeleteCoinItem from "../components/EditDeleteCoinItem";
import { Table, Tabs, Tab } from "react-bootstrap";
import AddEditDeleteCoinModal from "../modal/AddEditDeleteCoinModal";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as alertData from "../alertdata/alertData";
const title = "จัดการเหรียญ";
const bgImg = "url('mainmoon.jpg')";
const body = { backgroundImage: bgImg };

export default function EditCoin() {

  const [showModal, setShowModal] = useState("")
  const [selectedItem, setSelectedItem] = useState([]);

  const [packageList, setPackageList] = useState([]);

  let price = ""
  let coins = ""
  let headding = "เพิ่มแพ็กเกจเติมเงิน";
  let package_Id = "";

  // const { reset } = useForm();
  const modalChangeCoinRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm();

    const func = {
        register: register,
        errors: errors,
      setValue: setValue,
      isValid: isValid,
      handleSubmit:handleSubmit
        
    }
  

  const openModal = (edit) => {
    if (edit !== "edit") {
      headding ="เพิ่มแพ็กเกจเติมเงิน";
      price = null
      coins=null
    }

    console.log({ coins })
    console.log({price})
    const modalComponent = <AddEditDeleteCoinModal {...func} package_Id={package_Id} headding={headding}
        coinValue={coins} priceValue={price} setShowModal={setShowModal}
        // name="coins"
      />
    setShowModal(modalComponent)
    console.log("เปิดโมดอลลล")
  };
  
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");

  const getPackage_token = async () => {
    await axios
      .get("http://localhost:3333/packagetoken", {
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          //   setUserdata(data.results);
          setSelectedItem(data.results);
          setPackageList(data.results);
        } else if (data.status === "no_access") {
          console.log("no_access");
          alert(data.message);
          navigate("/");
        } else {
          //   toast.error(data.message, toastOptions);
        }
      });
  };

  useEffect(() => {
    //   if (localStorage.getItem("token")) {
    //     if (window.location.pathname === "/login") {
    //       navigate("/packagetoken");
    //     }
    //   } else {
    //     navigate("/login");
    //   }
    getPackage_token();
  }, []);

  const updatePackage = (item) => {
 
    coins = item.p_token
    price = item.p_price

    setSelectedItem(item);
    package_Id=item.id;
    headding ="แก้ไขแพ็กเกจเติมเงิน";
    openModal("edit");
  };

  const deletePackage = async (id) => {
    console.log(id);
    Swal.fire({ ...alertData.deleteCoinConfirm }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:3333/packagetoken/delete/${id}`)
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
              // alert(data.message);
              Swal.fire({ ...alertData.deleteCoinIsConfirmed }).then(() => {
                window.location.reload(false);
              });
            } else {
              // toast.error(data.message, toastOptions);
            }
          });

      }
    });
  };
  // console.log({coins});


  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {showModal}

      <div
        className="body"
        style={{
          backgroundImage: "url('mainmoon.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <Navbar /> */}
        <NavbarAdmin />

        <div className="container">
          <div className="buycoin-soloCard">
            <h1 className="text-center">{title} </h1>
            <button class="gradiant-outline-btn" onClick={openModal}>
              <div class="in-dradiant-outline-btn">
                <Icon.PlusCircle /> เพิ่มแพ็กเกจเติมเงิน
              </div>
            </button>
            <div className="buycoin-content">
              {packageList.map((item, index) => (
                <div key={index}>
                  
                  <EditDeleteCoinItem
                    onClickupdate={() => updatePackage(item)}
                    onClickdelete={() => deletePackage(item.id)}
                    src="a_coin.png"
                    coin={item.p_token}
                    pay={item.p_price}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
