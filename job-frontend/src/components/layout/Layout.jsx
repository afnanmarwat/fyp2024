import React from "react";
// import classes from "./Layout.module.css";
import Navigation from "../navigation/Navigation";
// import { Container } from "react-bootstrap";
// import MyNavigation from "../navigation/MyNavigation";

const Layout = (props) => {
  return (
    <div>
      <Navigation />
      {/* <MyNavigation /> */}
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
