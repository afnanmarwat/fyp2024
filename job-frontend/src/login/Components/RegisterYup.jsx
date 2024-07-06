// import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, FormCheck, FormSelect } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Header from "./Header";
// import classes from "./Register.module.css";
import {
  NumberInput,
  SelectInput,
  TextInput,
} from "../../components/dashboard/ManageUsers/AddUsersFormik/fields/FieldInputs";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const Register = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  let initialValues = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    gender: "",
    qualification: "",
    experience: "",
    role: "User",
  };

  const formSubmitHandler = (values, setSubmitting) => {
    setShowSpinner(true);
    axios
      .post(`http://localhost:8080/auth/register`, { ...values })
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
      <section className="h-[150vh] md:h-[130vh] 2xl:h-[100vh] bg-[rgba(243,247,250,255)] md:py-4 px-1 grid sm:place-items-center  overflow-hidden">
        <div className="relative">
          {/* large circle design */}
          <div className="hidden sm:block bg-[rgba(28,220,199,255)] absolute top-[-90px] left-[300px] z-10 shadow-lg  rounded-full w-[300px] h-[300px]"></div>
          <div className="hidden sm:block bg-[rgba(152,145,212,255)] absolute top-[450px] left-[-120px] z-10 shadow-lg  rounded-full w-[300px] h-[300px]"></div>
          {/* small circle design */}
          <div className="hidden sm:block bg-[#1de6b5] absolute top-[400px] left-[-180px] z-10 shadow-lg  rounded-full w-[20px] h-[20px]"></div>
          <div className="hidden sm:block bg-[#03a8ef] absolute top-[250px] left-[600px] z-10 shadow-lg  rounded-full w-[20px] h-[20px]"></div>
          {showSpinner && <SpinnerComponent />}
          <div className="flex flex-col gap-4 relative z-20 bg-white xs:px-3 xs:py-2 sm:px-5 sm:py-3 shadow-lg md:min-w-[500px] min-w-[250px] rounded">
            <h1 className="flex items-center justify-center text-xl font-bold ">
              Sign-Up
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                name: Yup.string()
                  .min(4, "Name should be more than 4 characters")
                  .max(25, "Name should be less than 25 characters")
                  .required("Name is a required field"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is a required field"),
                password: Yup.string()
                  .min(6, "Password must be minimum 6 characters")
                  .required("Password is a required field"),
                mobile: Yup.string()
                  .required("Phone number is required")
                  .matches(/^[0-9]+$/, "Must be only digits")
                  .min(10, "Must be exactly 10 digits")
                  .max(10, "Must be exactly 10 digits"),
                gender: Yup.string().required("Gender Required"),
                age: Yup.number()
                  .max(60, "Age should be less than or equal to 60")
                  .min(18, "Age should be greater than or equal to 18")
                  .required("Age Required"),
                qualification: Yup.string().required("Qualification Required"),
                experience: Yup.string(),
                role: Yup.string(),
              })}
              onSubmit={(values, { setSubmitting }) => {
                const editedValues = { ...props.userInfo, ...values };
                formSubmitHandler(editedValues, setSubmitting);
              }}
            >
              {(formik) => (
                <div>
                  {/* form */}
                  <Form className="flex flex-col gap-3">
                    {/* Role */}
                    <div className="flex flex-col gap-1" >
                      <label htmlFor="role">Role</label>
                      <FormSelect name="role" id="role" label="Role">
                        <option value="User">User</option>
                        <option value="Job Provider">Job Provider</option>
                      </FormSelect>
                    </div>
                    {/* name */}
                    <div className="flex flex-col justify-center ">
                      <Form.Control
                        id="name"
                        name="name"
                        mandatory={"true"}
                        placeholder="Full Name"
                      />
                    </div>
                    {/* email */}
                    <div className="flex flex-col ">
                      <Form.Control
                        id="email"
                        name="email"
                        mandatory={"true"}
                        placeholder="Enter Email"
                      />
                    </div>
                    {/* password */}
                    <div>
                      <Form.Control
                        id="password"
                        type="password"
                        name="password"
                        mandatory={"true"}
                        placeholder="Password"
                      />
                    </div>
                    {/* mobile number */}
                    <div>
                      <Form.Control
                        id="mobile"
                        name="mobile"
                        mandatory={"true"}
                        placeholder="Mobile No"
                      />
                    </div>
                    {/* age and gender */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
                      {/* age */}
                      <div className="sm:w-[50%] w-full">
                        <Form.Control
                          name="age"
                          id="age"
                          type="number"
                          mandatory={"true"}
                          placeholder="Age"
                        />
                      </div>
                      {/* Gender */}
                      <div className="sm:w-[50%] w-full">
                        <Form.Label>
                          Gender
                        </Form.Label>
                        <div className="flex gap-3">
                          {/* male */}
                          <div className="flex gap-1">
                            <FormCheck
                              type="radio"
                              value="Male"
                              name="gender"
                              id="Male"
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
                            />
                            <label htmlFor="Female">Female</label>
                          </div>
                        </div>
                        {formik.errors.gender && (
                          <div className="error">{formik.errors.gender}</div>
                        )}
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
                          mandatory={"true"}
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
                      <Button variant="outline-success" type="submit" className="w-full">
                        Register
                      </Button>
                      <Link to="/Login" className="flex justify-end">
                        <Button
                          variant="outline-primary"
                          type="submit"
                        >
                          Back to Login
                        </Button>
                      </Link>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Register;
