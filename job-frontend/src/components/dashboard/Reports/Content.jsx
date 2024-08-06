import React from "react";
import {
  FormGroup,
  FormControl,
  Col,
  Row,
  Table,
  Container,
  FormLabel,
} from "react-bootstrap";
import classes from "./Content.module.css";
import { useState, useEffect } from "react";
import useTable from "../../../hooks/useTable";
import TableFooter from "../Tables/TableFooter";
import { CSVLink } from "react-csv";
import axios from "axios";

import Config from "../../../config/Config.json";
// import dateFormat from 'dateformat';

function Reports() {
  const [reportsData, setReportsData] = useState([]);

  const [page, setPage] = useState(1);
  const { slice, range } = useTable(reportsData, page, 5);

  const [forminputs, setFormInputs] = useState({});
  const setFilterDates = useState({
    startdate: "",
    enddate: "",
  })[1];

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`${Config.SERVER_URL + "admin/jobs"}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setReportsData([...res.data.jobs]);
      });
  }, []);

  const validateStart = () => {
    let error = "";
    if (!forminputs["startdate"] && forminputs["enddate"]) {
      error = "please enter start date";
    }
    if (!forminputs["startdate"] && !forminputs["enddate"]) {
      setErrors({});
    }
    setErrors((values) => ({ ...values, startdate: error }));
  };

  const validateEnd = () => {
    let error = "";
    if (!forminputs["enddate"] && forminputs["startdate"]) {
      error = "please enter end date";
    }
    if (!forminputs["startdate"] && !forminputs["enddate"]) {
      setErrors({});
    } else if (forminputs["enddate"] && forminputs["startdate"]) {
      let startdate = new Date(forminputs["startdate"]);
      let enddate = new Date(forminputs["enddate"]);
      if (startdate > enddate) {
        error = "end date should be greater than start date";
      }
    }
    setErrors((values) => ({ ...values, enddate: error }));
  };

  const validate = () => {
    validateStart();
    validateEnd();
    if (errors.startdate || errors.enddate) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      setFilterDates({ ...forminputs });
    }
    let stdate = new Date(forminputs.startdate);
    let endate = new Date(forminputs.enddate);
    let newData = reportsData.filter((report) => {
      // console.log(report);
      let date = new Date(report.startDate);
      if (date >= stdate && date <= endate) {
        return report;
      }
      // return;
    });
    // console.log(newData);
    setReportsData(newData);
  };
  // console.log(reportsData);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormInputs((values) => ({ ...values, [name]: value }));
  };
  const Jobs = [...reportsData];

  const headers = [
    {
      label: "JobId",
      key: "_id",
    },
    // {
    //   label: "ProviderId",
    //   key: "providerId",
    // },
    {
      label: "Title",
      key: "title",
    },
    {
      label: "StartDate",
      key: "startDate",
    },
    {
      label: "EndDate",
      key: "endDate",
    },
  ];

  const csvLink = {
    headers: headers,
    data: Jobs,
    filename: "csvfile.csv",
  };

  return (
    <>
      <div className="lg:pt-10">
        {/* form div */}
        <div>
          <form className="flex xs:flex-col sm:flex-row gap-2 justify-center xs:items-start md:items-center">
            {/* startDate */}
            <div className="flex gap-2 items-center justify-start text-md w-[300px]">
              <label htmlFor="reportstartdate" className="text-[#808080] w-[70px]">StartDate</label>
              <input
                className="p-2 border-1 border-[#2085cf] rounded"
                onBlur={validateStart}
                onChange={handleChange}
                id="reportstartdate"
                name="startdate"
                type="date"
              />
              <div className="text-danger text-center">
                {errors.startdate}
              </div>
            </div>
            {/* EndDate */}
            <div className="flex gap-2 items-center justify-start text-md w-[300px]">
              <label htmlFor="reportsenddate" className="text-[#808080] w-[70px]">EndDate</label>
              <input
                className="p-2 border-1 border-[#2085cf] rounded"
                onBlur={validateEnd}
                onChange={handleChange}
                id="reportsenddate"
                name="enddate"
                type="date"
              />
              <div className="text-danger text-center">
                {errors.enddate}
              </div>
            </div>
            {/* Submit button */}
            <div className=" text-white">
              <button onClick={handleSubmit} className="p-2 bg-[#2085cf] border-2 border-transparent hover:border-blue-700 hover:text-blue-800 hover:bg-blue-200 font-medium rounded-lg transition-all duration-200">
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* Title and CSV btn Div */}
        <div className="flex items-center justify-between pt-5 pb-3">
          {/* Title */}
          <div className="text-3xl text-[#545454] font-bold">
            <h4 className="">Reports</h4>
          </div>
          {/* Export to CSV btn*/}
          <div className="text-white font-medium">
            <button className=" px-4 py-2 bg-orange-600 hover:bg-orange-200 border-transparent border-2 hover:border-orange-600 hover:text-orange-600 rounded-lg transition-all">
              <CSVLink className="hover:text-orange-600"  {...csvLink}>
                Export to CSV
              </CSVLink>
            </button>
          </div>
        </div>
        {/* table div */}
        {reportsData.length > 0 && (
          <div className="rounded-3xl shadow-md overflow-auto">
            <table className="w-[100%]">
              <thead className="bg-gradient-to-r from-[#57b7fc] to-[#2085cf] border-b-0 ">
                <tr className="text-white border-0 text-lg">
                  <th className="font-medium px-4 py-3 whitespace-nowrap">Title</th>
                  <th className="font-medium px-4 py-3 whitespace-nowrap">Category</th>
                  <th className="font-medium px-4 py-3 whitespace-nowrap">StartDate</th>
                  <th className="font-medium px-4 py-3 whitespace-nowrap">EndDate</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((contact) => (
                  <tr className="text-[#808080] hover:bg-[#0000001f] border-2" key={contact._id}>
                    <td className="px-4 py-3 whitespace-nowrap">{contact.title}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{contact.category}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{contact.startDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{contact.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div>
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </div>
        {reportsData.length === 0 && <h3>No Reports Data!</h3>}

      </div>
      {/* <Container>
        <Row className={classes.rowStyle}>
          <Col className={`${classes.repo} col-md-3`}>
            <span className={classes.span11}>Reports</span>
          </Col>
        </Row>

        <Row className={classes.filters}>
          <Col className={`${classes.str1} ${classes}`}>
            <FormGroup controlId="reportstartdate">
              <Row>
                <Col>
                  <FormLabel className={classes.textstyl}>
                    <b>StartDate</b>
                  </FormLabel>
                </Col>
                <Col className={classes.input}>
                  <FormControl
                    className={classes.str2}
                    onBlur={validateStart}
                    onChange={handleChange}
                    name="startdate"
                    type="date"
                    placeholder="Start Date"
                  />

                  <Col className="text-danger text-center">
                    {errors.startdate}
                  </Col>
                </Col>
              </Row>
            </FormGroup>
          </Col>

          <Col className={classes.end1}>
            <FormGroup controlId="reportenddate">
              <Row>
                <Col>
                  <FormLabel className={classes.textstyl}>
                    <b>EndDate</b>
                  </FormLabel>
                </Col>
                <Col className={classes.input}>
                  <FormControl
                    className={classes.str21}
                    onBlur={validateEnd}
                    onChange={handleChange}
                    name="enddate"
                    type="date"
                    placeholder="End Date"
                  />

                  <Col className="text-danger text-center">
                    {errors.enddate}
                  </Col>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col className={classes.actions}>
            <Col className={classes.subm}>
              <button className={classes.buttonsty} onClick={handleSubmit}>
                Submit
              </button>
            </Col>
            <Col className={classes.expo}>
              <button className={classes.csvsty}>
                <CSVLink className={classes.sty11} {...csvLink}>
                  Export to CSV
                </CSVLink>
              </button>
            </Col>
          </Col>
        </Row>

        <div className={classes.tableBox}>
          <Table striped hover>
            <thead>
              <tr className={classes.tableHeader}>
                <th>Title</th>
                <th>description</th>
                <th>Category</th>
                <th>StartDate</th>
                <th>EndDate</th>
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {slice.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.title}</td>
                  <td>{contact.description}</td>
                  <td>{contact.category}</td>
                  <td>{contact.startDate}</td>
                  <td>{contact.endDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
        />
      </Container> */}
    </>
  );
}
export default Reports;
