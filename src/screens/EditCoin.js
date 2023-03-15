import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from "react-feather";
import "../css/indexx.css";
import "../css/allbutton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
// import Navbar from "../components/Navbar";
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
const title = "เติมเหรียญ";
const bgImg = "url('mainmoon.jpg')";
const body = { backgroundImage: bgImg };

export default function EditCoin() {
  const { reset } = useForm();
  const modalChangeCoinRef = useRef(null);

  const openModal = (edit) => {
    if (edit !== "edit") {
      setHeadding("เพิ่มแพ็กเกจเติมเงิน");
      setPrice(null);
      setCoins(null);
    }
    const modalChangePassRefElement = modalChangeCoinRef.current;
    const modalChangePassClass = modalChangePassRefElement.classList;
    modalChangePassClass.add("open");
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

  const [selectedItem, setSelectedItem] = useState([]);

  const [packageList, setPackageList] = useState([]);

  const [package_Id, setPackageID] = useState("");
  const [price, setPrice] = useState("");
  const [coins, setCoins] = useState("");
  const [headding, setHeadding] = useState("เพิ่มแพ็กเกจเติมเงิน");

  // let headding = "เพิ่มแพ็กเกจเติมเงิน";
  // let coinValue = null;
  // let priceValue = null;

  const updatePackage = (item) => {
    setSelectedItem(item);
    setPackageID(item.id);
    setPrice(item.p_price);
    setCoins(item.p_token);
    setHeadding("แก้ไขแพ็กเกจเติมเงิน");
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

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <AddEditDeleteCoinModal
        package_Id={package_Id}
        headding={headding}
        ref={modalChangeCoinRef}
        coinValue={coins}
        priceValue={price}
      />

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

        <div className="container">
          <div className="buycoin-clearpage">
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
