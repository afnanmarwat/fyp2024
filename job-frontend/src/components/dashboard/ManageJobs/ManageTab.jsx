import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Container } from "react-bootstrap";
import axios from "axios";
// import { BsSearch } from "react-icons/bs";

// import data from "../../../store/jobData.json";
import TableFooter from "../Tables/TableFooter";
import useTable from "../../../hooks/useTable";
import SpinnerComponent from "../../UI/SpinnerComponent";
import Config from "../../../config/Config.json";
import classes from "./ManageTab.module.css";
import JobItem from "./JobItem";
import { IoSearch } from "react-icons/io5";

const ManageTab = (props) => {
  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState([]);
  const [staticJobData, setStaticJobData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  const { slice, range } = useTable(jobData, page, 5);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${Config.SERVER_URL + "admin/jobs"}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const jobData = response.data.jobs;
      setShowSpinner(false);

      console.log('hiii',jobData);
      setJobData(jobData);
      setStaticJobData(jobData);
    };
    getData();
  }, [props.changes, token]);

  const searchJobHandler = (event) => {
    setJobData(
      staticJobData.filter((job) =>
        job.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  const addModalHandler = () => {
    props.onShowAddUser({ show: true, edit: false });
  };
  const editModalHandler = (jobData) => {
    props.onEditJob(jobData);
  };
  return (
    <>
      <div className="lg:pt-10">
        {/* Search section  */}
        <div className="flex justify-center">
          <div className="xs:w-full sm:w-[50%] flex flex-row justify-between items-center bg-white rounded-xl xs:px-2 md:px-3 lg:px-2 py-2 shadow-xl border-1 border-[#2085cf]">
            {/* search input */}
            <input
              className="w-full focus:outline-none focus:border-none  text-md tracking-wider"
              type="search"
              id="search"
              onChange={searchJobHandler}
              placeholder="Search Jobs"
            ></input>
            {/* search icon*/}
            <IoSearch className="text-[#2085cf] xs:text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
          </div>
        </div>
        {/* Title and Add job btn */}
        <div className="flex justify-between items-center text-white">
          <h6 className="text-2xl text-[#545454] py-4 font-bold whitespace-nowrap">Manage Jobs</h6>
          <button
            id="add-new-user"
            onClick={addModalHandler}
            className="p-2 rounded-xl bg-gradient-to-r from-[#57b7fc] to-[#2085cf] hover:from-white hover:to-white  
          hover:text-[#686868] font-medium shadow transition-all ease-in-out border-1 hover:border-[#2085cf]"
          >
            Add New Job
          </button>
        </div>
      </div>

      {/* Table section*/}
      {showSpinner && <SpinnerComponent />}
      {jobData.length > 0 && (
        <div>
          <div className="rounded-3xl shadow-md overflow-auto">
            <table className="w-[100%]">
              <thead className="bg-gradient-to-r from-[#57b7fc] to-[#2085cf] border-b-0 ">
                <tr className="text-white border-0 text-lg">
                  <th className="font-medium px-4 py-3 whitespace-nowrap">Job Title</th>
                  <th className="font-medium px-4 py-3 whitespace-nowrap">Qualification</th>
                  <th className="font-medium px-4 py-3 whitespace-nowrap">Salary </th>
                  <th className="font-medium px-4 py-3 whitespace-nowrap">Job Type</th>
                  <th className="font-medium px-4 py-3 whitespace-nowrap">Positions</th>
                  <th className="font-medium px-4 py-3 whitespace-nowrap">End Date</th>
                  <th className="font-medium px-4 py-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((job) => {
                  return (
                    <JobItem
                      token={token}
                      key={job._id}
                      jobInfo={job}
                      onEdit={editModalHandler}
                      onDelete={props.onShowDelete}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </div>
      )}

      {/* <Container/> */}
      {jobData.length === 0 && (
        <h3 className="text-center fw-bold">No jobs Data!</h3>
      )}
    </>
  );
};

export default ManageTab;
