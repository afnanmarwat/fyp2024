import React, { useEffect } from "react";

import classes from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="p-2 flex justify-end bg-[#f9f9f9]">
      {range.map((el, index) => (
        <button
          key={index}
          className={`${classes.button} ${
            page === el ? classes.activeButton : classes.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
