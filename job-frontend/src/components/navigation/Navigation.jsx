import React from "react";

import { Link, useNavigate, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import classes from "./Navigation.module.css";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
// import profilepic from '../../assets/profile.png'
import profilepic2 from '../../assets/profile2.png'
import logo from '../../assets/logo.png'
import { FaBars } from "react-icons/fa";

const Navigation = ({showSideBarProps}) => {
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
    <nav className=" w-[100%] z-50 h-[50px] py-1 font-sans bg-white">
      <div className="w-full flex flex-row justify-between items-center">
        {/* <Navbar.Brand href="/dashboard" className={classes.brand}>
          Job Hunt
        </Navbar.Brand> */}

        <div
          // activeClassName={classes.active}
          className="flex gap-2 justify-center items-center text-[#0f1137] text-2xl font-medium "
          
        >
          {/* icon bars */}
          <div onClick={showSideBarProps} className="inline-block md:hidden xs:py-1">
            <div
              className="p-1 border-1 rounded-md hover:bg-[#1d81ca] hover:text-white hover:cursor-pointer transition-all "
            >
              <FaBars/>
            </div>
          </div>
          {/* icon home */}
          <div className="flex items-center">
            {/* <i className="bi bi-search"></i> */}
            <img src={logo} alt="" className="text-[#1d81ca]" width='30px' height='28px' />
            <span>JOB</span>
            <span className="text-[#1d81ca]">KOR</span>
          </div>
        </div>
        {/* <div aria-controls="navbar-dark-example" /> */}
        <div className="hidden md:inline-block" id="navbar-dark-example">
          {/* {redAuthToken.role === "Admin" && (
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
          {redAuthToken.role === "JobProvider" && (
            <div className="w-full font-sans p-1 flex gap-4 justify-center items-center text-[#0f1137] text-md tracking-tighter">
              <NavLink
                className=" border-b-2 border-b-transparent hover:border-b-[#1d81ca] hover:text-[#1d81ca] focus:text-[#1d81ca] focus:border-b-[#1d81ca] transition-all duration-300 ease-in-out"
                to="/dashboard"
              >
                Dashboard
              </NavLink>
              <NavLink
                className=" border-b-2 border-b-transparent hover:border-b-[#1d81ca] hover:text-[#1d81ca] focus:text-[#1d81ca] focus:border-b-[#1d81ca] transition-all duration-300 ease-in-out"
                to="/manage-applicants"
              >
                Applicant
              </NavLink>
              <NavLink
                className=" border-b-2 border-b-transparent hover:border-b-[#1d81ca] hover:text-[#1d81ca] focus:text-[#1d81ca] focus:border-b-[#1d81ca] transition-all duration-300 ease-in-out"
                to="/manage-jobs"
              >
                Jobs
              </NavLink>
              <NavLink
                className=" border-b-2 border-b-transparent hover:border-b-[#1d81ca] hover:text-[#1d81ca] focus:text-[#1d81ca] focus:border-b-[#1d81ca] transition-all duration-300 ease-in-out"
                to="/provider-report"

              >
                Reports
              </NavLink>
            </div>
          )} */}
          {redAuthToken.role === "JobSeeker" && (
            <div className="w-full font-sans p-1 flex gap-4 justify-center items-center text-[#0f1137] text-md tracking-tighter">
              <NavLink
                className=" border-b-2 border-b-transparent hover:border-b-[#1d81ca] hover:text-[#1d81ca] focus:text-[#1d81ca] focus:border-b-[#1d81ca] transition-all duration-300 ease-in-out"
                to="/dashboard"
              >
                Home
              </NavLink>
              {/* <NavLink
                className=" border-b-2 border-b-transparent hover:border-b-[#1d81ca] hover:text-[#1d81ca] focus:text-[#1d81ca] focus:border-b-[#1d81ca] transition-all duration-300 ease-in-out"
                to="/dashboard"
              >
                Apply
              </NavLink> */}
              <NavLink
                className=" border-b-2 border-b-transparent hover:border-b-[#1d81ca] hover:text-[#1d81ca] focus:text-[#1d81ca] focus:border-b-[#1d81ca] transition-all duration-300 ease-in-out"
                to="/appliedJobs"
              >
                Applied Jobs
              </NavLink>
              {/* <NavLink
                className=" border-b-2 border-b-transparent hover:border-b-[#1d81ca] hover:text-[#1d81ca] focus:text-[#1d81ca] focus:border-b-[#1d81ca] transition-all duration-300 ease-in-out"
                to="/"
              >
                Jobs
              </NavLink> */}
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
        </div>
        {/* DropDown Section */}
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
          <Dropdown>
            <Dropdown.Toggle className="bg-gray-200 hover:bg-[#1d81ca] text-[#0f1137] px-3 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out">
              <span>
                <img src={profilepic2} alt="" width='25px' height='25px' />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="transition-all duration-300 ease-in-out">
              <Dropdown.Item className="flex gap-2 items-center">
                <CgProfile className="text-[#1d81ca] text-lg" />
                <span>{redAuthToken.userName}</span>
              </Dropdown.Item>
              <Dropdown.Item >
                <NavLink to="/profile" className="flex gap-2 items-center">
                  <CgProfile className="text-[#1d81ca] text-lg" />
                  <p>Profile</p>
                </NavLink>
              </Dropdown.Item>
              {/* <Dropdown.Item>
                <Link className="flex gap-2 items-center" to="/change-password">
                  <RiLockPasswordLine className="text-green-600 text-lg" />
                  Change Password
                </Link>
              </Dropdown.Item> */}
              <Dropdown.Divider />
              <Dropdown.Item
                as={"button"}
                onClick={logoutHandler}
                className="flex gap-2 items-center text-red-600 "
              >
                <IoIosLogOut />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
