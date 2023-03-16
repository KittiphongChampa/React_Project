import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Script from "react-load-script";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

let OmiseCard;

export default function CreditCard() {
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  const [package_token, setPackage] = useState([]);
  const [userdata, setUserdata] = useState([]);
  console.log(package_token);
  //   console.log(userdata);

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
          //   setUserdata(data.users[0]);
          setPackage(data.package_token);
          setUserdata(data.users[0]);
        } else {
          toast.error(data.message, toastOptions);
        }
      });
  };

  const [selectedItem, setSelectedItem] = useState({});
  const [popuptoken, setpopup] = useState(false);
  const Close = () => setpopup(false);
  const handle_addtoken = (item) => {
    setSelectedItem(item);
    setpopup(true);
  };

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
                    toast.error(data.message, toastOptions);
                  } else {
                    toast.error(data.message, toastOptions);
                  }
                });
            } else {
              toast.error(data.message, toastOptions);
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
      <Container>
        <Row>
          {package_token.map((item, index) => (
            <Col xs={4} key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.package}</Card.Title>
                  <p>{item.id}</p>
                  <p>p_price : {item.p_price}</p>
                  <p>p_token : {item.p_token}</p>
                  <Button
                    variant="primary"
                    onClick={() => handle_addtoken(item)}
                  >
                    เลือก
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <ToastContainer />
      <Modal show={popuptoken} onHide={Close}>
        <Modal.Body>
          <Form onSubmit={handleClick} id="myForm">
            <Script
              url="https://cdn.omise.co/omise.js"
              onLoad={handleLoadScript}
            />
            <Form.Control
              type="text"
              name="testvalue"
              disabled
              value={selectedItem.p_price}
              autoFocus
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
