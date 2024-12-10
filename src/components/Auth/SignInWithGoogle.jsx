import React from "react";
import SignUpImage from "../assets/google.png";
import banner from "../assets/banner.png";
import logo from "../assets/logo.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from 'react-toastify';
import "./Style.css";

function SignInWithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      if(result.user) {
        toast.success('User Logged In Successfully', {
            position: "top-center",
        });
        window.location.href = "/Dashboard";
      }
    });
  }
  return (
    <div className="SignUp_Google">
      <div className="SignUp_banner">
        <img src={banner} alt="banner" />
      </div>
      <div className="SignUp_container">
        <div>
          <div style={{ display: "flex" }}>
            {" "}
            <img src={logo} alt="logo" />
            <h2>Vibesnap</h2>
          </div>{" "}
          <br />
          <p>Moments That Matter, Shared Forever</p>
        </div>{" "}
        <br />
        <button className="signup_button" onClick={googleLogin}>
          <img src={SignUpImage} alt="google" />
          <h4>Continue With Google</h4>
        </button>
      </div>
    </div>
  );
}

export default SignInWithGoogle;
