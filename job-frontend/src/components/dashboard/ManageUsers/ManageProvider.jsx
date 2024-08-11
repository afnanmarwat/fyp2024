import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useTable from "../../../hooks/useTable";
import TableFooter from "../Tables/TableFooter";
import SpinnerComponent from "../../UI/SpinnerComponent";
import Config from "../../../config/Config.json";
// import data from "../../../store/userData.json";

import ManageProviderItem from "./ManageProviderItem";
import { IoSearch } from "react-icons/io5";
import Modal from 'react-bootstrap/Modal';
import AddProvider from "./AddProvider";
import EditeProvider from "./EditeProvider"
export const ManageProvider = (props) => {
  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(true);
  const [jobProviderList, setJobProviderList] = useState([]);
  const [filteredJobProviderList, setFilteredJobProviderList] = useState([]);
  const token = localStorage.getItem("token");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  console.log('current user',currentUser)

  useEffect(() => {
    setShowSpinner(true);
    axios
      .get(`${Config.SERVER_URL + "admin/users/"}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data.users.jobProviders;
        setJobProviderList(data);
        setFilteredJobProviderList(data);
        setShowSpinner(false);
      });
  }, [props.changes, token]);

  const { slice, range } = useTable(filteredJobProviderList, page, 5);

  const searchUserHandler = (event) => {
    const query = event.target.value.toLowerCase();
    if (query) {
      setFilteredJobProviderList(
        jobProviderList.filter((user) =>
          user.company.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredJobProviderList(jobProviderList);
    }
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
              placeholder="Search Provider"
            ></input>
            {/* search icon*/}
            <IoSearch className="text-[#2085cf] xs:text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
          </div>
        </div>
        {/* Title and Add job btn */}
        <div className="flex justify-between items-center text-white">
          <h6 className="xs:text:sm md:text-2xl text-[#545454] py-4 font-bold whitespace-nowrap">Manage Provider</h6>
          <button
            id="add-new-user"
            onClick={handleShow}
            className="p-2 rounded-xl bg-gradient-to-r from-[#57b7fc] to-[#2085cf] hover:from-white hover:to-white  
          hover:text-[#686868] font-medium shadow transition-all ease-in-out border-1 hover:border-[#2085cf]"
          >
            Add New Provider
          </button>
        </div>
      </div>
      {/* table Section */}
      {showSpinner && <SpinnerComponent />}
      {filteredJobProviderList.length > 0 && (
        <div className="rounded-3xl shadow-md overflow-auto">
          <table className="w-[100%]">
            <thead className="bg-gradient-to-r from-[#57b7fc] to-[#2085cf] border-b-0 ">
              <tr className="text-white border-0 text-lg">
                <th className="font-medium px-4 py-3 whitespace-nowrap">Company</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">Name</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">Email</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">role</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((user) => {
                return (
                  <ManageProviderItem
                    key={user._id}
                    role={user.role}
                    userInfo={user}
                    // onEdit={editModalHandler}
                    onDelete={props.onShowDelete}
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    setCurrentUser={setCurrentUser}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      {filteredJobProviderList.length === 0 && (
        <h3 className="text-center fw-bold">No user Data!</h3>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Provider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProvider />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <EditeProvider provider={currentUser} />
        
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ManageProvider;
