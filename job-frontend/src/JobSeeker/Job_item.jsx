// import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";
// import classes from "./Modalf.module.css";

function Jobitem({ item, jobApply }) {
  const tag = item.title.split(" ")[0].toLowerCase();
  return (
    <div className="border-2 w-[70%] h-full rounded-xl px-3 py-4 hover:border-none hover:drop-shadow-2xl hover:bg-white hover:scale-105 hover:cursor-pointer overflow-hidden transition-all ease-in-out duration-100">
      <div className="flex flex-col justify-center gap-3">
        {/* upper section of company div  */}
        <div className="flex flex-row items-center justify-between">
          {/* company name, title and detail section */}
          <div className="flex flex-row gap-4 items-center">
            {/* company image */}
            <div className="w-[60px] h-[60px] border-1 border-gray-600 rounded-xl overflow-hidden shadow">
              <img src="./images/Jobitems/company1.jpeg" alt="" />
            </div>
            {/* company div */}
            <div className="flex flex-col ">
              {/* Company name */}
              <div>
                <h4 className="text-md">Codics</h4>
              </div>
              {/* Job Title */}
              <div>
                <h4 className="text-lg text-[#0f1137] font-semibold">{item.title} Role</h4>
              </div>
              {/* Job Salary and Location divs */}
              <div className="flex gap-4">
                {/* Location */}
                <span className="text-[#aeb4c1] bg-[#f5f6f8] px-2 py-0.5 border rounded">
                  Full Time
                </span>
                {/* Salary */}
                <span className="text-[#aeb4c1] bg-[#f5f6f8] px-2 py-0.5 border rounded">
                  $1k - $7k
                </span>
              </div>
            </div>
          </div>
          {/* buttons section */}
          <div className="flex flex-row gap-3">
            {/* View Job button */}
            <button className="text-[#0f1137]  border-2 border-blue-500 px-3  py-2 rounded-3xl transition-all duration-500 hover:shadow-md">View Job</button>
            {/* Apply now button */}
            {!item.status && (
              <button className=" text-[#ffff]  border-2 bg-blue-500 px-3 hover:border-gray-300 py-2 rounded-3xl transition-all duration-500 hover:shadow-md" onClick={() => { jobApply(item); }}>
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
        <div className="flex flex-row justify-between text-sm">
          <h5 className="text-[#aeb4c1] flex flex-row items-center gap-1">
            Starting :
            <div className="border-1 py-0.5 px-1 rounded">
              <i className="bi bi-calendar2-check"></i> {" "}
              <span>{item.startDate}</span>
            </div>
          </h5>
          <h5 className="text-[#aeb4c1] flex flex-row items-center gap-1">
            Ending :
            <div className="border-1 py-0.5 px-1 rounded">
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
