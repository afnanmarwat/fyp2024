import React from "react";
import { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { SiVorondesign } from "react-icons/si";
import axios from "axios";
import Jobitem from "./Job_item";
import ApplyModal from "./ApplyModal";
// import classes from "./Modalf.module.css";
import Config from "../config/Config.json";

let jobsData = [];
const Jobs = () => {
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState(false);
  const [jobSet, setjobSet] = useState("");
  const [jobs, setJobs] = useState([]);
console.log("jobs", jobs);
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
    <div className="w-[100%]">
      <header className="px-3 sm:px-5 flex gap-5 justify-center items-center  bg-[#f5f6f8] h-[100vh]">
        {/* Heading and Search Section */}
        <div className="w-full sm:w-[50%] flex flex-col xs:gap-3 sm:gap-2 md:gap-3 xl:gap-4 animate-[downtoup_1s]">
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
        </div>
        {/* image section */}
        <div className="sm:block md:w-[50%]  sm:mb-8 md:mb-10 lg:mb-[30px] xl:mb-[40px]">
          <img src="./images/JobList/joblist.svg" alt="" />
        </div>
      </header>

      <main className="p-3 sm:p-5 flex flex-col gap-5 bg-white">
        {/* Categories section*/}
        <div className="flex flex-col py-4 gap-5 justify-center xs:items-center md:items-start w-full h-full">
          {/* Categories heading */}
          <h1 className="font-bold text-[#0f1137] text-2xl  xl:text-3xl">
            Categories
          </h1>
          {/* Categories divs */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
            {/* 1 */}
            <div className="group w-[150px] xl:w-[170px] h-[130px] xl:h-[150px] bg-[#f5f6f8] hover:bg-[#1a75e8] hover:cursor-pointer hover:text-white flex flex-col gap-2 justify-center items-center  rounded-xl hover:scale-110 transition-all duration-300">
              <SiVorondesign className="group-hover:text-white text-2xl text-[#aeb4c1]" />
              <p className="group-hover:text-white text-xl text-[#0f1137]">
                Design
              </p>
            </div>
            {/* 2 */}
            <div className="group w-[150px] xl:w-[170px] h-[130px] xl:h-[150px] bg-[#f5f6f8] hover:bg-[#1a75e8] hover:cursor-pointer hover:text-white flex flex-col gap-2 justify-center items-center  rounded-xl hover:scale-110 transition-all duration-300">
              <SiVorondesign className="group-hover:text-white text-2xl text-[#aeb4c1]" />
              <p className="group-hover:text-white text-xl text-[#0f1137]">
                Development
              </p>
            </div>
            {/* 3 */}
            <div className="group w-[150px] xl:w-[170px] h-[130px] xl:h-[150px] bg-[#f5f6f8] hover:bg-[#1a75e8] hover:cursor-pointer hover:text-white flex flex-col gap-2 justify-center items-center  rounded-xl hover:scale-110 transition-all duration-300">
              <SiVorondesign className="group-hover:text-white text-2xl text-[#aeb4c1]" />
              <p className="group-hover:text-white text-xl text-[#0f1137]">
                Security
              </p>
            </div>
            {/* 4 */}
            <div className="group w-[150px] xl:w-[170px] h-[130px] xl:h-[150px] bg-[#f5f6f8] hover:bg-[#1a75e8] hover:cursor-pointer hover:text-white flex flex-col gap-2 justify-center items-center  rounded-xl hover:scale-110 transition-all duration-300">
              <SiVorondesign className="group-hover:text-white text-2xl text-[#aeb4c1]" />
              <p className="group-hover:text-white text-xl text-[#0f1137]">
                Research
              </p>
            </div>
            {/* 5 */}
            <div className="group w-[150px] xl:w-[170px] h-[130px] xl:h-[150px] bg-[#f5f6f8] hover:bg-[#1a75e8] hover:cursor-pointer hover:text-white flex flex-col gap-2 justify-center items-center  rounded-xl hover:scale-110 transition-all duration-300">
              <SiVorondesign className="group-hover:text-white text-2xl text-[#aeb4c1]" />
              <p className="group-hover:text-white text-xl text-[#0f1137]">
                Gaming
              </p>
            </div>
            {/* 6 */}
            {/* <div className="group w-[150px] xl:w-[170px] h-[130px] xl:h-[150px] bg-[#f5f6f8] hover:bg-[#1a75e8] hover:cursor-pointer hover:text-white flex flex-col gap-2 justify-center items-center  rounded-xl hover:scale-110 transition-all duration-300">
              <SiVorondesign className="group-hover:text-white text-2xl text-[#aeb4c1]" />
              <p className="group-hover:text-white text-xl text-[#0f1137]">
                Design
              </p>
            </div> */}
          </div>
        </div>
        {/* joblist section */}
        <div className="flex flex-col py-4  gap-5">
          {/* Search */}
          <form className="flex flex-col xs:gap-3 md:gap-4 lg:gap-5 sm:w-86  mx-auto">
            {/* Search Div */}
            <div className="flex flex-row justify-between items-center bg-white w-full rounded-xl sm:px-2 md:px-3 lg:px-2 py-2 shadow-xl border-1 border-[#1a75e8]">
              {/* search input */}
              <input
                className="w-full focus:outline-none focus:border-none xs:text-xs sm:text-[16px] tracking-wider"
                type="search"
                onChange={jobSearchHandler}
                placeholder="Search for job title"
              ></input>
              {/* search icon*/}
              <IoSearch className="text-[#1a75e8] xs:text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />

              {/* Search button */}
              {/* <button className="bg-[#1875e8] text-white xs:px-2 sm:px-2.5 md:px-3 lg:px-4 xl:px-6 xs:text-xs sm:text-sm md:text-lg lg:text-xl xs:py-1 md:py-2 lg:py-2.5  rounded">
                Search
              </button> */}
            </div>
            {/* Examples Div*/}
            <div className="flex items-center xs:gap-1 md:gap-3 lg:gap-4 xs:text-xs md:text-[16px] text-[#aeb4c1]">
              <p className=" border-[#aeb4c1] rounded">Example:</p>
              <p className="border-1 border-[#aeb4c1] text-nowrap rounded p-1 ">
                Front-End
              </p>
              <p className="border-1 border-[#aeb4c1] text-nowrap rounded p-1">
                Back-End
              </p>
              <p className="border-1 border-[#aeb4c1] text-nowrap rounded p-1 ">
                Designer
              </p>
            </div>
          </form>
          <h1 className="font-bold text-[#0f1137] text-2xl  xl:text-3xl">
            Featured Jobs
          </h1>
          {/* JobList and Job Type section */}
          <div className="flex flex-row gap-4">
            {/* JobList */}
            <div className="flex flex-col w-[100%] xl:w-[80%] gap-4">
              {jobs.map((jobItem) => (
                <Jobitem key={jobItem._id} item={jobItem} jobApply={jobApply} />
              ))}
            </div>
            {/* Job Type */}
            {/* <div className="hidden xl:flex flex-col gap-4 justify-center border-1 hover:border-[#1a75e8] p-3 rounded w-[20%] h-full">
              <h5 className="text-xl font-bold">Job Type</h5>
              <form className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <input type="checkbox" id="full-time"/>
                  <label htmlFor="full-time" className="text-[#aeb4c1] hover:cursor-pointer">Full-Time</label>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" id="part-time"/>
                  <label htmlFor="part-time" className="text-[#aeb4c1] hover:cursor-pointer">Part-Time</label>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" id="remote"/>
                  <label htmlFor="remote" className="text-[#aeb4c1] hover:cursor-pointer">Remote</label>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" id="internship"/>
                  <label htmlFor="internship" className="text-[#aeb4c1] hover:cursor-pointer">Internship</label>
                </div>
              </form>
            </div> */}
          </div>
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
