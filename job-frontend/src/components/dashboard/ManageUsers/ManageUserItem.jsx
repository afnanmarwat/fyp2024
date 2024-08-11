import axios from "axios";
import Config from "../../../config/Config.json";

const ManageUserItem = (props) => {
  console.log(`ManageUserItem`,props.userInfo);
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("token");

  const editButtonHandler = () => {
    // props.setShowEditModal(true);
    console.log("Edit",props.userInfo);
    // Fetch user data if not already available
    axios
      .get(`${Config.SERVER_URL + "admin/jobseeker/" + props.userInfo._id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        props.setCurrentUser(res.data.user);
        props.setShowEditModal(true);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const deleteButtonHandler = () => {
    props.onDelete(props.userInfo._id);
  };

  // const handleEditUser = (updatedUser) => {
  //   axios
  //     .put(`${Config.SERVER_URL + "admin/jobseeker/" + updatedUser._id}`, updatedUser, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("User updated successfully:", res.data);
  //       props.setShowEditModal(false);
  //       props.onEdit(res.data.user); // Notify parent about the update
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <tr className="text-[#808080] hover:bg-[#0000001f] border-2">
        <td className="px-4 py-3 whitespace-nowrap"> 
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
          <img src={`http://localhost:8080/${props.userInfo?.profilePic}`} alt="User Picture" className='w-[80px] h-[80px]' />
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.name}</td>
        <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.email}</td>
        <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.mobile}</td>
        <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.role}</td>
        <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.gender}</td>
        <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.qualification}</td>
        <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.experience}</td>
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

    
      
    
    </>
  );

};

export default ManageUserItem;
