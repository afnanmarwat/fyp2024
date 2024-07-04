import React from "react";

import { Link, useNavigate, NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

const Navigation = () => {
  // const selectauthToken = (rootstate) => rootstate.authToken;
  // const authToken = useSelector(selectauthToken);
  // console.log(authToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authToken = localStorage.getItem("token");
  const redAuthToken = jwtDecode(authToken);

  const logoutHandler = () => {
    dispatch({ type: "CLEARAUTHTOKEN" });
    navigate("/", { replace: true });
  };

  return (
    // Navbar
    <div
      fixed="top"
      variant="dark"
      expand="md"
      bg="primary"
      className="fixed top-0 w-full h-[65px] p-2 bg-blue-500"
    >
      <div className="w-full flex flex-row justify-between items-center">
        {/* <Navbar.Brand href="/dashboard" className={classes.brand}>
          Job Hunt
        </Navbar.Brand> */}

        <NavLink
          // activeClassName={classes.active}
          className={classes.brand}
          to="/dashboard"
        >
          <span className={classes.logo}>
            <i className="bi bi-search"></i>
          </span>
          Job Hunt
        </NavLink>
        <div aria-controls="navbar-dark-example" />
        <div
          id="navbar-dark-example"
          className="flex justify-between items-center w-[70%]"
        >
          {redAuthToken.role === "Admin" && (
            <div className={`me-auto ${classes.pageLinks}`}>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/manage-users"
              >
                Users
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/manage-jobs"
              >
                Jobs
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/reports"
              >
                Reports
              </NavLink>
            </div>
          )}
          {redAuthToken.role === "Job Provider" && (
            <div className={`me-auto ${classes.pageLinks}`}>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/manage-applicants"
              >
                Applicant
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/manage-jobs"
              >
                Jobs
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/provider-report"
              >
                Reports
              </NavLink>
            </div>
          )}
          {redAuthToken.role === "User" && (
            <div className={`me-auto ${classes.pageLinks}`}>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/dashboard"
              >
                Apply
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/appliedJobs"
              >
                Applied Jobs
              </NavLink>
              {/* <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/ProviderReport"
                onClick={(event) => event.preventDefault()}
              >
                Reports
              </NavLink> */}
            </div>
          )}
          <div>
            {/* <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={
                  <span className={classes.username}>
                    <span className={classes.userLogo}>
                      <i className="bi bi-person-circle"></i>
                    </span>
                    {authToken.username}
                  </span>
                }
                menuVariant="light"
                align="end"
                className={classes.user}
                as={"button"}
              >
                <NavDropdown.Item>
                  <NavLink
                    className={classes.changePassword}
                    to="/change-password"
                  >
                    Change Password
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <Dropdown.Item href="/login">Logout</Dropdown.Item>
              </NavDropdown>
            </Nav> */}
            <Dropdown align={"end"} className={classes.dropDown}>
              <Dropdown.Toggle className={classes.user}>
                <span className={classes.username}>
                  <span className={classes.userLogo}>
                    <i className="bi bi-person-circle"></i>
                  </span>
                  {redAuthToken.userName}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link to="/change-password" className={classes.changePassword}>
                  Change Password
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item
                  as={"button"}
                  onClick={logoutHandler}
                  className={classes.changePassword}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
