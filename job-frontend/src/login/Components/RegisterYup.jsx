import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, FormCheck, FormSelect } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const Register = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

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
    profilePic: null,
  };

  const initialProviderData = {
    email: "",
    password: "",
    company: "",
    bio: "",
    role: "",
    profilePic: null,
    location: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [providerForm, setProviderForm] = useState(initialProviderData);
  const [rolcheck, setRoleCheck] = useState('JobSeeker');

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleFormChangeProvider = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setProviderForm((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setShowSpinner(true);

    const data = rolcheck === 'JobSeeker' ? formData : providerForm;
    const formDataToSend = new FormData();

    Object.keys(data).forEach(key => {
      formDataToSend.append(key, data[key]);
    });

    axios
      .post(`http://localhost:8080/auth/register`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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

  const handleRoleChange = (event) => {
    setRoleCheck(event.target.value);
  };

  return (
    <React.Fragment>
      <section className="h-full bg-[rgba(243,247,250,255)] sm:py-4 sm:px-1 grid place-items-center overflow-hidden">
        <div className="relative">
          <div className="hidden md:block bg-[rgba(28,220,199,255)] absolute top-[-90px] left-[300px] z-10 shadow-lg rounded-full w-[300px] h-[300px]"></div>
          <div className="hidden md:block bg-[rgba(152,145,212,255)] absolute top-[450px] left-[-120px] z-10 shadow-lg rounded-full w-[300px] h-[300px]"></div>
          <div className="hidden md:block bg-[#1de6b5] absolute top-[400px] left-[-180px] z-10 shadow-lg rounded-full w-[20px] h-[20px]"></div>
          <div className="hidden md:block bg-[#03a8ef] absolute top-[250px] left-[600px] z-10 shadow-lg rounded-full w-[20px] h-[20px]"></div>
          {showSpinner && <SpinnerComponent />}
          <div className="flex flex-col gap-4 relative z-20 bg-white px-2 sm:px-5 py-3 shadow-lg xs:min-w-[300] sm:min-w-[500px] rounded">
            <h1 className="flex items-center justify-center text-xl font-bold">Sign-Up</h1>
            <div>
              <div className="w-full flex justify-between mb-3">
                <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      value="JobSeeker"
                      name="role"
                      id="JobSeeker"
                      checked={rolcheck === 'JobSeeker'}
                      onChange={handleRoleChange}
                    />
                    <label htmlFor="JobSeeker">JobSeeker</label>
                  </div>
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      value="JobProvider"
                      name="role"
                      id="JobProvider"
                      checked={rolcheck === 'JobProvider'}
                      onChange={handleRoleChange}
                    />
                    <label htmlFor="JobProvider">JobProvider</label>
                  </div>
                </div>
              </div>
              {rolcheck === 'JobSeeker' ? (
                <Form className="flex flex-col gap-3">
                 
                 <div className="flex flex-col gap-1">
                  <label htmlFor="role">Role</label>
                  <FormSelect
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Role</option>
                    <option value="JobSeeker">Job Seeker</option>
                    <option value="JobProvider">Job Provider</option>
                  </FormSelect>
                </div>
                  <div className="flex flex-col justify-center">
                    <Form.Control
                      id="name"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Form.Control
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </div>
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
                  <div className="d-flex flex-row gap-4">
                    <Form.Control
                      id="mobile"
                      name="mobile"
                      placeholder="Mobile No"
                      value={formData.mobile}
                      onChange={handleFormChange}
                    />
                    <Form.Control
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-center gap-3">
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
                    <div className="w-[50%]">
                      <Form.Label>Gender</Form.Label>
                      <div className="flex gap-3">
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
                  <div className="flex gap-3">
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
                        <option value="Fresher">Fresher</option>
                        <option value="1-2 Years">1-2 Years</option>
                        <option value="2-3 Years">2-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                      </FormSelect>
                    </div>
                  </div>
                  <div>
                    <Button variant="primary" type="submit" onClick={formSubmitHandler}>Submit</Button>
                  </div>
                </Form>
              ) : (
                <Form className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="role">Role</label>
                    <FormSelect
                    id="role"
                    name="role"
                    value={providerForm.role}
                    onChange={handleFormChangeProvider}
                  >
                    <option value="">Select Role</option>
                    <option value="JobSeeker">Job Seeker</option>
                    <option value="JobProvider">Job Provider</option>
                  </FormSelect>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Form.Control
                      id="name"
                      name="company"
                      placeholder="Company Name"
                      value={providerForm.company}
                      onChange={handleFormChangeProvider}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Form.Control
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={providerForm.email}
                      onChange={handleFormChangeProvider}
                    />
                  </div>
                  <div>
                    <Form.Control
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={providerForm.password}
                      onChange={handleFormChangeProvider}
                    />
                  </div>
                  <div className="d-flex flex-row gap-4">
                    <Form.Control
                      id="location"
                      name="location"
                      placeholder="Location"
                      value={providerForm.location}
                      onChange={handleFormChangeProvider}
                    />
                    <Form.Control
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      onChange={handleFormChangeProvider}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-center gap-3">
                    <div className="w-[100%]">
                      <Form.Control
                        as="textarea"
                        name="bio"
                        id="bio"
                        rows="3"
                        placeholder="Bio"
                        value={providerForm.bio}
                        onChange={handleFormChangeProvider}
                      />
                    </div>
                  </div>
                  <div>
                    <Button variant="primary" type="submit" onClick={formSubmitHandler}>Submit</Button>
                  </div>
                </Form>
              )}
            </div>
            <p className="flex items-center justify-center gap-1 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#1bc7fb] font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Register;
