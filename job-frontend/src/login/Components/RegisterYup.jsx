// import axios from "axios";
// import { Formik } from "formik";
import React, { useState } from "react";
// import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, FormCheck, FormSelect } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Header from "./Header";
// import classes from "./Register.module.css";
// import {
//   NumberInput,
//   SelectInput,
//   TextInput,
// } from "../../components/dashboard/ManageUsers/AddUsersFormik/fields/FieldInputs";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const Register = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  // let initialValues = {
  //   name: "",
  //   email: "",
  //   password: "",
  //   mobile: "",
  //   age: "",
  //   gender: "",
  //   qualification: "",
  //   experience: "",
  //   role: "User",
  // };
  const initialFormData = {
    role: "",
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    gender: "",
    qualification: "",
    experience: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  console.log(formData);
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    setShowSpinner(true);
    axios
      .post(`http://localhost:8080/auth/register`, formData)
      .then((res) => {
        setShowSpinner(false);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        setShowSpinner(false);
        toast.error("Oops something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
  };
  // const history = useHistory();
  return (
    <React.Fragment>
      {/* <Header /> */}
      <section className="h-full bg-[rgba(243,247,250,255)] py-4 px-1 grid place-items-center overflow-hidden">
        <div className="relative">
          {/* large circle design */}
          <div className="hidden md:block bg-[rgba(28,220,199,255)] absolute top-[-90px] left-[300px] z-10 shadow-lg  rounded-full w-[300px] h-[300px]"></div>
          <div className="hidden md:block bg-[rgba(152,145,212,255)] absolute top-[450px] left-[-120px] z-10 shadow-lg  rounded-full w-[300px] h-[300px]"></div>
          {/* small circle design */}
          <div className="hidden md:block bg-[#1de6b5] absolute top-[400px] left-[-180px] z-10 shadow-lg  rounded-full w-[20px] h-[20px]"></div>
          <div className="hidden md:block bg-[#03a8ef] absolute top-[250px] left-[600px] z-10 shadow-lg  rounded-full w-[20px] h-[20px]"></div>
          {showSpinner && <SpinnerComponent />}
          <div className="flex flex-col gap-4 relative z-20 bg-white px-5 py-3 shadow-lg min-w-[500px] rounded">
            <h1 className="flex items-center justify-center text-xl font-bold ">
              Sign-Up
            </h1>
            <div>
              {/* form */}
              <Form className="flex flex-col gap-3">
                {/* Role */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="role">Role</label>
                  <FormSelect
                    name="role"
                    id="role"
                    label="Role"
                    value={formData.role}
                    onChange={handleFormChange}
                  >
                    <option value="User">User</option>
                    <option value="Job Provider">Job Provider</option>
                  </FormSelect>
                </div>
                {/* name */}
                <div className="flex flex-col justify-center">
                  <Form.Control
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
                {/* email */}
                <div className="flex flex-col">
                  <Form.Control
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
                {/* password */}
                <div>
                  <Form.Control
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleFormChange}
                  />
                </div>
                {/* mobile number */}
                <div>
                  <Form.Control
                    id="mobile"
                    name="mobile"
                    placeholder="Mobile No"
                    value={formData.mobile}
                    onChange={handleFormChange}
                  />
                </div>
                {/* age and gender */}
                <div className="flex flex-row items-center justify-center gap-3">
                  {/* age */}
                  <div className="w-[50%]">
                    <Form.Control
                      name="age"
                      id="age"
                      type="number"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleFormChange}
                    />
                  </div>
                  {/* Gender */}
                  <div className="w-[50%]">
                    <Form.Label>Gender</Form.Label>
                    <div className="flex gap-3">
                      {/* male */}
                      <div className="flex gap-1">
                        <FormCheck
                          type="radio"
                          value="Male"
                          name="gender"
                          id="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleFormChange}
                        />
                        <label htmlFor="Male">Male</label>
                      </div>
                      {/* female */}
                      <div className="flex gap-1">
                        <FormCheck
                          type="radio"
                          value="Female"
                          name="gender"
                          id="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleFormChange}
                        />
                        <label htmlFor="Female">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Qualification and Experience */}
                <div className="flex gap-3">
                  {/* Qualification */}
                  <div className="w-[50%] flex gap-1 flex-col">
                    <label htmlFor="qualification">Qualification</label>
                    <FormSelect
                      name="qualification"
                      id="qualification"
                      label="Qualification"
                      value={formData.qualification}
                      onChange={handleFormChange}
                    >
                      <option value="">Select</option>
                      <option value="Post Graduate">Post Graduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Diploma">Diploma</option>
                      <option value="High School">High School</option>
                    </FormSelect>
                  </div>
                  {/* Experience */}
                  <div className="w-[50%] flex gap-1 flex-col">
                    <label htmlFor="experience">Experience</label>
                    <FormSelect
                      name="experience"
                      id="experience"
                      label="Experience"
                      value={formData.experience}
                      onChange={handleFormChange}
                    >
                      <option value="">Select</option>
                      <option value="0-2">0-2</option>
                      <option value="3-7">3-7</option>
                      <option value="7-10">7-10</option>
                      <option value="10-50">10-50</option>
                    </FormSelect>
                  </div>
                </div>
                {/* sign-up and login button */}
                <div className="flex flex-col gap-3 justify-between mt-3">
                  <Button
                    variant="outline-success"
                    type="submit"
                    className="w-full"
                    onClick={formSubmitHandler}
                  >
                    Register
                  </Button>
                  <Link to="/Login" className="flex justify-end">
                    <Button variant="outline-primary" type="submit">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Register;
