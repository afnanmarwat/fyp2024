import axios from "axios";

// import classes from "./ApplicantItem.module.css";
import Config from "../../../config/Config.json";

const ShortlistItem = ({ setAction, ...props }) => {
  const applicantItemId = props.applicantItem._id;
  const token = props.token;
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
      <td className="px-4 py-3 whitespace-nowrap">{props.applicantItem.userId.email}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        {/* Resume btn */}
        <button className="p-2 rounded-lg bg-[#57b7fc] hover:bg-white  
      text-black font-medium transition-all ease-in-out border-1 hover:border-[#2085cf]"  onClick={viewResumeHandler}>
          View Resume
        </button>
      </td>
    </tr>
  );
};

export default ShortlistItem;
