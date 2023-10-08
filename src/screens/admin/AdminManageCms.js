import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { NavbarUser, NavbarAdmin, NavbarHomepage } from "../../components/Navbar";

const host = "http://localhost:3333";

export default function AdminManageCms() {
    const navigate = useNavigate();
    const [admindata, setAdmindata] = useState([]);
    const [admintoken, setAdmintoken] = useState();
    const [cmsData, setCmsdata] = useState([]);
    const isoDate = cmsData.created_at;
    console.log(isoDate);
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
          .get("http://localhost:3333/admin", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
                setAdmindata(data.admins[0]);
                setAdmintoken(data.admintoken);
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
          .get(`${host}/allcommission`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
                setCmsdata(data.results);
            } else {
                console.log("error");
            }
          })
    }

    const handle= async (cmsId) => {
        console.log(cmsId);
    }



  return (
    <>
        <NavbarAdmin />
        <div className="container test">
            {/* <ul>
                {cmsData.map((item, index) => (
                    <li key={index}>
                        <a href="#">{item.cms_name}</a>
                    </li>
                ))}
            </ul> */}
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>ID_CMS</th>
                        <th>Commission Name</th>
                        <th>ID_Users</th>
                        <th>DateTime</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cmsData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.cms_id}</td>
                            <td>{item.cms_name}</td>
                            <td>{item.usr_id}</td>
                            <td>
                              {new Date(item.created_at).toLocaleString("th-TH", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              })}
                            </td>
                            <td><Link to={`/admin/commission/problem/${item.cms_id}`}>จัดการ</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}
