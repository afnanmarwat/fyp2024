// import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";
// import classes from "./Modalf.module.css";

function Jobitem({ item, jobApply }) {
  const tag = item.title.split(" ")[0].toLowerCase();
  console.log("items data", item);
  return (
    <div className="border-1 w-full h-full rounded-lg md:rounded-xl sm:px-1 md:px-3 sm:py-1 md:py-4 hover:border-[#1a75e8] hover:drop-shadow-2xl hover:bg-white  hover:cursor-pointer transition-all ease-in-out duration-100">
      <div className="flex flex-col justify-center gap-3">
        {/* upper section of company div  */}
        <div className="flex flex-row items-center justify-between">
          {/* company name, title and detail section */}
          <div className="flex flex-row xs:gap-2 md:gap-4 md:items-center">
            {/* company image */}
            <div className="w-[50px] h-full md:w-[60px] md:h-[60px] border-1 border-gray-600 rounded-xl overflow-hidden shadow">
              <img src="./images/Jobitems/company1.jpeg" alt="" />
            </div>
            {/* company div */}
            <div className="flex flex-col  ">
              {/* Company name */}
              <div>
                <h5 className="text-xs md:text-md">Codics</h5>
              </div>
              {/* Job Title */}
              <div>
                <h5 className="text-sm md:text-lg text-nowrap text-[#0f1137] font-semibold">{item.title}</h5>
              </div>
              {/*  jobtype , Salary, positions and location divs */}
              <div className="xs:grid xs:grid-cols-2 lg:flex lg:flex-row gap-2 text-nowrap">
                {/* Type */}
                <span className="bg-[#1a81ffb0] text-xs text-white xs:px-1 md:px-2 md:py-0.5 border rounded ">
                  Full Time
                </span>
                {/* Salary */}
                <span className="text-[#aeb4c1] text-xs bg-[#f5f6f8] xs:px-1 md:px-2 md:py-0.5 border rounded ">
                  {item.salaryRange}
                </span>
                {/* Location */}
                <span className="text-[#aeb4c1] text-xs bg-[#f5f6f8] xs:px-1 md:px-2 md:py-0.5 border rounded ">
                  {item.location}
                </span>
                {/* position */}
                <span className="text-[#aeb4c1] text-xs bg-[#f5f6f8] xs:px-1 md:px-2 md:py-0.5 border rounded ">
                  Position : <span className="text-[#1a75e8]">{item.numberOfPositions}</span>
                </span>
              </div>
            </div>
          </div>
          {/* buttons section */}
          <div className="flex xs:flex-col md:flex-row xs:gap-1 md:gap-3">
            {/* View Job button */}
            <button className="text-nowrap xs:text-xs md:text-lg text-[#0f1137]  border-2 border-[#1a75e8] hover:bg-[#1a75e8] hover:text-white sm:px-1 md:px-3 sm:py-1 md:py-2 rounded-3xl transition-all duration-300 hover:shadow-md">View Job</button>
            {/* Apply now button */}
            {!item.status && (
              <button className="text-nowrap xs:text-xs md:text-lg  text-[#ffff]  border-2 bg-[#1a75e8] hover:border-[#1a75e8] hover:bg-white hover:text-black sm:px-1 md:px-3 sm:py-1 md:py-2 rounded-3xl transition-all duration-300 hover:shadow-md" onClick={() => { jobApply(item); }}>
                Apply Now
              </button>
            )}
            {/* Shorlisted button */}
            {item.status && (

              <button
                className={`
                ${"text-lg text-[#0f1137] font-semibold border-2 border-gray-200 px-3 py-1 rounded-3xl"}
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
        {/* Start Date and End Date  */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-1 xs:text-xs md:text-sm">
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
  );
}

export default Jobitem;
