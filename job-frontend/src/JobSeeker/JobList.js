import React from "react";
import { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import Jobitem from "./Job_item";
import ApplyModal from "./ApplyModal";
import classes from "./Modalf.module.css";
import Config from "../config/Config.json";

let jobsData = [];
const Jobs = () => {
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState(false);
  const [jobSet, setjobSet] = useState("");
  const [jobs, setJobs] = useState([]);

  const closeModalHandler = () => {
    setModal(false);
  };

  const jobApply = (applyData) => {
    setModal(true);
    setjobSet(applyData);
  };

  const jobSearchHandler = (event) => {
    event.preventDefault();
    setJobs(
      jobsData.filter((job) =>
        job.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    axios
      .get(`${Config.SERVER_URL + "user/jobsAvailable"}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        jobsData = response.data.jobs;
        setJobs(response.data.jobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [action]);

  return (
    <div className="container">
      <header className="flex gap-5 justify-center items-center font-sans bg-[#f5f6fb] h-[100vh]">
        {/* Heading and Search Section */}
        <div className="w-full sm:w-[50%] flex flex-col xs:gap-3 sm:gap-2 md:gap-3 xl:gap-4">
          {/* heading */}
          <div className="w-full ">
            <h1 className="text-xl md:text-2xl lg:text-4xl 2xl:text-5xl font-extrabold text-[#0f1137] tracking-wide">
              Your <span className="text-[#1875e8]">Ultimate Job</span> <br />
              Search with <span className="text-[#1875e8]">Companion</span>
            </h1>
          </div>
          {/* text */}
          <p className=" xs:text-xs md:text-sm text-nowrap lg:text-xl xl:text-2xl font-thin tracking-widest">
            Work remotely to companies in worldwide
          </p>
          {/* Search */}
          <form className="flex flex-col  xs:gap-3 md:gap-4 lg:gap-5">
            {/* Search Div */}
            <div className="flex flex-row justify-around items-center bg-white w-full rounded-lg sm:px-2 md:px-2 lg:px-0 py-2 shadow-xl">
              {/* search icon*/}
              <IoSearch className="text-[#aeb4c1] xs:text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
              {/* search input */}
              <input
                className="focus:outline-none focus:border-none xs:text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl tracking-wider"
                type="search"
                onChange={jobSearchHandler}
                placeholder="Search for job title"
              ></input>
              {/* Search button */}
              <button className="bg-[#1875e8] text-white xs:px-2 sm:px-2.5 md:px-3 lg:px-4 xl:px-6 xs:text-xs sm:text-sm md:text-lg lg:text-xl xs:py-1 md:py-2 lg:py-2.5  rounded">
                Search
              </button>
            </div>
            {/* Examples Div*/}
            <div className="flex items-center xs:gap-1 md:gap-3 lg:gap-4 xs:text-xs md:text-md lg:text-lg xl:text-xl text-[#aeb4c1]">
              <p className=" border-[#aeb4c1] rounded">Example:</p>
              <p className="border-1 border-[#aeb4c1] text-nowrap rounded px-2 ">
                Front-End
              </p>
              <p className="border-1 border-[#aeb4c1] text-nowrap rounded px-2 ">
                Back-End
              </p>
              <p className="border-1 border-[#aeb4c1] text-nowrap rounded px-2 ">
                Designer
              </p>
            </div>
          </form>
        </div>
        {/* image section */}
        <div className="hidden sm:block md:w-[50%]  sm:mb-8 md:mb-10 lg:mb-[30px] xl:mb-[40px]">
          <img src="./images/JobList/joblist.svg" alt="" />
        </div>
      </header>
      <main>
        <div className={classes.grid}>
          {jobs.map((jobItem) => (
            <Jobitem key={jobItem._id} item={jobItem} jobApply={jobApply} />
          ))}
        </div>
        
      </main>
      {modal && (
        <ApplyModal
          job={jobSet}
          onOpen={modal}
          onClose={closeModalHandler}
          changes={setAction}
        />
      )}
    </div>
  );
};

export default Jobs;
