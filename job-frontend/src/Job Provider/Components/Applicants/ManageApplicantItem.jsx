import axios from "axios";

import classes from "./ApplicantItem.module.css";
import Config from "../../../config/Config.json";

const ApplicantItem = ({ setAction, ...props }) => {
  const applicantItemId = props.applicantItem._id;
  const token = props.token;
  const shortlistCandidateHandler = () => {
    axios
      .patch(
        `${Config.SERVER_URL + "provider/applicants/shortlist/" + applicantItemId
        }`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setAction((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rejectCandidateHandler = () => {
    axios
      .patch(
        `${Config.SERVER_URL + "provider/applicants/reject/" + applicantItemId
        }`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setAction((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewResumeHandler = () => {
    axios
      .get(
        `${Config.SERVER_URL +
        "provider/applicants/view-resume/" +
        applicantItemId
        }`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          responseType: "blob",
        }
      )
      .then((res) => {
        const file = new Blob([res.data], { type: "application/pdf" });
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr className="text-[#808080] hover:bg-[#0000001f] border-2">
      <td className="px-4 py-3 whitespace-nowrap">{props.applicantItem.userId.name}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        <button className="p-2 rounded-lg bg-[#57b7fc] hover:bg-white  
      text-black font-medium transition-all ease-in-out border-1 hover:border-[#2085cf]" onClick={viewResumeHandler}>
          View Resume
        </button>
      </td>

      <td className="flex gap-3 px-4 py-3 ">
        {/* Shorlisted btn */}
        <button
          className="w-[120px] flex gap-2 items-center border-1 border-green-700 hover:bg-[#18f97d39] text-green-700  p-2 rounded-lg transition-all ease-in-out text-lg"
          onClick={shortlistCandidateHandler}
          disabled={props.applicantItem.status === "Shortlisted" ? true : false}
        >
          <span>
            <i className="bi bi-person-check-fill"></i>
          </span>
          <span>Shortlist</span>
        </button>
        {/* Reject btn */}
        <button
          className="w-[120px] flex gap-2 items-center border-1 border-red-700 hover:bg-[#f9181839] text-red-700  p-2 rounded-lg transition-all ease-in-out text-lg"
          onClick={rejectCandidateHandler}
        >
          <span>
            <i className="bi bi-person-x-fill"></i>
          </span>
          <span>Reject</span>
        </button>
      </td>
    </tr>
  );
};

export default ApplicantItem;
