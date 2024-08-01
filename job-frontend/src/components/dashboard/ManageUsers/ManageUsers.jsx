import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import useTable from "../../../hooks/useTable";
import TableFooter from "../Tables/TableFooter";
import SpinnerComponent from "../../UI/SpinnerComponent";
import Config from "../../../config/Config.json";
// import data from "../../../store/userData.json";

import classes from "./ManageUsers.module.css";
import ManageUserItem from "./ManageUserItem";
import { IoSearch } from "react-icons/io5";

let userdata = [];
const ManageUsers = (props) => {
  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(true);
  const [jobSeekerList, setJobSeekerList] = useState([]);
  const [jobProviderList, setJobProviderList] = useState([]);
  const [userData, setUserData] = useState([]);
  const roleInputRef = useRef();
  console.log(jobSeekerList, jobProviderList)
  const token = localStorage.getItem("token");

  useEffect(() => {
    setShowSpinner(true);
    axios
      .get(`${Config.SERVER_URL + "admin/users/"}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data.users;

        setJobSeekerList(data.jobSeekers)
        setJobProviderList(data.jobProviders)
        setShowSpinner(false);
        // console.log(data);
        userdata = [...data];
        setUserData(data);
      });
  }, [props.changes, token]);

  const { slice, range } = useTable(jobSeekerList, page, 5);

  const roleChangeHandler = (event) => {
    if (event.target.value === "All") {
      setUserData(userdata);
    } else {
      setUserData(userdata.filter((user) => user.role === event.target.value));
    }
  };
  const searchUserHandler = (event) => {
    const role = roleInputRef.current.value;
    if (role !== "All") {
      setUserData(
        jobSeekerList.filter(
          (user) =>
            user.name
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) && user.role === role
        )
      );
    } else {
      setUserData(
        jobSeekerList.filter((user) =>
          user.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };
  const addModalHandler = () => {
    props.onShowAddUser(true);
  };
  const editModalHandler = (userData) => {
    props.onEditUser(userData);
  };

  return (
    <React.Fragment>
      <div className="lg:pt-10">
        {/* Search section  */}
        <div className="flex justify-center">
          <div className="xs:w-full sm:w-[50%] flex flex-row justify-between items-center bg-white rounded-xl xs:px-2 md:px-3 lg:px-2 py-2 shadow-xl border-1 border-[#2085cf]">
            {/* search input */}
            <input
              className="w-full focus:outline-none focus:border-none  text-md tracking-wider"
              type="search"
              id="search"
              onChange={searchUserHandler}
              placeholder="Search Users"
            ></input>
            {/* search icon*/}
            <IoSearch className="text-[#2085cf] xs:text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
          </div>
        </div>
        {/* Title and Add job btn */}
        <div className="flex justify-between items-center text-white">
          <h6 className="text-2xl text-[#545454] py-4 font-bold whitespace-nowrap">Manage Users</h6>
          <button
            id="add-new-user"
            onClick={addModalHandler}
            className="p-2 rounded-xl bg-gradient-to-r from-[#57b7fc] to-[#2085cf] hover:from-white hover:to-white  
          hover:text-[#686868] font-medium shadow transition-all ease-in-out border-1 hover:border-[#2085cf]"
          >
            Add New User
          </button>
        </div>
      </div>
      {/* table Section */}
      {showSpinner && <SpinnerComponent />}
      {jobProviderList.length > 0 && (
        <div className="rounded-3xl shadow-md overflow-auto">
          <table className="w-[100%]">
            <thead className="bg-gradient-to-r from-[#57b7fc] to-[#2085cf] border-b-0 ">
              <tr className="text-white border-0 text-lg">
                <th className="font-medium px-4 py-3 whitespace-nowrap">Name</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">Email</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">Mobile</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">role</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">gender</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">qualification</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">experience</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((user) => {
                return (
                  <ManageUserItem
                    key={user._id}
                    role={user.role}
                    userInfo={user}
                    onEdit={editModalHandler}
                    onDelete={props.onShowDelete}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      {jobSeekerList.length === 0 && (
        <h3 className="text-center fw-bold">No user Data!</h3>
      )}

      {/* <Row className={classes.rowStyle}>
        <Col className={`${classes.manageUsers} col-md-3`}>
          <span className={classes.span}>Manage Users</span>
        </Col>
        <Col className={`${classes.col} col-md-6  `}>
          <Col
            className={`${classes.search}d-flex justify-content-center align-items-center`}
          >
            <input
              type="text"
              id="search"
              placeholder="Search Users"
              className={classes.searchBar}
              onChange={searchUserHandler}
            />
          </Col>
          <Col className={classes.input}>
            <label htmlFor="type">Role</label>
            <select
              name="type"
              id="type"
              ref={roleInputRef}
              onChange={roleChangeHandler}
            >
              <option value="All">All</option>
              <option value="User">User</option>
              <option value="Job Provider">Job Provider</option>
            </select>
          </Col>
        </Col>
        <Col className={`${classes.addUser} col-md-3`}>
          <Button
            id="add-new-user"
            className={classes.button}
            onClick={addModalHandler}
          >
            Add New User
          </Button>
        </Col>
      </Row>
      {showSpinner && <SpinnerComponent />}
      {jobProviderList.length > 0 && (
        <div className={classes.tableBox}>
          <Table striped hover>
            <thead>
              <tr className={classes.tableHeader}>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>role</th>
                <th>gender</th>
                <th>qualification</th>
                <th>experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {slice.map((user) => {
                return (
                  <ManageUserItem
                    key={user._id}
                    role={user.role}
                    userInfo={user}
                    onEdit={editModalHandler}
                    onDelete={props.onShowDelete}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      {jobSeekerList.length === 0 && (
        <h3 className="text-center fw-bold">No user Data!</h3>
      )} */}
    </React.Fragment>
  );
};

export default ManageUsers;
