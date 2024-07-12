import React from "react";
import logo from "../../assets/logo.png";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";

const Footer = () => {
    return (
        <footer className=" bg-black p-3 sm:p-5">
            <div className="flex justify-between items-center">
                {/* jobkor icon */}
                <div className="flex items-center gap-1">
                    {/* icon */}
                    <span>
                        {/* <i className="bi bi-search"></i> */}
                        <img
                            src={logo}
                            alt=""
                            className="text-[#1A75E8] bg-white w-[20px] sm:w-[30px] h-full"
                        /> 
                    </span>
                    <p className="text-white text-lg sm:text-2xl">JOB
                        <span className="text-[#1A75E8]">KOR</span>
                    </p>
                </div>
                {/* icons social media */}
                <div className="flex xs:gap-1 sm:gap-4 text-lg sm:text-2xl text-white">
                    <FaLinkedinIn className=" hover:text-[#1A75E8] hover:cursor-pointer" />
                    <FaTwitter className=" hover:text-[#1A75E8] hover:cursor-pointer" />
                    <TiSocialInstagram className=" hover:text-[#1A75E8] hover:cursor-pointer" />
                </div>
            </div>

            <hr className="text-white my-3" />
            {/* lower footer section */}
            <div className="flex flex-col gap-2 md:flex-row justify-between text-white">
                <div>Copyright @ 2024 JobKor </div>
                <div className="flex flex-col sm:flex-row sm:gap-3 lg:gap-4">
                    <p className="hover:text-[#1A75E8] hover:cursor-pointer font-semibold">Privacy Policy</p>
                    <p className="hover:text-[#1A75E8] hover:cursor-pointer font-semibold">Terms of Service</p>
                    <p className="hover:text-[#1A75E8] hover:cursor-pointer font-semibold">Security & Privacy</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
