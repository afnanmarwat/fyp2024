import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import useTable from "../../../hooks/useTable";
import TableFooter from "../Tables/TableFooter";
import SpinnerComponent from "../../UI/SpinnerComponent";
import Config from "../../../config/Config.json";
// import data from "../../../store/userData.json";

import classes from "./ManageUsers.module.css";
import ManageProviderItem from "./ManageProviderItem";

let userdata = [];
export const ManageProvider = (props) => {
  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(true);
const [jobSeekerList,setJobSeekerList]=useState([]);
const [jobProviderList,setJobProviderList] = useState([]);
  const [userData, setUserData] = useState([]);
  const roleInputRef = useRef();
console.log(jobSeekerList,jobProviderList)
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

  const { slice, range } = useTable(jobProviderList, page, 5);

  const roleChangeHandler = (event) => {
    if (event.target.value === "All") {
      setUserData(jobProviderList);
    } else {
      setUserData(jobProviderList.filter((user) => user.role === event.target.value));
    }
  };
  const searchUserHandler = (event) => {
    const role = roleInputRef.current.value;

      setUserData(
        jobProviderList.filter(
          (user) =>
            user.name
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) && user.role === role
        )
      );
   
  };
  const addModalHandler = () => {
    props.onShowAddUser(true);
  };
  const editModalHandler = (userData) => {
    props.onEditUser(userData);
  };

  return (
    <React.Fragment>
      <Row className={classes.rowStyle}>
        <Col className={`${classes.manageUsers} col-md-3`}>
          <span className={classes.span}>Manage Provider</span>
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
            // variant="primary"
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
                <th>role</th>
                <th>Bio</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {slice.map((user) => {
                return (
                  <ManageProviderItem
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
      {jobProviderList.length === 0 && (
        <h3 className="text-center fw-bold">No user Data!</h3>
      )}
    </React.Fragment>
  );
};

// export default ManageUsers;

// export default ManageProvider;