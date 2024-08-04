// EditeUser.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import classes from "./ManageUserItem.module.css";
import Config from "../../../config/Config.json";
import { toast } from "react-toastify";
const EditeUser = ({ user, onSave }) => {
  const [formData, setFormData] = useState({ ...user });
  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave(formData);
    axios
    .put(`${Config.SERVER_URL + "admin/edit-user/" + formData._id}`, formData, {
      headers: {
        Authorization: "Bearer " + token,
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
      console.log("User updated successfully:", res.data);
    //   props.setShowEditModal(false);
    //   props.onEdit(res.data.user); // Notify parent about the update
    })
    .catch((err) => console.log(err));
  };
  const handleEditUser = (updatedUser) => {

  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
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
      <Form.Group controlId="formMobile">
        <Form.Label>Mobile</Form.Label>
        <Form.Control
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formGender">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formQualification">
        <Form.Label>Qualification</Form.Label>
        <Form.Control
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formExperience">
        <Form.Label>Experience</Form.Label>
        <Form.Control
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default EditeUser;
