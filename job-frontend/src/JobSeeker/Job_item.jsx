// import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";
// import classes from "./Modalf.module.css";

import { NavLink } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

function Jobitem({ item, jobApply }) {
  const tag = item.title.split(" ")[0].toLowerCase();
console.log(item)
  const [buttons, setButtons] = useState(false)
  const showButtons = () => {
    setButtons(!buttons);
  }
  return (
    <>
      <div className="hidden sm:inline-block border-1 w-full rounded-lg md:rounded-xl px-4 py-3 hover:border-[#1d81ca] hover:drop-shadow-2xl hover:bg-white  hover:cursor-pointer transition-all ease-in-out duration-100">
        <div className="flex flex-col justify-center gap-3">
          {/* upper section of company div  */}
          <div className="flex flex-row items-center justify-between">
            {/* company name, title and detail section */}
            <div className="flex flex-row gap-4 items-center">
              {/* company image */}
              <div className="w-[60px] h-[60px] border-1 border-gray-600 rounded-xl overflow-hidden shadow">
              <img  src={`http://localhost:8080/${item?.providerImage}`} alt="Company Logo" />

              </div>
              {/* company div */}
              <div className="flex flex-col">
                {/* Company name */}
                <div>
                  <h5 className="text-md">{item.providerCompany}</h5>
                </div>
                {/* Job Title */}
                <div>
                  <h5 className="text-lg text-nowrap text-[#0f1137] font-semibold">{item.title}</h5>
                </div>
                {/*  jobtype , Salary, positions and location divs */}
                <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-2 text-nowrap">
                  {/* Type */}
                  <span className="bg-[#1a81ffb0] text-xs text-white xs:px-1 md:px-2 md:py-0.5 border rounded">
                    {item.type}
                  </span>
                  {/* Salary */}
                  <span className="text-[#aeb4c1] text-xs bg-[#f5f6f8] xs:px-1 md:px-2 md:py-0.5 border rounded">
                    {item.salaryRange}
                  </span>
                  {/* position */}
                  <span className="hidden md:inline-block text-[#aeb4c1] text-xs bg-[#f5f6f8] xs:px-1 md:px-2 md:py-0.5 border rounded ">
                    Position : <span className="text-[#1a75e8]">{item.numberOfPositions}</span>
                  </span>
                </div>
                {/* Location */}
                <div className="text-[#aeb4c1]">
                  {item.location}
                </div>
              </div>
            </div>
            {/* buttons section */}
            <div className="flex sm:flex-col lg:flex-row items-center sm:gap-2 md:gap-3">
              {/* View Job and Apply btn */}
              <div className="flex items-center sm:gap-2 md:gap-3">
                {/* View Job button */}
                <NavLink   to={{ pathname: `/viewJobDetails/${item._id}`, state: { item } }}>
                  <button className="text-nowrap xs:text-xs md:text-lg text-[#0f1137]  border-1 border-[#1d81ca] hover:bg-[#1d81ca] hover:text-white px-3 py-2 rounded-3xl transition-all duration-300 hover:shadow-md">View Job</button>
                </NavLink>
                {/* Apply now button */}
                {!item.status && (
                  <button className="text-nowrap xs:text-xs md:text-lg  text-[#ffff]  border-1 bg-[#1d81ca] hover:border-[#1d81ca] hover:bg-white hover:text-black px-3 py-2 rounded-3xl transition-all duration-300 hover:shadow-md" onClick={() => { jobApply(item); }}>
                    Apply Now
                  </button>
                )}
              </div>
              {/* Shortlist and Applied btn on AppliedJobList */}
              <div>
                {/* Shorlisted button */}
                {item.status && (

                  <button
                    className={`
                    ${"sm:text-sm lg:text-lg text-white text-nowrap self-end border-2 bg-[#1d81ca] px-3 py-2 rounded-xl"}
                    ${item.status === "Shortlisted" ? "text-red-600" : ""} 
                    ${item.status.includes("Applied") ? "bg-blue-600" : "bg-green-600"}} `}
                    disabled={true}
                  >
                    {item.status === "Shortlisted" ? (
                      <span>
                        Shortlisted <i className="bi bi-heart-fill"></i>
                      </span>
                    ) : (
                      item.status
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Start Date and End Date  */}
          <div className="flex flex-row justify-between gap-1 xs:text-xs md:text-sm">
            <h5 className="text-[#aeb4c1] flex flex-row items-center gap-1">
              Starting :
              <div className="border-1  px-1 rounded">
                <i className="bi bi-calendar2-check"></i> {" "}
                <span>{item.startDate}</span>
              </div>
            </h5>
            <h5 className="text-[#aeb4c1] flex flex-row items-center gap-1">
              Ending :
              <div className="border-1 px-1 rounded">
                <i className="bi bi-calendar-x"></i> {" "}
                <span>{item.endDate}</span>
              </div>
            </h5>
          </div>
        </div>




        {/* <div className={classes.images}>
        <Card.Img
          variant="top"
          src={`https://source.unsplash.com/276x170?${tag}+computer`}
        />
      </div> */}
        {/* <Card.Body>
        <Card.Title>
          <h4>{item.title} Role</h4>
        </Card.Title>
      </Card.Body> */}
        {/* <ListGroup className="list-group-flush">
        <ListGroupItem>
          <div className="d-flex justify-content-between">
            <span className="badge bg-primary ">Full time</span>
            <span className="badge bg-primary">Min.1 Year</span>
            <span className="badge bg-primary">Senior Level</span>
          </div>
        </ListGroupItem>

        <ListGroupItem>
          <Card.Text className={classes.description}>
            {item.description}
          </Card.Text>
        </ListGroupItem>
        <ListGroupItem>
          <h6>{item.category} </h6>
        </ListGroupItem>
        
        <ListGroupItem>
          <div className={classes.deadlines}>
            <div>Apply From:</div>
            <div className={classes.dates}>
              <i className="bi bi-calendar2-check"></i>
              <span className="mx-2">{item.startDate}</span>
            </div>
          </div>
        </ListGroupItem>

        <ListGroupItem>
          <div className={classes.deadlines}>
            <div>Apply Before:</div>
            <div className={classes.dates}>
              <i className="bi bi-calendar-x"></i>
              <span className="mx-2">{item.endDate}</span>
            </div>
          </div>
        </ListGroupItem>
      </ListGroup> */}
        {/* <Card.Body>
        {!item.status && (
          <Button
            variant="primary"
            onClick={() => {
              jobApply(item);
            }}
          >
            Apply Now
          </Button>
        )}
        {item.status && (
          <Button
            variant={item.status.includes("Applied") ? "secondary" : "success"}
            className={
              item.status === "Shortlisted" ? classes.shortlistedButton : ""
            }
            disabled={true}
          >
            {item.status === "Shortlisted" ? (
              <span>
                Shortlisted <i className="bi bi-heart-fill"></i>
              </span>
            ) : (
              item.status
            )}
          </Button>
        )}
      </Card.Body> */}
      </div >
      {/* for Small Device*/}
      <div className="sm:hidden inline-block border-1 w-full p-2 rounded-lg hover:border-[#1d81ca] hover:drop-shadow-2xl hover:bg-white  hover:cursor-pointer transition-all ease-in-out duration-100">
        <div className="relative flex justify-between overflow-hidden">
          {/* company name, image, title and detail section */}
          <div  onClick={()=> {return setButtons(false)}} className="flex flex-row gap-2 items-start">
            {/* company image */}
            <div className="w-[50px] h-[50px] rounded-xl overflow-hidden">
              <img src="./images/Jobitems/company1.jpeg" alt="" />
            </div>
            {/* company div */}
            <div className="flex flex-col">
              {/* Company name */}
              <div>
                <h5 className="text-md">Codics</h5>
              </div>
              {/* Job Title */}
              <div>
                <h5 className="text-lg text-[#0f1137] font-semibold">{item.title}</h5>
              </div>
              {/*  jobtype , Salary, positions and location divs */}
              <div className="text-nowrap">
                {/* Type */}
                <span className="bg-[#1a81ffb0] text-xs text-white xs:px-1 md:px-2 md:py-0.5 border rounded ">
                  Full Time
                </span>
                {/* position */}
                <span className="hidden md:inline-block text-[#aeb4c1] text-xs bg-[#f5f6f8] xs:px-1 md:px-2 md:py-0.5 border rounded ">
                  Position : <span className="text-[#1a75e8]">{item.numberOfPositions}</span>
                </span>
              </div>
              {/* Location */}
              <div className="text-[#aeb4c1]">
                {item.location}
              </div>
            </div>
          </div>
          {/* viewjob and apply job bars */}
          <div className="text-xl">
            <BsThreeDotsVertical onClick={showButtons}  className="flex py-1 hover:cursor-pointer hover:text-[#1a75e8]"/>
          </div>
          {/* View Job and Apply btn */}
          <div className={` ${buttons ? "translate-x-0" : "translate-x-[100vw]"} absolute right-1 top-6 bg-gradient-to-r from-[#3fa1e8] to-[#1d81ca] p-2 rounded transition-all duration-500`}>
            {/* buttons section */}
            <div className="flex flex-col items-center">
              {/* View Job and Apply btn */}
              <div className="flex flex-col gap-1 w-full text-white">
                {/* View Job button */}
                <NavLink to="/viewJobDetails">
                  <div onClick={() => { return setButtons(false) }} className="text-nowrap px-3 py-1 text-xs hover:text-[#1a75e8] hover:bg-white rounded transition-all duration-200">View Job</div>
                </NavLink>
                {/* Apply now button */}
                {!item.status && (
                  <div className="text-nowrap px-3 py-1 text-xs hover:text-[#1a75e8] hover:bg-white rounded transition-all duration-200" onClick={() => { jobApply(item); setButtons(false); }}>
                    Apply Now
                  </div>
                )}
              </div>
              {/* Shortlist and Applied btn on AppliedJobList */}
              <div className=" text-white">
                {/* Shorlisted button */}
                {item.status && (

                  <div
                    className={`
                    ${"text-nowrap px-3 py-1 text-xs hover:text-[#1a75e8] hover:bg-white rounded transition-all duration-200 "}
                    ${item.status === "Shortlisted" ? "text-red-600" : ""} 
                    ${item.status.includes("Applied") ? "bg-blue-600" : "bg-green-600"}} `}
                    disabled={true}
                  >
                    {item.status === "Shortlisted" ? (
                      <span>
                        Shortlisted <i className="bi bi-heart-fill"></i>
                      </span>
                    ) : (
                      item.status
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Jobitem;
