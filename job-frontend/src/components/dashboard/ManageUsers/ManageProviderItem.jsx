import axios from "axios";
import classes from "./ManageUserItem.module.css";
import dateFormatter from "../../../util/dateFormatter";
import Config from "../../../config/Config.json";

const ManageProviderItem = (props) => {
  const token = localStorage.getItem("token");
  const editButtonHandler = () => {
    axios
      .get(`${Config.SERVER_URL + "admin/jobprovider/" + props.userInfo._id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      .then((res) => {
        props.setCurrentUser(res.data.user);
        props.setShowEditModal(true);
      })
      .catch((err) => console.log(err));
  };
  const deleteButtonHandler = () => {
    props.onDelete(props.userInfo._id);
  };
  return (
    <tr className="text-[#808080] hover:bg-[#0000001f] border-2">
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
          <img src={`http://localhost:8080/${props.userInfo?.profilePic}`} alt="company profile pic" className="w-[80px] h-[80px]"/>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.company}</td>

      <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.email}</td>
      <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.role}</td>
      <td className="flex gap-3 px-4 py-3 ">
        <button
          className="w-[100px] flex gap-2 items-center border-2 hover:border-green-700 hover:bg-[#18f97d39] hover:text-green-700  p-2 rounded-lg transition-all ease-in-out text-lg"
          onClick={editButtonHandler}
        >
          <span>
            <i className="bi bi-pencil-fill"></i>
          </span>
          <span>Edit</span>
        </button>
        <button
          className="w-[100px] flex gap-2 items-center border-2 hover:border-red-700 hover:bg-[#f918182d] hover:text-red-700  p-2 rounded-lg transition-all ease-in-out text-lg"
          onClick={deleteButtonHandler}
        >
          <span>
            <i className="bi bi-trash3-fill"></i>
          </span>
          <span>Delete</span>
        </button>
      </td>
    </tr>
  );
};

export default ManageProviderItem;
