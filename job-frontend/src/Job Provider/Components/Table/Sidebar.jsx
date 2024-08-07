import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { MdOutlineCancel, MdSpaceDashboard } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { PiUsersThreeBold } from "react-icons/pi";
import profilepic2 from '../../../assets/profile2.png'
import jwtDecode from 'jwt-decode';
import { useDispatch } from "react-redux";
import { FaUsers } from 'react-icons/fa6';
import Config from "../../../config/Config.json";
import axios from 'axios';



let Data = [];

const Sidebar = ({ showSidebarProps }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    const [proProfile, setProProfile] = useState([]);

    const authToken = localStorage.getItem("token");
    const redAuthToken = jwtDecode(authToken);

    const logoutHandler = () => {
        dispatch({ type: "CLEARAUTHTOKEN" });
        navigate("/", { replace: true });
    };

    //   provider Profile
    useEffect(() => {
        axios
            .get(`${Config.SERVER_URL + "provider/profile"}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                Data = response.data.profile;
                setProProfile(response.data.profile);
                console.log("ProProfile : ", response.data.profile);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const showProfile = () => {
        setDropdown(!dropdown);
    }

    return (
        <div>
            <div className='min-h-[100vh] lg:fixed min-w-[23%] xl:min-w-[18%] z-50 bg-gradient-to-r from-[#3fa1e8] to-[#1d81ca]'>
                {/* cancel btn */}
                <div onClick={showSidebarProps} className='text-xl hover:cursor-pointer absolute lg:hidden w-full flex justify-end p-2 text-white'>
                    <MdOutlineCancel className='hover:text-red-600' />
                </div>
                {/* sidebar home title and icon */}
                <div className='py-4 px-4'>
                    <NavLink
                        // activeClassName={classes.active}
                        onClick={showSidebarProps}
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
                {redAuthToken.role === "JobProvider" && (
                    <div className='flex flex-col w-full justify-center items-end pb-4 px-3 hover:cursor-pointer'>
                        <div onClick={showProfile} className={` ${dropdown ? "rounded-t-xl" : "rounded-xl"} w-[97%] bg-[#00000037] hover:bg-[#00000066] p-2 transition-all duration-200`}>
                            {/* profile div */}
                            <div className='flex flex-row justify-between items-center'>
                                {/* profile image name and icon */}
                                <div className='flex gap-2 items-center'>
                                    {/* profile image */}
                                    <span className='border-1 border-[#2085cf] overflow-hidden rounded-full'>
                                        <img src={`http://localhost:8080/${proProfile?.profilePic}`} alt="" width='30px' height='30px' />
                                    </span>
                                    {/* name */}
                                    <p className='text-[#8abadc]'>{proProfile.company}</p>
                                </div>
                                {/* dropdown arrow */}
                                <span className='text-white'>
                                    {(dropdown ? <IoMdArrowDropup /> : <IoMdArrowDropdown className='' />)}
                                </span>
                            </div>
                        </div>
                        {/* Dropdown Menu */}
                        <div className={` ${dropdown ? "inline-block" : "hidden"} h-full text-white w-[97%] rounded-b-xl px-1 py-2 bg-[#00000037] transition-all duration-500 ease-in-out`}>
                            {/* profile */}
                            <NavLink to="/profile" onClick={showSidebarProps}>
                                <div className="flex gap-2 items-center p-2 hover:bg-[#f9f9f9] hover:text-[#1d81ca] rounded transition-all duration-300 ease-in-out">
                                    <CgProfile className="text-lg" />
                                    <p className='font-semibold'>Profile</p>
                                </div>
                            </NavLink>
                            {/* Change password */}
                            {/* <NavLink to="/change-password" onClick={showSidebarProps}>
                                <div className="flex gap-2 items-center p-2 hover:text-[#1d81ca] hover:bg-[#f9f9f9] rounded transition-all duration-300 ease-in-out" >
                                <RiLockPasswordLine className=" text-lg" />
                                <p className='font-semibold'>Change Password</p>
                                </div>
                            </NavLink> */}
                        </div>
                    </div>
                )}

                {/* Navlinks Divs and logout btn*/}
                <div className='flex flex-col gap-3 w-full justify-center items-end'>
                    {/* Navlink of pages */}
                    {redAuthToken.role === "Admin" && (
                        <div className='flex flex-col gap-3 w-[90%] justify-center text-white'>
                            <NavLink
                                onClick={showSidebarProps}
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca]  transition ease-in-out"
                                to="/dashboard"
                            >
                                <MdSpaceDashboard className='text-xl' />
                                <p className='font-medium'>Dashboard</p>
                            </NavLink>
                            <NavLink
                                onClick={showSidebarProps}
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca]  transition ease-in-out"
                                to="/manage-users"
                            >
                                <FaUsers className='text-xl' />
                                <p className='font-medium'>Job Seeker</p>
                            </NavLink>
                            <NavLink
                                onClick={showSidebarProps}
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca]  transition ease-in-out"
                                to="/provider"
                            >
                                <PiUsersThreeBold className='text-xl' />
                                <p className='font-medium'>Providers</p>
                            </NavLink>
                            <NavLink
                                onClick={showSidebarProps}
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca]  transition ease-in-out"
                                to="/manage-jobs"
                            >
                                <i className='bi bi-briefcase-fill text-xl'></i>
                                <p className='font-medium'>Jobs</p>
                            </NavLink>
                            <NavLink
                                onClick={showSidebarProps}
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca]  transition ease-in-out"
                                to="/reports"
                            >
                                <TbReportSearch className='text-xl' />
                                <p className='font-medium'>Reports</p>
                            </NavLink>
                        </div>
                    )}
                    {redAuthToken.role === "JobProvider" && (
                        <div className='flex flex-col gap-3 w-[90%] justify-center text-white'>
                            <NavLink
                                onClick={showSidebarProps}
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca]  transition ease-in-out"
                                to="/dashboard"
                            >
                                <MdSpaceDashboard className='text-xl' />
                                <p className='font-medium'>Dashboard</p>
                            </NavLink>
                            <NavLink
                                onClick={showSidebarProps}
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca]  transition ease-in-out"
                                to="/manage-applicants"
                            >
                                <i className='bi bi-file-earmark-person-fill text-xl'></i>
                                <p className='font-medium'>Applicant</p>
                            </NavLink>
                            <NavLink
                                onClick={showSidebarProps}
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca]  transition ease-in-out"
                                to="/manage-jobs"
                            >
                                <i className='bi bi-briefcase-fill text-xl'></i>
                                <p className='font-medium'>Jobs</p>
                            </NavLink>
                            <NavLink
                                onClick={showSidebarProps}
                                className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-[#f9f9f9] hover:text-[#1d81ca]  transition ease-in-out"
                                to="/provider-report"

                            >
                                <TbReportSearch className='text-xl' />
                                <p className='font-medium'>Reports</p>
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
                                <p className='font-medium'>Logout</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
