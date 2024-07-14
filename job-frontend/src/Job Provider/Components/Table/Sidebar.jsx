import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { MdSpaceDashboard } from "react-icons/md";
import jwtDecode from 'jwt-decode';
import { useDispatch } from "react-redux";




const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authToken = localStorage.getItem("token");
    const redAuthToken = jwtDecode(authToken);

    const logoutHandler = () => {
        dispatch({ type: "CLEARAUTHTOKEN" });
        navigate("/", { replace: true });
    };

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
                <div className='flex flex-col gap-3 w-full justify-center items-end'>
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
                                <MdSpaceDashboard className='text-xl' />
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
