import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import REST from "../../../Connection/Database/Rest/REST";
import UserContext from "../../../Contexts/UserContext";
import { dateArray, monthArray, yearArray } from "../../../Helper/Datehelper";
import sendToast from "../../../Helper/ToastMessage";
import { SET_USER_TO_CONTEXT } from "../../../Helper/UserContextTypes";
import "./SignUp.scss";

function SignUp(props) {
  // Navigate
  const navigate = useNavigate();
  // User Context api
  const { userDispatch } = useContext(UserContext);
  // Register a user
  const [userData, setUserData] = useState({
    auth: "",
    firstname: "",
    surname: "",
    dateofbirth: "",
    gender: "",
    password: "",
  });

  // Birth Date
  const [dfb, setDfb] = useState({ day: "", month: "", year: "" });
  useEffect(() => {
    setUserData({
      ...userData,
      dateofbirth: new Date(`${dfb.day}.${dfb.month}.${dfb.year}`),
    });
  }, [dfb]);

  // Submit a user to database
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userData.auth === "" ||
      userData.firstname === "" ||
      userData.surname === "" ||
      userData.dateofbirth === "" ||
      userData.gender === "" ||
      userData.password === ""
    ) {
      sendToast.error("All Fields Are Required !", "top-center");
      return;
    }

    REST.createUser({
      ...userData,
    })
      .then((res) => {
        setUserData({
          auth: "",
          firstname: "",
          surname: "",
          dateofbirth: "",
          gender: "",
          password: "",
        });
        // Req for user Data
        REST.getUser(res.data.data._id)
          .then((res) => {
            // Set User Data to Context
            userDispatch({ type: SET_USER_TO_CONTEXT, payload: res.data });
            navigate("/");
          })
          .catch((err) => {
            sendToast.error(err.response.data.message);
          });
        sendToast.success(res.data.message);
      })
      .catch((err) => {
        sendToast.error(err.response.data.message);
      });
  };

  return (
    <Modal
      show={props.modal}
      onHide={props.handlemodal}
      dialogClassName="sign_upModal"
      centered
    >
      <Modal.Header closeButton>
        <div className="modal-top">
          <h2 className="Sign-Up font-Helvetica font-bold"> Sign Up</h2>
          <span className="quick-and-easy">It's quick and easy.</span>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="signup_form ">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <input
                className="basis-[49%]"
                type="text"
                value={userData.firstname}
                onChange={(e) => {
                  setUserData({ ...userData, firstname: e.target.value });
                }}
                placeholder="First name"
              />
              <input
                className="basis-[49%]"
                type="text"
                placeholder="Surname"
                value={userData.surname}
                onChange={(e) => {
                  setUserData({ ...userData, surname: e.target.value });
                }}
              />
            </div>
            <div className="my-2">
              <input
                className="w-full"
                type="text"
                placeholder="Mobile number or email"
                value={userData.auth}
                onChange={(e) => {
                  setUserData({ ...userData, auth: e.target.value });
                }}
              />
            </div>
            <div className="my-2">
              <input
                className="w-full"
                type="password"
                placeholder="New password"
                value={userData.password}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
              />
            </div>
            <div>Date of birth</div>
            <div className="my-2 flex justify-between gap-x-2">
              <select
                onChange={(e) => setDfb({ ...dfb, day: e.target.value })}
                className="grow"
                name=""
                id=""
              >
                {dateArray.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setDfb({ ...dfb, month: e.target.value })}
                className="grow"
                name=""
                id=""
              >
                {monthArray.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setDfb({ ...dfb, year: e.target.value })}
                className="grow"
                name=""
                id=""
              >
                {yearArray.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
            <div>Gender</div>
            <div className="my-2 flex items-center gap-x-2">
              <div className="radio-wrap grow border flex justify-between items-center p-2">
                <label htmlFor="female">Female</label>
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                />
              </div>
              <div className="radio-wrap grow border flex justify-between items-center p-2">
                <label htmlFor="male">Male</label>
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                />
              </div>

              <div className="radio-wrap grow border flex justify-between items-center p-2">
                <label htmlFor="custom">Custom</label>
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                  type="radio"
                  name="gender"
                  id="custom"
                  value="custom"
                />
              </div>
            </div>
            <div className="my-2">
              <p className="text-[11px]">
                People who use our service may have uploaded your contact
                information to Facebook. <a href="#">Learn more.</a>
              </p>
            </div>
            <div className="my-2">
              <p className="text-[11px]">
                By clicking Sign Up, you agree to our <a href="#">Terms,</a>{" "}
                <a href="#">Privacy Policy</a> and{" "}
                <a href="#">Cookies Policy.</a> You may receive SMS
                notifications from us and can opt out at any time.
              </p>
            </div>
            <div className="submit-btn text-center">
              <input
                type="submit"
                className="text-[17px] h-[36px] px-[16px] font-bold text-[#fff] hover:text-[#fff] inline-block w-[197px]"
                value="Sign Up"
              />
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SignUp;
