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
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function PackageToken() {
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/packagetoken");
      }
    } else {
      navigate("/login");
    }
    getPackage_token();
  }, []);

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
          toast.error(data.message, toastOptions);
        }
      });
  };

  const [packageList, setPackageList] = useState([]);
  // const [userdata, setUserdata] = useState([]);

  //การกำหนดค่าเพื่อส่งไปหลังบ้าน
  const [package_Id, setPackageID] = useState("");
  const [packageName, setNamepackage] = useState("");
  const [price, setPrice] = useState("");
  const [coins, setCoins] = useState("");

  //เพิ่ม Package
  const [popup, setpopup] = useState(false);
  const Close = () => setpopup(false);
  const handleShow = () => setpopup(true);

  //แก้ไข Package
  const [selectedItem, setSelectedItem] = useState([]);
  const [popup_edit, setpopup_edit] = useState(false);
  const Close_Edit = () => setpopup_edit(false);

  //action ตอนกด edit
  const updatePackage = (item) => {
    setSelectedItem(item);
    setPackageID(item.id);
    setNamepackage(item.package);
    setPrice(item.p_price);
    setCoins(item.p_token);
    setpopup_edit(true);
  };

  // const resetForm = () => {
  //   setNamepackage("");
  //   setCoins("");
  //   setPrice("");
  // };
  // const Closes = () => {
  //   resetForm();
  //   setPopup(false);
  // };

  //API ตอน เพิ่ม Package
  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3333/packagetoken/add", {
        packageName,
        coins,
        price,
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert(data.message);
          window.location = "/packagetoken";
        } else {
          alert(data.message);
          window.location = "/packagetoken";
        }
      });
    Close();
  };

  //API ตอน แก้ไข Package
  const handleClick_edit = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:3333/packagetoken/update/${package_Id}`, {
        packageName,
        coins,
        price,
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert(data.message);
          window.location = "/packagetoken";
        } else {
          alert(data.message);
          window.location = "/packagetoken";
        }
      });
    Close();
  };

  const deletePackage = async (id) => {
    console.log(id);
    await axios
      .put(`http://localhost:3333/packagetoken/delete/${id}`)
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert(data.message);
          window.location = "/packagetoken";
        } else {
          toast.error(data.message, toastOptions);
        }
      });
  };
  const [myState, setMyState] = useState(0);
  console.log(myState);

  return (
    <>
    <input type="number" value={myState} onChange={(e) => setMyState(e.target.value)} />
      <Container>
        <div className="columns mt-5 is-centered">
          <div className="column is-half">
            <Button onClick={handleShow} variant="success">
              Add New
            </Button>
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>จำนวนเหรียญ</th>
                  <th>เงินที่ต้องเติม(บาท)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packageList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td> 
                    <td>{item.p_token}</td>
                    <td>{item.p_price}</td>
                    <td>
                      <Button
                        onClick={() => updatePackage(item)}
                        variant="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deletePackage(item.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>

      <Modal show={popup} onHide={Close}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มแพ็คเกจ</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleClick} id="myForm">
            <Container>
              <Row>
                <Col md={6}>
                  <Form.Label>จำนวนเหรียญ</Form.Label>
                  <Form.Control
                    type="number"
                    value={coins}
                    onChange={(e) => setCoins(e.target.value)}
                    autoFocus
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>เงินที่ต้องเติม</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    autoFocus
                  />
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
            ปิด
          </Button>
          <Button
            id="credit-card"
            variant="success"
            type="submit"
            form="myForm"
          >
            เพิ่ม
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={popup_edit} onHide={Close_Edit}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขแพ็คเกจ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleClick_edit} id="FormEdit">
            <Container>
              <Row>
                <Col md={6}>
                  <Form.Label>จำนวนเหรียญ</Form.Label>
                  <Form.Control
                    type="number"
                    value={coins}
                    onChange={(e) => setCoins(e.target.value)}
                    autoFocus
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>เงินที่ต้องเติม</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    autoFocus
                  />
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close_Edit}>
            ปิด
          </Button>
          <Button
            id="credit-card"
            variant="success"
            type="submit"
            form="FormEdit"
          >
            แก้ไข
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
}
