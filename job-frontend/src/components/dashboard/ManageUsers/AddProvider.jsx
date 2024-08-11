import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, FormSelect } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinnerComponent from "../../UI/SpinnerComponent";

const Register = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const initialProviderData = {
    email: "",
    password: "",
    company: "",
    bio: "",
    role: "JobProvider",  // Default value for the role
    profilePic: null,
    location: "",
  };

  const [providerForm, setProviderForm] = useState(initialProviderData);

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

    const formData = new FormData();
    for (const key in providerForm) {
      formData.append(key, providerForm[key]);
    }

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
        // navigate("/login", { replace: true });
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

  return (
    <React.Fragment>
      <section className="h-full bg-[rgba(243,247,250,255)] overflow-hidden">
        <div className="relative">
          {showSpinner && <SpinnerComponent />}
          <div className="flex flex-col gap-4 relative z-20 bg-white px-2 sm:px-5 py-3 shadow-lg xs:min-w-[300] rounded">
            <Form className="flex flex-col gap-3" onSubmit={formSubmitHandler}>
              <div className="flex flex-col gap-1">
                <label htmlFor="role">Role</label>
                <FormSelect
                  id="role"
                  name="role"
                  value={providerForm.role}
                  onChange={handleFormChangeProvider}
                >
                  <option value="JobProvider">Job Provider</option>
                  {/* You can add more options here if needed */}
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Register;
