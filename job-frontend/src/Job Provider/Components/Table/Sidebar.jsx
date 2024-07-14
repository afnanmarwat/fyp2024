import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import profilepic2 from '../../../assets/profile2.png'
import jwtDecode from 'jwt-decode';
import { useDispatch } from "react-redux";




const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dropdown , setDropdown] = useState(false);

    const authToken = localStorage.getItem("token");
    const redAuthToken = jwtDecode(authToken);

    const logoutHandler = () => {
        dispatch({ type: "CLEARAUTHTOKEN" });
        navigate("/", { replace: true });
    };

    const showProfile = () => {
        setDropdown(!dropdown);
    }

    return (
        <div>
            <div className='h-[100vh] z-50 bg-gradient-to-r from-[#3fa1e8] to-[#1d81ca]'>
                {/* sidebar home title and icon */}
                <div className='py-4 px-4'>
                    <NavLink
                        // activeClassName={classes.active}
                        className="flex gap-1 xl:gap-2 justify-start items-center text-white text-lg xl:text-2xl"
                        to="/dashboard"
                    >
                        {/* icon */}
                        <span>
                            {/* <i className="bi bi-search"></i> */}
                            <img src={logo} alt="" className="text-[#1A75E8] w-[30px] h-[30px]  xl:w-[40px] xl:h-[40px]" />
                        </span>
                        <span>JOB</span>
                        <span className="text-white">KOR</span>
                    </NavLink>
                </div>
                {/* DropDown user Profile */}
                <div className='flex flex-col w-full justify-center items-end pb-4 px-3'>
                    <div onClick={showProfile} className='w-[97%] bg-[#00000037] p-2 rounded-xl'>
                        {/* profile div */}
                        <div className='flex flex-row justify-between items-center'>
                            {/* profile image name and icon */}
                            <div className='flex gap-1 items-center'>
                                {/* profile image */}
                                <span>
                                    <img src={profilepic2} alt="" width='30px' height='30px' />
                                </span>
                                {/* name */}
                                <p className='text-[#8abadc]'>{redAuthToken.userName}</p>
                            </div>
                            {/* dropdown arrow */}
                            <span className='text-[#0000005a]'>
                                {(dropdown ? <IoMdArrowDropup/> : <IoMdArrowDropdown/>)}
                            </span>
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    <div className={` ${dropdown ? "inline-block" : "hidden"} h-full text-white w-[97%] rounded-xl p-1 bg-gradient-to-r from-[#96d3ff] to-[#0094fd] transition-all duration-500 ease-in-out`}>
                        {/* profile */}
                        <div className="flex gap-2 items-center pl-2 pr-1 py-1 hover:bg-black">
                            <CgProfile className="text-[#1A75E8] text-lg" />
                            <p>Profile</p>
                        </div>
                        {/* Change password */}
                        <NavLink className="flex gap-2 items-center pl-2 pr-1 py-1 hover:text-white hover:bg-black" to="/change-password">
                        <RiLockPasswordLine className="text-green-600 text-lg" />
                            <p>Change Password</p>
                        </NavLink>
                    </div>

                    {/* <Dropdown>
                        <Dropdown.Toggle className="w-[70%] text-[#0f1137] px-3 rounded-lg  flex items-center justify-center transition-all duration-300 ease-in-out ">
                            <span>
                                <img src={profilepic2} alt="" width='25px' height='25px' />
                            </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="transition-all duration-300 ease-in-out">
                            <Dropdown.Item className="flex gap-2 items-center">
                                <CgProfile className="text-[#1A75E8] text-lg" />
                                <span>{redAuthToken.userName}</span>
                            </Dropdown.Item>
                            <Dropdown.Item className="flex gap-2 items-center">
                                <CgProfile className="text-[#1A75E8] text-lg" />
                                <span>Profile</span>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link className="flex gap-2 items-center" to="/change-password">
                                    <RiLockPasswordLine className="text-green-600 text-lg" />
                                    Change Password
                                </Link>
                            </Dropdown.Item>
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
                    </Dropdown> */}



                </div>
                <div className='flex flex-col gap-3 w-full justify-center items-end'>
                    {/* Navlink of pages */}
                    {redAuthToken.role === "Job Provider" && (
                        <div className='flex flex-col gap-3 w-[90%] justify-center text-white'>
                            <NavLink
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca] transition ease-in-out"
                                to="/dashboard"
                            >
                                <MdSpaceDashboard className='text-xl' />
                                <p className='font-medium'>Dashboard</p>
                            </NavLink>
                            <NavLink
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca] transition ease-in-out"
                                to="/manage-applicants"
                            >
                                <MdSpaceDashboard className='text-xl' />
                                <p>Applicant</p>
                            </NavLink>
                            <NavLink
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca] transition ease-in-out"
                                to="/manage-jobs"
                            >
                                <MdSpaceDashboard className='text-xl' />
                                <p>Jobs</p>
                            </NavLink>
                            <NavLink
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca] transition ease-in-out"
                                to="/provider-report"

                            >
                                <MdSpaceDashboard className='text-xl' />
                                <p>Reports</p>
                            </NavLink>
                        </div>
                    )}

                    {/* Logout Btn */}
                    <div className='flex w-full justify-end items-center'>
                        <div className='flex flex-col gap-3 w-[90%] justify-center text-white'>
                            <button
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca] transition ease-in-out"
                                onClick={logoutHandler}
                            >
                                <IoIosLogOut className='text-xl' />
                                <p>Logout</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
