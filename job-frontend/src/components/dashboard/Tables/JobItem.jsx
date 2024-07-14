import classes from "./UserItem.module.css";
import dateFormatter from "../../../util/dateFormatter";

const JobItem = (props) => {
  let formattedCreatedAt = dateFormatter(props.jobInfo.createdAt);
  let formattedUpdatedAt = dateFormatter(props.jobInfo.updatedAt);
  console.log("Jobs", props.jobInfo)
  return (
    <tr className="text-[#808080] hover:bg-[#0000001f] border-2">
      {/* <td>{props.jobInfo.jobId}</td> */}
      <td className="px-4 py-3">{props.jobInfo.title}</td>
      <td className="px-4 py-3">{props.jobInfo.category}</td>
      <td className="px-4 py-3">{props.jobInfo.location}</td>
      <td className="px-4 py-3">{props.jobInfo.numberOfPositions}</td>
      <td className="px-4 py-3">{formattedCreatedAt}</td>
      <td className="px-4 py-3">{formattedUpdatedAt}</td>
    </tr>
  );
};

export default JobItem;
