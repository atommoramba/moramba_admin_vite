import React, { useState, useEffect } from "react";
import "../Login/Login.css";
import Bg from "../../assets/img/LoginV3-Bg.png";
import Logo from "../../assets/img/MorambaLogo.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import Cookie from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginClick, setloginClick] = useState(false);
  const [enterEmail, setEnterEmail] = useState("");
  const [enterPass, setEnterPass] = useState("");
  const [addemailorPhone, setAddEmailorPhone] = useState("");
  const [addpassword, setAddPassword] = useState("");

  const setDataToSessionFromCookie = async () => {
    var tokenInCookie = Cookie.get("token");
    sessionStorage.setItem("token", tokenInCookie);
  };
  useEffect(() => {
    var tokenInCookie = Cookie.get("token");

    if (tokenInCookie) {
      setDataToSessionFromCookie().then(() => {
        navigate("/admin/dashboard", {
          state: {
            tokenInCookie,
          },
        });
      });
    }
  }, []);
  //Enter Keypress
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      if (loginClick) {
        return;
      }
      loginHandler();
      setloginClick(true);
    }
  };
  //Validation
  const loginValidation = () => {
    let formIsValid = true;
    if (addemailorPhone === "") {
      formIsValid = false;
      setEnterEmail("*Please Enter Email or Phone Number!");
    }
    if (addpassword === "") {
      formIsValid = false;
      setEnterPass("*Please Enter Password!");
    }

    return formIsValid;
  };

  const loginHandler = () => {
    setloginClick(true);
      if (loginValidation()) {
        var API_URL = "https://admin.moramba.io/api/login";
        var data = {
          username: addemailorPhone,
          password: addpassword,
        };
        axios
          .post(API_URL, data)
          .then(function (response) {
            console.log(response);
            if (response.status === 200) {
              var res = response.data;
              sessionStorage.setItem("token", res.token);
              sessionStorage.setItem("country",res.country);
              successToast("Successfully Logged in");
              if (rememberMe) {
                Cookie.set("token", res.token);
              }
              setTimeout(() => {
                navigate("/admin/dashboard");
              }, 1000);
            }
          })
          .catch(function (error) {
            console.log("login error***", error);
            errorToast("Invalid username or password!");
            setloginClick(false);
          });
      }
    }
    console.log("test")
  return (
    <>
      <main className="login-main" onKeyPress={keyHandler}>
        <nav className="d-flex justify-content-between align-items-center w-full mb-5 p-3">
          <div>
            <img className="logoimg" src={Logo} alt="" />
          </div>
        </nav>
        <div className="d-flex justify-content-evenly align-items-center w-full">
          <img src={Bg} alt="Login_Background" id="login-bg" />
          <div className="login-main-box text-center p-4">
            <h3 className="logo_text">Admin Panel Login</h3>
            <div className="login-form">
              <div>
                <input
                  placeholder="Enter Email"
                  type="email"
                  className="Login-input"
                  onChange={(e) => [
                    setAddEmailorPhone(e.target.value),
                    setEnterEmail(""),
                  ]}
                />
                <p className="error_sty text-start px-3 mt-1">{enterEmail}</p>
              </div>
              <div
                className="d-flex flex-row align-items-baseline me-3"
                id="eye"
              >
                <input
                  placeholder="Enter Password"
                  type={passwordShown ? "text" : "password"}
                  className="Login-input mt-4"
                  onChange={(e) => [
                    setAddPassword(e.target.value),
                    setEnterPass(""),
                  ]}
                />
                <button
                  className="eyebtn"
                  onClick={() => setPasswordShown(!passwordShown)}
                >
                  {passwordShown === true ? (
                    <FaEye className="" />
                  ) : (
                    <FaEyeSlash className="" />
                  )}
                </button>
              </div>
              <p className="error_sty text-start px-3 mt-1">{enterPass}</p>
              <div className="RememberForgotBox  mt-1 p-3">
                <div className="d-flex align-items-baseline">
                  <input
                    type="checkbox"
                    name="remeber-me"
                    className="me-1"
                    onClick={(e) => setRememberMe(e.target.checked)}
                  />
                  <p className="text-remembar">Remember me</p>
                </div>
              </div>
              <div className="p-3">
                <button
                  className="sign-up-btn w-100 "
                  // disabled={loginClick}
                  onClick={loginHandler}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center loginPromotext text-muted">
          Product of Atom, A Delaware Corporation.
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default Login;
