import dateFormatter from "../../../util/dateFormatter";
const UserItem = (props) => {
  let formattedCreatedAt = dateFormatter(props.userInfo.createdAt);
  let formattedUpdatedAt = dateFormatter(props.userInfo.updatedAt);
  return (
    <tr className="text-[#808080] hover:bg-[#0000001f] border-2">
      {/* <td>{props.userInfo.id}</td> */}
      <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.name}</td>
      <td className="px-4 py-3 whitespace-nowrap">{props.userInfo.email}</td>
      <td className="px-4 py-3 whitespace-nowrap">{formattedCreatedAt}</td>
      <td className="px-4 py-3 whitespace-nowrap">{formattedUpdatedAt}</td>
    </tr>
  );
};

export default UserItem;
