import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import DefaultInput from "../../components/DefaultInput";
import {
  NavbarUser,
  NavbarAdmin,
  NavbarHomepage,
} from "../../components/Navbar";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as alertData from "../../alertdata/alertData";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";
import ProfileImg from "../../components/ProfileImg.js";
import Lottie from "lottie-react";
import loading from "../../loading.json";
import * as Icon from "react-feather";

import { AdminBox, UserBox } from "../../components/UserBox";

const host = "http://localhost:3333";
const title = "จัดการคำถามที่พบบ่อย";
const bgImg = "";
const body = { backgroundColor: "#F4F1F9" };

export default function AdminManageFAQ() {
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  const [admin, setAdmin] = useState("");
  const [FAQ, setFAQdata] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.location.pathname === "/login") {
        navigate("/admin/allfaq");
      }
    } else {
      navigate("/login");
    }
    getFAQdata()
  }, []);

  const getFAQdata = async () => {
    await axios
      .get(`${host}/allfaq`, {
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setFAQdata(data.results);
        } else {
          alert(data.message);
        }
    });
  }

  const [ID, setFaqID] = useState("");
  const [question , setQuestion] = useState("");
  const [answer , setAnswer] = useState("");
  // console.log(question,":",answer);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisible2, setIsFormVisible2] = useState(false);
  const toggleForm = () => {setIsFormVisible(!isFormVisible)}
  const toggleForm2 = (faqID) => {
    setIsFormVisible2(!isFormVisible2)
    const faq = FAQ.find(item => item.faq_id === faqID);
    if (faq) {
      setFaqID(faq.faq_id)
      setQuestion(faq.faq_heading);
      setAnswer(faq.faq_desc);
    }
  }
  const formData = new FormData();
  formData.append("question", question);
  formData.append("answer", answer);

  const handleAddFAQ = async () => {
    await axios
      .post(`${host}/faq/add`, formData, {
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert('สำเร็จ')
          window.location.reload(false);
        } else {
          alert('ไม่สำเร็จ : ' + data.message);
          window.location.reload(false);
        }
      });
  };
  const handleEditFAQ = async (e, ID) => {
    e.preventDefault();
    await axios
      .patch(`${host}/faq/update/${ID}`, formData, {
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert('สำเร็จ')
          window.location.reload(false);
        } else {
          alert('ไม่สำเร็จ : ' + data.message);
          window.location.reload(false);
        }
      });
  };
  const handleDeleteFAQ = async (faqID) => {
    await axios
      .patch(`${host}/faq/delete/${faqID}`,{
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          alert('สำเร็จ')
          window.location.reload(false);
        } else {
          alert('ไม่สำเร็จ : ' + data.message);
          window.location.reload(false);
        }
      });
  };

  return (
    <>
      <NavbarAdmin />
      <div>
        <button onClick={toggleForm}>
          {isFormVisible ? 'ซ่อน' : 'แบบฟอร์มเพิ่มคำถามที่พบบ่อย'}
        </button>
        {isFormVisible && (
          <form>
            <label>
              question:
              <input
                type="text"
                name="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>
            <label>
              answer:
              <input
                type="text"
                name="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </label>
              <input type="submit" value="เพิ่มคำถามที่พบบ่อย" onClick={handleAddFAQ}/>
          </form>
        )}
      </div>

      <div>
        {isFormVisible2 && (
          <form onSubmit={(e) => handleEditFAQ(e, ID)}>
            <label>
              question:
              <input
                type="text"
                name="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>
            <label>
              answer:
              <input
                type="text"
                name="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </label>
            <input type="submit" value="บันทึก"/>
          </form>
        )}
        {FAQ.map((item, index) => (
          <ul key={index}>
            <li>
              <div>
                <p>{item.faq_id} {item.faq_heading} {item.faq_desc}</p>
                <button onClick={() => toggleForm2(item.faq_id)}>
                  {isFormVisible2 ? 'ซ่อน' : 'แก้ไข'}
                </button>
                <button onClick={() => handleDeleteFAQ(item.faq_id)}>ลบ</button>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
