import React from "react";
import UserItem from "./UserItem";
// import usersData from "../../../store/userData.json";
import { useNavigate } from "react-router-dom";
const UserTable = (props) => {
  const navigate = useNavigate();
  const recentUsersHandler = () => {
    navigate("/manage-users");
  };
  return (
    <React.Fragment>
      <div>
        {/* Heading and View Btn */}
        <div className="flex justify-between items-center py-2">
          <h4 className="text-xl font-bold text-[#686868]">
            Recent Users
          </h4>
          {/* view all btn */}
          <div>
            <button
              className="p-2 rounded-xl bg-[#2085cf] hover:bg-white hover:text-[#686868] font-medium shadow transition-all ease-in-out border-1 hover:border-[#2085cf]"
              variant="primary"
              onClick={recentUsersHandler}
            >
              View All
            </button>
          </div>
        </div>
        {/* table */}
        <div className="rounded-3xl shadow-md overflow-auto">
          <table className="w-[100%]">
            <thead className="bg-gradient-to-r from-[#57b7fc] to-[#2085cf] border-b-0">
              <tr className="text-white border-0 text-lg">
                <th className="font-medium px-4 py-3 whitespace-nowrap">Name</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">Email</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">First Created</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {props.usersData.map((user) => (
                <UserItem userInfo={user} key={user._id} />
              ))}
            </tbody>
          </table>
          {props.usersData.length === 0 && (
            <p className="text-center fw-bold">No Users data !</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserTable;
