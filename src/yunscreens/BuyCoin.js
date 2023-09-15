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
import Script from "react-load-script";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import QRCode from "qrcode.react";

const title = "เติมเหรียญ";
const bgImg = "url('mainmoon.jpg')";
const body = { backgroundImage: bgImg };

export default function BuyCoin() {
  const [promptPayNumber, setPromptPayNumber] = useState("");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  const [userdata, setUserdata] = useState([]);
  const [admindata, setAdmindata] = useState([]);
  const [role, setRole] = useState();
  console.log(role);
  // console.log(userdata.id);
  // console.log(admindata.admin_id);

  const [packageList, setPackageList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  // console.log(selectedItem);

  const [popuptoken, setpopup] = useState(false);
  const Close = () => setpopup(false);

  const handle_addtoken = (item, e) => {
    setSelectedItem(item);
    setpopup(true);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/buytoken");
      }
    } else {
      navigate("/login");
    }
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
          setPackageList(data.package_token);
          setUserdata(data.users[0]);
          setRole("1");
        } else if (data.status === "admin_ok") {
          setPackageList(data.package_token);
          setAdmindata(data.admins[0]);
          setRole("2");
        } else {
          // toast.error(data.message, toastOptions);
        }
      });
  };

  let OmiseCard;
  let Omise;
  //สำหรับ promptpay ไม่ต้องโหลด handleLoadScript เพราะจะต้องทำให้มันแสดงรายละเอียดหน้า QR

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: "pkey_test_5po2mkzsky7484ta8n0",
      currency: "THB",
      frameLabel: "Buy Coin",
      submitLabel: "Pay NOW",
      buttonLabel: "Pay with Omise",
    });
  };

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: ["promptpay", "truemoney"],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  //----------------------------------------------------------------------------------------
  const createPromptPayPaymentSource = async () => {
    // ตั้งค่า OmiseCard สำหรับการสร้าง Payment Source
    OmiseCard.configure({
      publicKey: "pkey_test_5po2mkzsky7484ta8n0",
      currency: "THB",
    });

    // เรียกใช้งานหน้าต่างชำระเงินของ OmiseCard สำหรับการสร้าง Payment Source
    try {
      const paymentSource = await new Promise((resolve, reject) => {
        OmiseCard.createSource("promptpay", (statusCode, response) => {
          if (statusCode === 200) {
            resolve(response.source);
          } else {
            reject(new Error("Failed to create PromptPay payment source."));
          }
        });
      });
  
      return paymentSource;
    } catch (error) {
      console.error("Error creating PromptPay payment source:", error);
      throw error;
    }
  };

  // เรียกใช้งานฟังก์ชันสร้าง Payment Source
  createPromptPayPaymentSource()
    .then((paymentSource) => {
      // ทำสิ่งที่คุณต้องการกับ Payment Source ที่ได้รับ
      console.log("PromptPay Payment Source:", paymentSource);
      return createChargeWithPaymentSource(paymentSource);
    }).then(charge => {
      console.log("Created Charge:", charge);
      return checkChargeStatus(charge.id);
    })
    .catch((error) => {
      console.error("Error creating PromptPay payment source:", error);
    });

    const createChargeWithPaymentSource = async (paymentSource) => {
      try {
        const response = await axios.post(
          "https://api.omise.co/charges",
          {
            amount: 10000,
            currency: "THB",
            source: paymentSource.id,// ID ของ Payment Source
          },
          {
            auth: {
              username: "pkey_test_5po2mkzsky7484ta8n0",
              password: "skey_test_5po2mluair6jdcygy04",
            },
          }
        );
        const charge = response.data;
        // ทำสิ่งที่คุณต้องการกับ Charge ที่ได้รับ
        console.log("Created Charge:", charge);
        return charge;
      } catch (error) {
        console.error("Error creating charge:", error);
        throw error;
      }
    };

    const checkChargeStatus = async (chargeId) => {
      try {
        const response = await axios.get(`https://api.omise.co/charges/${chargeId}`, {
          auth: {
            username: "pkey_test_5po2mkzsky7484ta8n0",
            password: "skey_test_5po2mluair6jdcygy04",
          },
        });
        const charge = response.data;
        // ตรวจสอบสถานะของ Charge และทำสิ่งที่คุณต้องการ
        console.log("Charge Status:", charge.status);
        return charge;
      } catch (error) {
        console.error("Error checking charge status:", error);
        throw error;
      }
    };

    const promptPayHandler = () => {
      OmiseCard.open({
        frameDescription: "PromptPay QR Code",
        onCreateSource: async (nonce, type, attributes) => {
          if (type === "promptpay") {
            try {
              const response = await axios.post(
                "https://api.omise.co/sources",
                {
                  amount: selectedItem.p_price * 100,
                  currency: "THB",
                  type,
                  promptpay: {
                    phone_number: "0658804379", // เปลี่ยนเบอร์โทรศัพท์ตามที่คุณต้องการ
                  },
                },
                {
                  auth: {
                    username: "pkey_test_5po2mkzsky7484ta8n0",
                    password: "skey_test_5po2mluair6jdcygy04",
                  },
                }
              );
              const source = response.data;
              return source;
            } catch (error) {
              console.error("Error creating PromptPay source:", error);
              throw error;
            }
          }
        },
        onFormClosed: () => {
          // กระบวนการที่คุณต้องการเมื่อฟอร์มถูกปิด
        },
      });
    };
    
  //----------------------------------------------------------------------------------------

  const omiseCardHandler = () => {
    OmiseCard.open({
      amount: selectedItem.p_price * 100,
      onCreateTokenSuccess: (token) => {
        if (userdata.id !== undefined) {
          axios
            .post("http://localhost:3333/omiseAPI", {
              email: userdata.urs_email,
              name: userdata.urs_name,
              amount: selectedItem.p_price * 100,
              token: token,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              const data = response.data;
              if (data.status === "successful") {
                axios
                  .put("http://localhost:3333/token/update", {
                    id_transaction: selectedItem.id,
                    amount: selectedItem.p_token,
                    price: selectedItem.p_price,
                    urs_token: userdata.urs_token,
                    id: userdata.id,
                  })
                  .then((response) => {
                    const data = response.data;
                    if (data.status === "ok") {
                      // alert(data.message);
                      Swal.fire({ ...alertData.BuycoinSuccess }).then(() => {
                        window.location.reload(false);
                      });
                    } else if (data.status === "error") {
                      Swal.fire({ ...alertData.IsError }).then(() => {
                        window.location.reload(false);
                      });
                    } else {
                      Swal.fire({ ...alertData.IsError }).then(() => {
                        window.location.reload(false);
                      });
                    }
                  });
              } else {
                Swal.fire({ ...alertData.IsError }).then(() => {
                  window.location.reload(false);
                });
              }
            });
        } else if (admindata.admin_id !== undefined) {
          axios
            .post("http://localhost:3333/omiseAPI", {
              email: admindata.admin_email,
              name: admindata.admin_name,
              amount: selectedItem.p_price * 100,
              token: token,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              const data = response.data;
              if (data.status === "successful") {
                axios
                  .put("http://localhost:3333/token/update", {
                    id_transaction: selectedItem.id,
                    amount: selectedItem.p_token,
                    price: selectedItem.p_price,
                    admin_token: admindata.admin_token,
                    id: admindata.admin_id,
                  })
                  .then((response) => {
                    const data = response.data;
                    if (data.status === "ok") {
                      // alert(data.message);
                      Swal.fire({ ...alertData.BuycoinSuccess }).then(() => {
                        window.location.reload(false);
                      });
                    } else if (data.status === "error") {
                      Swal.fire({ ...alertData.IsError }).then(() => {
                        window.location.reload(false);
                      });
                    } else {
                      Swal.fire({ ...alertData.IsError }).then(() => {
                        window.location.reload(false);
                      });
                    }
                  });
              } else {
                Swal.fire({ ...alertData.IsError }).then(() => {
                  window.location.reload(false);
                });
              }
            });
        } else {
          console.log("error");
        }
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
        {role === "1" ? <NavbarUser /> : role === "2" ? <NavbarAdmin /> : null}

        <div className="container">
          <div className="buycoin-soloCard">
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
          <Script
            url="https://cdn.omise.co/omise.js"
            onLoad={handleLoadScript}
          />
          
          <Form onSubmit={handleClick} id="myForm">
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
