import classes from "./ProviderCard.module.css";

const ProviderCard = ({ color, ...props }) => {
  let logoBG = { backgroundColor: color };
  return (
    <div className="flex flex-col text-[#eaf4fc]  p-4 bg-gradient-to-r from-[#57b7fc] to-[#2085cf] w-[220px] h-[130px] rounded-3xl drop-shadow-xl">
      <h6 className="font-medium">{props.heading}</h6>
      <div className="flex gap-2 items-center text-3xl font-bold">
        <span>{props.logo}</span>
        <h4>{props.statistics}</h4>
      </div>
      <p className="">on this year</p>
    </div>
    // <div className={classes.card}>
    //   <div className={classes["logo-line"]}>
    //     <div className={classes.logo} style={logoBG}>
    //       {/* <img src={props.logo} alt="Total Jobs" /> */}
    //       <span>{props.logo}</span>
    //     </div>
    //     <div className={classes["card-heading"]}>
    //       <span className={classes.heading}>{props.heading}</span>
    //       <h4>{props.statistics}</h4>
    //     </div>
    //   </div>
    //   <hr />
    //   <div className={classes.caption}>
    //     <p>{props.caption}</p>
    //   </div>
    // </div>
  );
};

export default ProviderCard;
