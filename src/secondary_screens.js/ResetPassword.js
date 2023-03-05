import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const toastOptions = {
  position: "bottom-right",
  autoClose: 1000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function ResetPassword() {
  // useEffect(() => {
  //   getAPI();
  // }, []);
  // const getAPI = async () => {
  //   await axios
  //     .get("http://localhost:3333/reset-password/:token")
  //     .then((response) => {
  //       const data = response.data;
  //       if (data.status === "ok") {
  //         alert(data.message);
  //       } else {
  //         alert(data.message);
  //       }
  //     });
  // };
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  // const userId = new URLSearchParams(location.search).get("userId");
  const [values, setValues] = useState({
    password: "",
    confirm_password: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  console.log(values);
  const handleValidation = () => {
    const { password, confirm_password } = values;
    if (password !== confirm_password) {
      toast.error("password and confirm password should be same", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("password should be greater than 8 characters", toastOptions);
      return false;
    }
    return true;
  };

  const changePassword = async () => {
    if (handleValidation()) {
      await axios
        .post("http://localhost:3333/reset-password", {
          email,
          new_password: values.password,
        })
        .then((response) => {
          const data = response.data;
          if (data.status === "ok") {
            alert(data.message);
            navigate("/login");
          } else {
            toast.error(data.message, toastOptions);
          }
        });
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <h2>Change Password</h2>
      <form>
        <label>
          New Password
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <label>
          Confirm password
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        {/* <input type="submit" value="Reset password"/> */}
      </form>
      <Button onClick={() => changePassword()}>Reset password</Button>

      {/* <div>
        <section className="bg-gray-50 w-screen dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  ></input>
                </div>
              </form>
              <button
                onClick={() => changePassword()}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset passwod
              </button>
            </div>
          </div>
        </section>
      </div> */}
      <ToastContainer />
    </>
  );
}
