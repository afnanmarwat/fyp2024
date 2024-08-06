import React from "react";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import classes from "./AddJob.module.css";

import { TextField, SelectInput } from "./FormTypes";
import * as Yup from "yup";

export default function AddJob(props) {
  let initialValues = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    category: "",
    location: "",
    numberOfPositions: "",
    salaryRange: "",
    age: "",
    qualification: "",
    type:""
  };

  if (props.jobInfo) {
    initialValues = {
      title: props.jobInfo.title,
      description: props.jobInfo.description,
      startDate: props.jobInfo.startDate,
      endDate: props.jobInfo.endDate,
      category: props.jobInfo.category,
      location: props.jobInfo.location,
      numberOfPositions: props.jobInfo.numberOfPositions,
      salaryRange: props.jobInfo.salaryRange,
      age: props.jobInfo.age,
      qualification: props.jobInfo.qualification,
      type: props.jobInfo.type, // add this line for editing purpose
    };
  }

  const formSubmitHandler = (values, setSubmitting) => {
    props.onAdd(values);
    setSubmitting(false);
  };

  // VALIDATION
  const validate = Yup.object({
    title: Yup.string().max(30).required("Required"),
    description: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
    category: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    numberOfPositions: Yup.number().required("Required").positive().integer(),
    salaryRange: Yup.string().required("Required"),
    age: Yup.string().required("Required"),
    qualification: Yup.string()
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          const editedValues = { ...props.jobInfo, ...values };
          formSubmitHandler(editedValues, setSubmitting);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <TextField label="Title" name="title" type="text" />
              <TextField label="Description" name="description" type="textarea" />
              <SelectInput label="Category" name="category">
                <option value="">Select</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Gaming">Gaming</option>
                <option value="Finance">Finance</option>
              </SelectInput>
              <SelectInput label="type" name="type">
                <option value="">Select</option>
                <option value="fullTime">full time</option>
                <option value="partTime">part time</option>
                <option value="contract">contract</option>
                <option value="remote">remote</option>
              </SelectInput>
              <TextField label="Location" name="location" type="text" />
              <TextField label="Number of Positions" name="numberOfPositions" type="number" />
              <TextField label="Salary Range" name="salaryRange" type="text" />
              <TextField label="Age" name="age" type="text" />
              <TextField label="Qualification" name="qualification" type="text" />
              <TextField label="Start date" name="startDate" type="date" />
              <TextField label="End date" name="endDate" type="date" />
            </div>

            {!props.jobInfo ? (
              <Button
                className={classes.submitBtn}
                type="submit"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Add Job
              </Button>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button className={classes.submitBtn} type="submit">
                  Edit Job
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}
