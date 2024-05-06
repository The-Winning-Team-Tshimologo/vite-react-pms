/** @format */

import React from "react";
import { MdOutlinePinDrop, MdQuestionMark } from "react-icons/md";
import ServiceRequest from '../ServiceRequest/ServiceRequest';

const JobRequestItem = ({ ServiceRequest }) => {
	return (
		<li className='personal-request'>
			<div className='flex items-center h-auto'>
				<img
					src={ServiceRequest.customer.profilePicture}
					alt='profile pic'
					className='w-[50px] h-[50px] mr-4'
				/>
				<div className='information-details-container justify-between flex-row'>
					<div className='detail-container'>
						<div className='ml-10 font-bold'>
							{ServiceRequest.customer.firstName} {ServiceRequest.customer.lastName}
							<br />
						</div>
						<div className='address-container'>
							<div className='address-job flex'>
								<MdOutlinePinDrop
									size={24}
									className='mt-[9px] mr-4'
								/>
								{ServiceRequest.address.SreetName}
								<br />
								{ServiceRequest.address.city}
							</div>
							<div className='service-job flex'>
								<MdQuestionMark
									size={24}
									className='mr-4'
								/>{" "}
								<p className='mr-1'>Requesting </p> {ServiceRequest.category.name}
							</div>
						</div>
					</div>
					<div className='two-buttons flex items-center space-x-2'>
						<button className='bg-[#008000] mr-[10px] p-[8px]'>accept</button>
						<button className='bg-[#D9D9D9] p-[8px]'>decline</button>
					</div>
				</div>
			</div>
		</li>
	);
};

export default JobRequestItem;
