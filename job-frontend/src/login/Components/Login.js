import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Form} from "react-bootstrap";
import { Link } from "react-router-dom";
// import Header from "./Header";
// import classes from "./Register.module.css";
// import "./src/App.css";
import Config from "../../config/Config.json";

// const style = {
//   backgroundColor: "rgb(235, 238, 240)",
// };

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({
    show: false,
    message: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = Config.TITLE.LOGIN;
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // console.log(inputs);
      setBackendErrors({ show: false, message: "" });
      axios
        .post("http://localhost:8080/auth/login", inputs)
        .then((res) => {
          const token = res.data.token;
          dispatch({
            type: "SETAUTHTOKEN",
            data: token,
          });
        })
        .catch((err) => {
          const statusCode = err.message.split(" ").pop();
          if (statusCode === "401" || "422") {
            // console.log(statusCode);
            setBackendErrors({
              show: true,
              message: "Incorrect Email or Password",
            });
          } else {
            setBackendErrors({
              show: true,
              message: "Some error...on our side...",
            });
          }
        });
    }
  };

  const validate = () => {
    let isValid = true;
    let error = {};

    if (!inputs["email"]) {
      isValid = false;
      error["email"] = "Please enter your email Address.";
    }

    if (typeof inputs["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(inputs["email"])) {
        isValid = false;
        error["email"] = "Please enter valid email address.";
      }
    }

    if (!inputs["password"]) {
      isValid = false;
      error["password"] = "Please enter your password.";
    }

    if (typeof inputs["password"] !== "undefined") {
      if (inputs["password"].length < 6) {
        isValid = false;
        error["password"] = "Please add at least 6 character.";
      }
    }

    setErrors(error);

    return isValid;
  };

  return (
    <React.Fragment>
      {/* <title>{Config.TITLE.APP_TITLE}</title> */}
      {/* <Header /> */}
      {/* Full Container */}
      <section className="md:grid 2xl:items-start 2xl:pt-[100px] justify-center items-center h-[100vh] bg-[rgba(243,247,250,255)] overflow-hidden">
        <div className="relative ">
          {/* large circle design */}
          <div className="hidden md:block bg-[rgba(28,220,199,255)] absolute top-[-90px] left-[180px] z-10 shadow-lg  rounded-full w-[300px] h-[300px]"></div>
          <div className="hidden md:block bg-[rgba(152,145,212,255)] absolute top-[180px] left-[-100px] z-10 shadow-lg  rounded-full w-[300px] h-[300px]"></div>
          {/* small circle design */}
          <div className="hidden md:block bg-[#1de6b5] absolute top-[240px] left-[-180px] z-10 shadow-lg  rounded-full w-[20px] h-[20px]"></div>
          <div className="hidden md:block bg-[#03a8ef] absolute top-[100px] left-[550px] z-10 shadow-lg  rounded-full w-[20px] h-[20px]"></div>

          {/* Login container */}
          <div className="relative  z-20 p-5 bg-[rgba(255,255,255,255)] shadow-lg">
            {/* form container */}
            <div className="">
              {backendErrors.show && (
                <div className="login-error">{backendErrors.message}</div>
              )}
              <form
                className="flex flex-col gap-4 min-w-[300px]"
                onSubmit={handleSubmit}
              >
                <div className="flex justify-center items-center">
                  <h2 className="text-xl font-bold">
                    Sign-In
                  </h2>
                </div>
                {/* for Email and password input */}
                <div className="flex flex-col gap-3">
                  <div className="" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={inputs.email}
                      onChange={handleChange}
                    />

                    <p style={{ color: "red" }}> {errors.email} </p>
                  </div>
                  <div className="" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={inputs.password}
                      onChange={handleChange}
                    />
                    <p style={{ color: "red" }}> {errors.password} </p>
                  </div>
                </div>
                {/* <Link to="/Dashboard"> */}
                {/* Login button Link for forget password */}
                <div className="flex flex-col ">
                  <button
                    className="w-full h-10 bg-[#1a8cc0c7] font-semibold rounded hover:bg-[#4ec6fd] transition-all duration-300 ease-in-out"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                  <div className="text-nowrap">
                    <Link className="underline" to="/Reset">
                      {" "}
                      Forgot Password?{" "}
                    </Link>
                  </div>
                </div>
                {/* </Link> */}
                {/* Link for sign-up */}
                <div className="flex gap-2 justify-between">
                  <div>
                    <label className="text-nowrap">
                      Don't have an account?{" "}
                    </label>
                  </div>
                  <div>
                    <Link to="/Register">
                      <button className=" h-10 w-20 text-white list-none bg-green-700 font-semibold rounded hover:bg-green-500 transition-all duration-300 ease-in-out">
                        {" "}
                        Sign-Up{" "}
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>

    // </div>
  );
};

export default Login;
