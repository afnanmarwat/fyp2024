import { useNavigate } from "react-router-dom";

const ApplicantItem = (props) => {
  const navigate = useNavigate();
  const viewApplicantsHandler = () => {
    navigate(`/manage-applicants/${props.jobItem._id}`);
  };
  const viewShortlistsHandler = () => {
    navigate(`/view-shortlists/${props.jobItem._id}`);
  };
  return (
    <tr className="text-[#808080] hover:bg-[#0000001f] border-2">
      <td className="px-4 py-3 whitespace-nowrap">{props.jobItem.title}</td>

      <td className="px-4 py-3 whitespace-nowrap">
        <button
          className="flex gap-2 items-center border-2 hover:border-blue-700 hover:bg-[#186af939] hover:text-blue-700  p-2 rounded-lg transition-all ease-in-out"
          onClick={viewApplicantsHandler}
        >
          <span className="">
            <i className="bi bi-person-bounding-box"></i>
          </span>
          <span>View Applicants</span>
        </button>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <button
          className="flex gap-2 items-center border-2 hover:border-green-700 hover:bg-[#18f97d39] hover:text-green-700  p-2 rounded-lg transition-all ease-in-out"
          onClick={viewShortlistsHandler}
        >
          <span>
            <i className="bi bi-person-check-fill"></i>
          </span>
          <span>View Shortlisted</span>
        </button>
      </td>
    </tr>
  );
};

export default ApplicantItem;
