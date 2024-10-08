import React from "react";
import JobItem from "../../../components/dashboard/Tables/JobItem";
import { useNavigate } from "react-router-dom";

const Table1 = (props) => {
  const navigate = useNavigate();
  const recentJobsHandler = () => {
    navigate("/manage-jobs");
  };
  return (
    <React.Fragment>
      <div>
        {/* Heading and View Btn */}
        <div className="flex justify-between items-center py-2">
          <h4 className="text-xl font-bold text-[#686868]">
            Recent Jobs
          </h4>
          {/* view all btn */}
          <button className="p-2 rounded-xl bg-[#2085cf] hover:bg-white hover:text-[#686868] font-medium shadow transition-all ease-in-out border-1 hover:border-[#2085cf]" onClick={recentJobsHandler}>
            View All
          </button>
        </div>
        {/* table */}
        <div className="rounded-3xl shadow-md overflow-auto">
          <table className="w-[100%]">
            <thead className="bg-gradient-to-r from-[#57b7fc] to-[#2085cf] border-b-0 ">
              <tr className="text-white border-0 text-lg">
                <th className="font-medium px-4 py-3 whitespace-nowrap">Title</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Category</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Location</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Qualification</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Positions</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Job Type</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Salary</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">End Date</th>
              </tr>
            </thead>
            <tbody>
              {props.jobData.map((job) => (
                <JobItem jobInfo={job} key={job._id} />
              ))}
            </tbody>
          </table>
          {props.jobData.length === 0 && (
            <p className="text-center fw-bold">No jobs data!</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Table1;
