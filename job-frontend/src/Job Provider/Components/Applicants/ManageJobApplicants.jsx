import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TableFooter from "../Table/TableFooter";
import useTable from "../Hooks/useTable";

import SpinnerComponent from "../../../components/UI/SpinnerComponent";
import ManageApplicantItem from "./ManageApplicantItem";
import { IoSearch } from "react-icons/io5";
let applicantsdata = [];

const ManageJobApplicants = () => {
  const [page, setPage] = useState(1);
  const [applicantsData, setApplicantsData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [action, setAction] = useState(false);

  const { slice, range } = useTable(applicantsData, page, 5);

  const params = useParams();
  const jobId = params.jobId;

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/provider/view-applicants/${jobId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data.applicants;
        setShowSpinner(false);
        applicantsdata = [...data];
        setApplicantsData(data);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
  }, [jobId, action, token]);

  const searchApplicantHandler = (event) => {
    setApplicantsData(
      applicantsdata.filter((applicant) =>
        applicant.userId.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
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
              onChange={searchApplicantHandler}
              placeholder="Search Jobs"
            ></input>
            {/* search icon*/}
            <IoSearch className="text-[#2085cf] xs:text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
          </div>
        </div>
        {/* Title and Add job btn */}
        <div>
          <h5 className="text-2xl text-[#545454] py-4 font-bold whitespace-nowrap">View Applicants</h5>
        </div>
        {/* Table section*/}
        {applicantsData.length > 0 && (
          <div>
            <div className="rounded-3xl shadow-md overflow-auto">
              {showSpinner && <SpinnerComponent />}

              <table className="w-[100%]">
                <thead className="bg-gradient-to-r from-[#57b7fc] to-[#2085cf] border-b-0 ">
                  <tr className="text-white border-0 text-lg">
                    <th className="font-medium px-4 py-3 whitespace-nowrap">Job Title</th>
                    <th className="font-medium px-4 py-3 whitespace-nowrap">Resume</th>
                    <th className="font-medium px-4 py-3 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slice.map((applicantItem) => {
                    return (
                      <ManageApplicantItem
                        key={applicantItem._id}
                        applicantItem={applicantItem}
                        setAction={setAction}
                        token={token}
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

        {applicantsData.length === 0 && (
          <h3 className="text-center fw-bold">No Applicant Data!</h3>
        )}
      </div>
    </>
  );
};

export default ManageJobApplicants;
