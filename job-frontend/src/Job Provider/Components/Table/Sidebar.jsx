import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { MdSpaceDashboard } from "react-icons/md";


const Sidebar = () => {
    return (
        <div>
            <div className='h-[100vh] w-[15%] z-50 bg-gradient-to-r from-[#3fa1e8] to-[#1d81ca] fixed top-0 border-l-2  rounded-l-3xl shadow-md'>
                <div className='py-4 px-4'>
                    <NavLink
                        // activeClassName={classes.active}
                        className="flex gap-2 justify-start items-center text-white text-2xl"
                        to="/dashboard"
                    >
                        {/* icon */}
                        <span>
                            {/* <i className="bi bi-search"></i> */}
                            <img src={logo} alt="" className="text-[#1A75E8] w-[40px] h-[40px]" />
                        </span>
                        <span>JOB</span>
                        <span className="text-white">KOR</span>
                    </NavLink>
                </div>
                <div className='flex flex-col w-full justify-center items-end'>
                    <div className='flex flex-col w-[90%] justify-center text-white'>

                        <NavLink
                            className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-white hover:text-[#1d81ca] transition duration-300 ease-in-out"
                            to="/dashboard"
                        >
                            <MdSpaceDashboard className='text-xl' />
                            <p className='font-medium'>Dashboard</p>
                        </NavLink>
                        <NavLink
                            className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-white hover:text-[#1d81ca] transition duration-300 ease-in-out"
                            to="/manage-applicants"
                        >
                            <MdSpaceDashboard className='text-xl' />
                            <p>Applicant</p>
                        </NavLink>
                        <NavLink
                            className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-white hover:text-[#1d81ca] transition duration-300 ease-in-out"
                            to="/manage-jobs"
                        >
                            <MdSpaceDashboard className='text-xl' />
                            <p>Jobs</p>
                        </NavLink>
                        <NavLink
                            className="flex items-center gap-3 px-2.5 py-2.5 rounded-l-md hover:bg-white hover:text-[#1d81ca] transition duration-300 ease-in-out"
                            to="/provider-report"

                        >
                            <MdSpaceDashboard className='text-xl' />
                            <p>Reports</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
