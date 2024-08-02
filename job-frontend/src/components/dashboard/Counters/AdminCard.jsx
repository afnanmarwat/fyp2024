// import classes from "./AdminCard.module.css";

const AdminCard = ({ color, ...props }) => {
  // let logoBG = { backgroundColor: color };
  return (
    <div className={` ${props.animate} flex flex-col justify-center items-start text-[#eaf4fc]  p-4 bg-gradient-to-r from-[#57b7fc] to-[#2085cf] w-[220px] h-[130px] rounded-3xl drop-shadow-xl`}>
      <h6 className="font-medium">{props.heading}</h6>
      <div className="flex gap-2 items-center text-3xl font-bold">
        <span>{props.logo}</span>
        <h4>{props.statistics}</h4>
      </div>
      <p className="">on this year</p>
    </div>
  );
};

export default AdminCard;
