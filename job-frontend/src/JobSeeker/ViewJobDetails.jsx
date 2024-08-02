import React from 'react'
import { RiArrowDropLeftLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const View_job_details = () => {
    const location = useLocation();
    const { job } = location.state || {};
    console.log('vvvvvvvvvvvvvvvvvvv',job);
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
                        <h3 className='text-3xl font-bold'>Frontend Developer</h3>
                        <p className='text-lg'>
                            <b>Codics</b>
                            {" "} is a lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam, sit facilis. Nihil esse beatae eveniet. Labore saepe, natus cum quas tenetur exercitationem animi repellat fuga suscipit molestiae nam repudiandae, nisi, tempora velit expedita officia iure quibusdam ullam! Aspernatur saepe non voluptas provident, recusandae vel tenetur eveniet similique iusto, assumenda nihil pariatur autem beatae itaque architecto doloremque. Nemo inventore molestiae maiores quos blanditiis tenetur, beatae odit possimus eligendi quasi nesciunt! Vitae sunt expedita mollitia quas similique earum aliquid unde aliquam dolore quia sit, iure error necessitatibus obcaecati illum dicta quis autem magni impedit aperiam. Veniam nulla illo quis quod, incidunt nobis assumenda ipsam molestias nisi nesciunt labore, minima eveniet ullam magnam sequi nam dolorum. Aperiam sequi maxime sint voluptate odio, adipisci, temporibus repellat quae saepe ad delectus reprehenderit nesciunt, fugit dolore aliquid. <br />
                            Iste amet facilis assumenda numquam perferendis at deleniti nobis magni in aspernatur! Ipsam error, dolorum placeat optio laudantium nemo facere. Consectetur eaque mollitia quae ipsum libero, vero suscipit laboriosam numquam similique beatae ratione ullam animi minima, natus cumque, inventore culpa aspernatur vel! Assumenda explicabo delectus exercitationem asperiores optio deserunt similique ipsum. Ad in modi optio odio iure perferendis. Vero aut veritatis deleniti sed, eligendi, amet distinctio dolores cupiditate aperiam, incidunt sint obcaecati accusamus hic laborum at delectus adipisci praesentium alias. Quod reprehenderit, blanditiis necessitatibus doloremque maxime quidem est id, maiores unde quas dolorum. Corporis ipsa perferendis corrupti provident animi, cumque reiciendis officia repellendus. Totam numquam ipsum delectus optio repellat a doloribus, modi necessitatibus debitis unde, dicta neque quo voluptatem suscipit soluta magni? Incidunt natus, ad delectus ipsam vero dignissimos! Repellendus facere iste, assumenda porro sit vero fuga maxime pariatur voluptatem dolorem magni, atque veniam incidunt magnam fugit excepturi. Et quia rerum accusamus asperiores adipisci, enim nobis delectus facere soluta expedita perferendis molestiae in ad similique, repellat eum at explicabo dolorum voluptatibus minus nihil.
                        </p>
                    </div>
                    {/* div 2 */}
                    <div className='lg:max-w-[30%] h-full border-1 bg-white rounded-xl'>
                        {/* image, company name section */}
                        <div className='flex flex-col justify-center items-center m-4 pb-4 border-b-2 gap-3 text-white text-nowrap'>
                            <div className='w-[100px] h-[100px] rounded-xl overflow-hidden'>
                                <img src="./images/Jobitems/company1.jpeg" alt="" className='w-[100px] h-[100px]' />
                            </div>
                            <h5 className='text-2xl text-black font-bold'>Codics</h5>
                            <button className='font-semibold bg-[#1a75e8] hover:text-black hover:bg-white border-1 hover:border-[#1a75e8] px-3 py-2 rounded-full transition-all duration-300'>Apply for this position</button>
                        </div>
                        {/* job type, Location, Start and End date */}
                        <div className='m-4 py-4 flex flex-col gap-4'>
                            {/* Job type */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Job Type</p>
                                <h6 className='font-semibold text-xl'>Full-time</h6>
                            </div>
                            {/* Location */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Location</p>
                                <h6 className='font-semibold text-xl'>Islamabad, Model Town, street 434</h6>
                            </div>
                            {/* start Date */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-gray-500'>Date Posted</p>
                                <h6 className='font-semibold text-xl'>Jul 28, 2024</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View_job_details;
