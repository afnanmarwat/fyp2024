import React from 'react'
import { RiArrowDropLeftLine } from 'react-icons/ri';
import { NavLink ,useParams} from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import ApplyModal from "./ApplyModal";
const View_job_details = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applyModule, setApplyModule] = useState(false)
    const [action, setAction] = useState(false);
    console.log('veiwjob',job)
    useEffect(() => {
        const fetchJobDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/user/job/${jobId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            setJob(response.data.job);
            setLoading(false);
          } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
            setLoading(false);
          }
        };
    
        fetchJobDetails();
      }, [jobId]);


      // apply for job 

      const jobApply = () => {
        setApplyModule(true);
      };
    return (
        <>
            <div className="md:m-10 p-3 flex flex-col gap-4">
                {/* All Jobs Btn link */}
                <NavLink to="/dashboard" className=" text-white">
                    <button className='flex gap-1 items-center bg-[#1a75e8] hover:text-black hover:bg-white border-1 hover:border-[#1a75e8] p-2 rounded-full transition-all'>
                        <RiArrowDropLeftLine className='text-2xl' />
                        All Jobs
                    </button>
                </NavLink>
                {/* job details div */}
                <div className='md:px-5 py-2 flex lg:flex-row xs:flex-col-reverse gap-5 justify-between'>
                    {/* div 1 */}
                    <div className='lg:max-w-[60%] flex flex-col gap-4'>
                        <h6 className='text-xl font-semibold text-[#1a75e8]'>Job Details</h6>
                        <h3 className='text-3xl font-bold'>{job.title}</h3>
                        <p className='text-lg'>
                            {job.description}
                        </p>
                    </div>
                    {/* div 2 */}
                    <div className='lg:max-w-[30%] h-full border-1 bg-white rounded-xl'>
                        {/* image, company name section */}
                        <div className='flex flex-col justify-center items-center m-4 pb-4 border-b-2 gap-3 text-white text-nowrap'>
                            <div className='w-[100px] h-[100px] rounded-xl overflow-hidden'>
                                <img src={`http://localhost:8080/${job?.providerImage}`} alt="" className='w-[100px] h-[100px]' />
                            </div>
                            <h5 className='text-2xl text-black font-bold'>{job.providerCompany}</h5>
                            <button className='font-semibold bg-[#1a75e8] hover:text-black hover:bg-white border-1 hover:border-[#1a75e8] px-3 py-2 rounded-full transition-all duration-300' onClick={jobApply}>Apply for this position</button>
                        </div>
                        {/* job type, Location, Start and End date */}
                        <div className='m-4 py-4 flex flex-col gap-4'>
                            {/* Job type */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Job Type</p>
                                <h6 className='font-semibold text-xl'>{job.type}</h6>
                            </div>
                            {/* Location */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Location</p>
                                <h6 className='font-semibold text-xl'>{job.location}</h6>
                            </div>
                            {/* Qualification */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Qualification</p>
                                <h6 className='font-semibold text-xl'>{job.qualification}</h6>
                            </div>
                            {/* No of Positions */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Positions</p>
                                <h6 className='font-semibold text-xl'>{job.numberOfPositions}</h6>
                            </div>
                            {/* Salary range */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Salary Range</p>
                                <h6 className='font-semibold text-xl'>{job.salaryRange}</h6>
                            </div>
                            {/* Age limit */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Age limit</p>
                                <h6 className='font-semibold text-xl'>{job.age}</h6>
                            </div>
                            {/* start Date */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Date Posted</p>
                                <h6 className='font-semibold text-xl'>{job.startDate}</h6>
                            </div>
                            {/* End Date */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Ending</p>
                                <h6 className='font-semibold text-xl'>{job.endDate}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {applyModule && (
        <ApplyModal
          job={job}
          onOpen={applyModule}
          onClose={()=>setApplyModule(false)}
          changes={setAction}
        />
      )}
        </>
    )
}

export default View_job_details;
