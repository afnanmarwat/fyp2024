import React, { useState } from "react";
import axios from "axios";
import { Form, Button, FormSelect } from "react-bootstrap";
import { toast } from "react-toastify";
import Config from "../../../config/Config.json";

const EditProvider = ({ provider, onSave }) => {
  const { password, ...initialData } = provider; // Exclude password from form data
  const [formData, setFormData] = useState({ ...initialData });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object
    const formDataToSend = new FormData();
    // Append each field to FormData
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Log FormData for debugging
    for (const pair of formDataToSend.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
// user not updaded why 

    axios
      .put(`${Config.SERVER_URL + "admin/edit-provider/" + formData._id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          // Content-Type will be automatically set by axios
        },
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Provider updated successfully:", res.data);
        if (onSave) onSave(res.data.user);
      })
      .catch((err) => {
        toast.error("Failed to update provider", {
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
        <FormSelect
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled
        >
          <option value="JobProvider">Job Provider</option>
        </FormSelect>
      </Form.Group>

      <Form.Group controlId="formCompany">
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formProfilePic">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          name="profilePic"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          rows="3"
          value={formData.bio}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default EditProvider;
