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
import Script from "react-load-script";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const title = "เติมเหรียญ";
const bgImg = "url('mainmoon.jpg')";
const body = { backgroundImage: bgImg };

export default function BuyCoin() {
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);
  const [packageList, setPackageList] = useState([]);


  const [selectedItem, setSelectedItem] = useState({});
  console.log(selectedItem);
  const [popuptoken, setpopup] = useState(false);
  const Close = () => setpopup(false);
  
  const handle_addtoken = (item,e) => {
    setSelectedItem(item);
    setpopup(true);
  };



  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   if (window.location.pathname === "/login") {
    //     navigate("/buytoken");
    //   }
    // } else {
    //   navigate("/login");
    // }
    getPackage_token();
  }, []);
  const getPackage_token = async () => {
    await axios
      .get("http://localhost:3333/buytoken", {
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          //   setUserdata(data.users[0]);
          setPackageList(data.package_token);
          setUserdata(data.users[0]);
        } else {
          // toast.error(data.message, toastOptions);
        }
      });
  };

  let OmiseCard;

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: "pkey_test_5po2mkzsky7484ta8n0",
      currency: "THB",
      frameLabel: "Token Shop",
      submitLabel: "Pay NOW",
      buttonLabel: "Pay with Omise",
    });
  };

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    OmiseCard.open({
      amount: selectedItem.p_price*100,
      onCreateTokenSuccess: (token) => {
        axios
          .post("http://localhost:3333/omiseAPI", {
            email: userdata.urs_email,
            name: userdata.urs_name,
            amount: selectedItem.p_price*100,
            token: token,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            const data = response.data;
            console.log(data);
            if (data.status === "successful") {
              axios
                .put("http://localhost:3333/token/update", {
                  id_transaction: selectedItem.id,
                  amount: selectedItem.p_token,
                  urs_token: userdata.urs_token,
                  id: userdata.id,
                })
                .then((response) => {
                  const data = response.data;
                  if (data.status === "ok") {
                    alert(data.message);
                    navigate("/buytoken");
                    window.location = "/buytoken";
                  } else if (data.status === "error") {
                    // toast.error(data.message, toastOptions);
                  } else {
                    // toast.error(data.message, toastOptions);
                  }
                });
            } else {
              // toast.error(data.message, toastOptions);
            }
          });
      },
      onFormClosed: () => {},
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    creditCardConfigure();
    omiseCardHandler();
    Close();
  };


  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

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
            <div className="buycoin-content">
                {packageList.map((item, index) => (
                  <div key={index}>
                    <BuyCoinItem
                      onClick={() => handle_addtoken(item)}
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

      <Modal show={popuptoken} onHide={Close}>
        <Modal.Body>
          <BuyCoinItem
            src="a_coin.png"
            coin={selectedItem.p_token}
            pay={selectedItem.p_price}
          />
          <Form onSubmit={handleClick} id="myForm">
            <Script
              url="https://cdn.omise.co/omise.js"
              onLoad={handleLoadScript}
            />
            <Button variant="secondary" onClick={Close}>
              ปิด
            </Button>
            <Button
              id="credit-card"
              variant="primary"
              type="submit"
              form="myForm"
            >
              ชำระเงินด้วยบัตรเครดิต
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
