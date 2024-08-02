import jwtDecode from 'jwt-decode';
import { useState, useEffect } from "react";
import { FaFacebook, FaLinkedin } from 'react-icons/fa6'
import Config from "../../config/Config.json";
import axios from "axios";

let Data = [];
const Profile = () => {
    
    const [ userProfile , setUserProfile ] = useState([]);
    const [ proProfile , setProProfile ] = useState([]);

    const authToken = localStorage.getItem("token");
    const redAuthToken = jwtDecode(authToken);

    // user Profile
    useEffect(() => {
        axios
        .get(`${Config.SERVER_URL + "user/profile"}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            Data = response.data.profile;
            setUserProfile(response.data.profile);
            console.log("userProfile : ",response.data.profile);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

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
            console.log("ProProfile : ",response.data.profile);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    
    return (
        <>
            {redAuthToken.role === "JobProvider" && (
                <div className='lg:pt-10'>
                    {/* image name and Bio div */}
                    <div className='w-full flex xs:flex-col md:flex-row xs:gap-1 md:gap-3 justify-between items-center p-3 rounded-lg bg-white shadow-md'>
                        {/* image and name part*/}
                        <div className='md:max-w-[30%] flex flex-col gap-2 p-1 justify-center items-center'>
                            {/* img */}
                            <div className='w-[150px] h-[150px] border-3 border-[#2085cf] overflow-hidden rounded-full'>
                                <img src={`http://localhost:8080/${proProfile?.profilePic}`} alt="" className='w-[150px] h-[150px]' />
                            </div>
                            {/* name */}
                            <div>
                                <h4 className='text-xl font-bold text-black'>{proProfile.company}</h4>
                            </div>
                            {/* update and message */}
                            <div className='flex gap-2'>
                                <button className='w-[100px] py-1 px-3 border-1 border-[#2085cf] bg-[#2085cf] hover:bg-white text-[#f9f9f9] hover:text-[#2085cf] rounded-sm transition-all duration-300'>Update</button>
                                <button className='w-[100px] py-1 px-3 border-1 border-[#2085cf] hover:bg-[#2085cf] text-[#2085cf] hover:text-[#f9f9f9]  rounded-sm transition-all duration-300'>Message</button>
                            </div>
                        </div>
                        {/* Bio part */}
                        <div className='md:min-w-[70%] self-start py-4 px-2'>
                            <p className='text-gray-400 font-semibold py-2'>BIO</p>
                            <p className='text-sm text-[#545454]'>{proProfile.bio}</p>
                        </div>
                    </div>
                    {/* Location URls and Social Media Links div */}
                    <div className='p-3 mt-3 rounded'>
                        {/* Location part */}
                        <div className='pb-3 border-b-2 mb-4'>
                            <p className='text-gray-400 text-md font-semibold py-1'>Location</p>
                            <p className='text-lg'>{proProfile.location}</p>
                        </div>
                        {/* Location part */}
                        <div className='pb-3 border-b-2 mb-4'>
                            <p className='text-gray-400 text-md font-semibold py-1'>Email</p>
                            <p className='text-lg'>{proProfile.email}</p>
                        </div>
                        {/* Location part */}
                        <div className='pb-3'>
                            <p className='text-gray-400 text-md font-semibold py-2'>Social media links</p>
                            <div className='flex items-center gap-2 text-[30px]'>
                                <FaFacebook className='text-blue-700' />
                                <FaLinkedin className='text-[#2085cf]' />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {redAuthToken.role === "JobSeeker" && (
                <div className='pt-3 px-10'>
                    {/* image name and Bio div */}
                    <div className='w-full flex xs:flex-col md:flex-row xs:gap-1 md:gap-3 justify-between items-center p-3 rounded-lg bg-white shadow-md'>
                        {/* image and name part*/}
                        <div className='md:max-w-[30%] flex flex-col gap-2 p-1 justify-center items-center'>
                            {/* img */}
                            <div className='w-[150px] h-[150px] border-3 border-[#2085cf] overflow-hidden rounded-full'>
                                <img src="./images/profile/my_pic.png" alt="" />
                            </div>
                            {/* name */}
                            <div>
                                <h4 className='text-xl font-bold text-black'>{userProfile.name}</h4>
                            </div>
                            {/* update and message */}
                            <div className='flex gap-2'>
                                <button className='w-[100px] py-1 px-3 border-1 border-[#2085cf] bg-[#2085cf] hover:bg-white text-[#f9f9f9] hover:text-[#2085cf] rounded-sm transition-all duration-300'>Update</button>
                                <button className='w-[100px] py-1 px-3 border-1 border-[#2085cf] hover:bg-[#2085cf] text-[#2085cf] hover:text-[#f9f9f9]  rounded-sm transition-all duration-300'>Message</button>
                            </div>
                        </div>
                        {/* Bio part */}
                        <div className='md:min-w-[70%] py-4 px-2'>
                            <p className='text-gray-400 font-semibold py-2'>About Us</p>
                            <p className='text-sm text-[#545454]'>A company with a Lot of Facilities. Work on the Websites and Mobile Application and also work on Graphic Designing. With Skills having Html, CSS, JavaScript, JS Libraries Like Reactjs Angularjs on a web development site. And a React Native and Flutter is used for Mobile Application. For Graphic Designing we used Photshop and illustrator. </p>
                        </div>
                    </div>
                    {/* Location Emails and Social Media Links div */}
                    <div className='p-3 mt-3 rounded'>
                        {/* Location part */}
                        <div className='pb-3 border-b-2 mb-4'>
                            <p className='text-gray-400 text-md font-semibold py-1'>Location</p>
                            <p className='text-lg'>Islamabad, Model Town, Street 509</p>
                        </div>
                        {/* Email part */}
                        <div className='pb-3 border-b-2 mb-4'>
                            <p className='text-gray-400 text-md font-semibold py-1'>Email</p>
                            <p className='text-lg'>{userProfile.email}</p>
                        </div>
                        {/* Contact Number part */}
                        <div className='pb-3 border-b-2 mb-4'>
                            <p className='text-gray-400 text-md font-semibold py-1'>Contact us</p>
                            <p className='text-lg'>0{userProfile.mobile}</p>
                        </div>
                        {/* Social media part */}
                        <div className='pb-3'>
                            <p className='text-gray-400 text-md font-semibold py-2'>Social media links</p>
                            <div className='flex items-center gap-2 text-[30px]'>
                                <FaFacebook className='text-blue-700' />
                                <FaLinkedin className='text-[#2085cf]' />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Profile
