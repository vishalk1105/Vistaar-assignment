import React, { useState } from "react";
import ReactInput from "../components/ReactInput";
import ReactButton from "../components/ReactButton";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
const LogIn = () => {
  const [email, setemail] = useState("");
  const [password, setPassWord] = useState("");
  const [invalidFieldErrorMsg, setInvalidFieldErrorError] = useState(false);
  const [emptyFieldErrorMsg, setEmptyFieldErrorMsg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result.user);
      const token = await result.user.getIdToken();
      if (result.user) {
        await axios.post("http://localhost:5000/user/login", { token });
        localStorage.setItem("token", result.user.accessToken);
        localStorage.setItem("name", result.user.displayName);
        navigate("/");
      }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!password || !email) {
        setEmptyFieldErrorMsg(true);
      }
      const token = await result.user.getIdToken();
      console.log(token);
      const resp = await axios.post("http://localhost:5000/user/login", {
        token,
      });
      console.log(resp.data);
      if (result.user) {
        localStorage.setItem("token", result.user.accessToken);
        localStorage.setItem("name", result.user.displayName);
        navigate("/");
      }
    } catch (e) {
      setInvalidFieldErrorError(e.message);
    }
  };
  const onIconClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="logInLayoutDiv">
      <form
        className="loginFormDiv rounded shadow bg-body-tertiary p-3"
        onSubmit={onSubmit}
      >
        <div className="loginHeader d-flex flex-column align-items-center my-3">
          <div className="fs-4 fw-bold mb-1">Welcome</div>
          <div className="logInLogo text-white rounded text-center align-middle bg-dark mt-1 fs-3">
            A
          </div>
        </div>
        <div className="">
          <ReactInput
            label="email"
            placeholder="Enter email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            type="email"
            error={
              emptyFieldErrorMsg
                ? "Both Fields can not be Empty"
                : invalidFieldErrorMsg
                ? "Invalid Credentials"
                : ""
            }
          />
          <ReactInput
            reactInputClassName="passwordInput mb-4"
            label="Password"
            placeholder="Enter Password"
            onChange={(e) => setPassWord(e.target.value)}
            value={password}
            type={showPassword ? "password" : "text"}
            error={
              emptyFieldErrorMsg
                ? "Both Fields can not be Empty"
                : invalidFieldErrorMsg
                ? "Invalid Credentials"
                : ""
            }
            icon={true}
            iconClassName={
              showPassword
                ? "bi bi-eye-slash-fill passwordIcon"
                : "bi bi-eye-fill passwordIcon"
            }
            onIconClick={onIconClick}
          />
          <ReactButton
            btnType="submit"
            btnClass="btn-dark text-center w-100"
            btnText="Log In"
            reactBtnOuterDiv="mb-5"
          />
        </div>
        <div onClick={googleLogin}>
          Login with Google
          <img
            className="google-png"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2tGzGsRND1PbePHr0f-OCHxXo7XPyIUVETQ&s"
            alt="Login with Google"
          />
        </div>
      </form>
    </div>
  );
};

export default LogIn;
