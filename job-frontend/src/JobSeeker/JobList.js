import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
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
    <div>
      <section className="container px-3 flex gap-5 justify-center items-center font-sans bg-[#f5f6fb] h-[100vh]">
        {/* Search Section */}
        <div className="flex flex-col gap-5 w-[50%]">
          {/* heading */}
          <div className="w-full ">
            <h1 className="text-5xl font-extrabold text-[#0f1137] leading-[60px] tracking-tight">
              Your <span className="text-[#1875e8]">Ultimate Job</span> <br />
              Search with <span className="text-[#1875e8]">Companion</span>
            </h1>
          </div>
          <p className="text-2xl font-thin tracking-widest">
            Work remotely to companies in worldwide
          </p>
          {/* Search */}
          <form className="flex flex-col gap-5">
            <div className="flex flex-row justify-around items-center bg-white w-full rounded-lg py-2 shadow-xl">
              <IoSearch className="text-[#aeb4c1] text-3xl" />
              <input
                className="focus:outline-none focus:border-none text-2xl tracking-wider"
                type="search"
                onChange={jobSearchHandler}
                placeholder="Search for job title"
              ></input>
              <button className="bg-[#1875e8] text-white px-4 text-xl py-2.5 rounded">
                Search
              </button>
            </div>
            <div className="flex items-center gap-4 p-1 text-lg  text-[#aeb4c1]">
              Example:
              <p className="border-1 border-[#aeb4c1] rounded px-2 py-1">
                Front-End
              </p>
              <p className="border-1 border-[#aeb4c1] rounded px-2 py-1">
                Back-End
              </p>
              <p className="border-1 border-[#aeb4c1] rounded px-2 py-1">
                Designer
              </p>
            </div>
          </form>
        </div>
        {/* image section */}
        <div className="w-[50%] p-2 mb-5">
          <img src="./images/JobList/joblist.svg" alt="" />
        </div>
      </section>
      <Container fluid>
        <div className={classes.grid}>
          {jobs.map((jobItem) => (
            <Jobitem key={jobItem._id} item={jobItem} jobApply={jobApply} />
          ))}
        </div>
      </Container>
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
