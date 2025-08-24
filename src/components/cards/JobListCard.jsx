import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageUrl } from "@/utils/getImageUrl";
import { Building2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';


const JobListCard = ({ jobId, cardColor, icon, jobTitle, description, delay, companyName, postedDate, jobType, jobLevel, jobMode, companyLogo, jobSalary, jobLocation }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <Card className="text-left border-2 border-grey-600 h-full hover:shadow-xl transition-shadow duration-300 rounded-3xl ">
            {/* <CardHeader className="pb-1">
        <div className="me-auto bg-precisedBlue/10 text-precisedBlue p-3 rounded w-fit">
          {React.createElement(icon, { size: 32 })}
        </div>
        <CardTitle className="mt-4 text-xl text-precisedDarkGray">{title}</CardTitle>
      </CardHeader> */}
            <CardContent className={`${cardColor || 'bg-stone-100'} m-2 rounded-3xl  p-3`}>
                <div className="flex justify-between">
                    <div className="rounded-full w-fit bg-white px-3 py-2 text-xs">
                        {postedDate}
                    </div>

                    {/* hover:scale-110 transition-transform duration-300 */}

                    <div onclick={{}} className="rounded-full border border-transparent w-fit bg-white text-center p-2 flex justify-center align-center hover:bg-slate-200 hover:border hover:cursor-pointer hover:border-slate-300 transition-transform duration-300 ">
                        <a >{React.createElement(icon, { size: 14 })}</a>
                    </div>
                </div>

                <div className="flex flex-col my-2">
                    <span className="text-xs my-2">{companyName}</span>
                    <div className="flex justify-between items-center">
                        <span className="text-xl " style={{ maxWidth: '75%' }}>
                            {jobTitle}
                        </span>
                        {companyLogo ? (
                            <div className="w-12 h-12 rounded-full p-1 bg-white shadow-sm flex items-center justify-center">
                                <img
                                    src={getImageUrl(companyLogo)}
                                    alt="Company Logo"
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-lg font-bold text-gray-600">
                                {/* {companyName?.charAt(0) || "C"} */}
                                <Building2 className="w-5 h-5 text-gray-500" />
                            </div>
                        )}
                    </div>
                    {/* <img
                src="src/assets/img/company_logo/default_logo.png"
                className="rounded-full w-10 h-10 p-2 object-contain bg-white"
                width={40}
                alt="Default Logo"
                style={{ maxWidth: '100%' }}
              /> */}
                    <div className="flex gap-2 my-2 flex-wrap">

                        {jobType === 'N/A' ? '' : <span className="rounded-full border border-red-400 bg-transparent text-dark px-[8px] py-[2px] text-xs">
                            {jobType}
                        </span>}

                        {jobLevel === 'N/A' ? '' : <span className="rounded-full border border-red-400 bg-transparent text-dark px-[8px] py-[2px] text-xs">
                            {jobLevel}
                        </span>}

                        {jobMode === 'N/A' ? '' : <span className="rounded-full border border-red-400 bg-transparent text-dark px-[8px] py-[2px] text-xs">
                            {jobMode}
                        </span>}

                        {jobLocation === 'N/A' ? '' : <span className="rounded-full border border-red-400 bg-transparent text-dark px-[8px] py-[2px] text-xs">
                            {jobLocation}
                        </span>}
                    </div>
                </div>
            </CardContent>
            <CardFooter >
                <div className='flex justify-between items-center w-full mt-2 flex-wrap'>
                    <div>
                        <span className="salary text-base font-bold">
                            ₹ {jobSalary}
                        </span>
                        <span className='block text-xs'>
                            {jobLocation}
                        </span>
                    </div>
                    <div>

                        <Link to={`/job-details/${jobId}`} className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out bg-precisedBlue text-white shadow-lg">
                            Details
                        </Link>

                    </div>
                </div>
            </CardFooter>
        </Card>
    </motion.div >
);

export default JobListCard;