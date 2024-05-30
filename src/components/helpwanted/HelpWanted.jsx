/** @format */

import { MdOutlinePinDrop, MdQuestionMark } from "react-icons/md";
import dummyData from "./dummyDataWithRate.jsx";
import { IoMdStar } from "react-icons/io";
import { yellow } from "@mui/material/colors";
import { useNavigate } from "react-router";
const HelpWanted = ({ SystemWide }) => {
	const navigate = useNavigate();

	const handleClickEvent = () => {
		navigate(`/customer-profile/${SystemWide.serviceId}/${SystemWide.userId}/${SystemWide.userName}`);
	};

	return (
		<li
			className='personal-request w-[491px] bg-[#D9D9D9] border-none	cursor-pointer'
			onClick={handleClickEvent}
		>
			<div className='flex items-center h-auto'>
				<img
					src={`data:image/png;base64,${SystemWide.pictures}`}
					alt='profile pic'
					className='w-[50px] h-[50px] mr-4 rounded-full'
				/>
				<div className='information-details-container  flex-row'>
					<div className='detail-container'>
						<div className='ml-10 font-bold'>
							{SystemWide.firstName} {SystemWide.lastName}
							<br />
						</div>
						<div className='address-container'>
							<div className='address-job flex'>
								<MdOutlinePinDrop
									size={24}
									className='mt-[9px] mr-4'
								/>
								{SystemWide.address}
								<br />
								{SystemWide.city}
							</div>
							<div className='service-job flex'>
								<MdQuestionMark
									size={24}
									className='mr-4'
								/>{" "}
								<p className='mr-1'>Requesting </p> {SystemWide.category}
							</div>
						</div>
					</div>
					<div className='two-buttons flex items-center space-x-4'>
						<div className='rating font-bold'>{SystemWide.rating}/5</div>{" "}
						{/* Display the rating */}
						<IoMdStar
							size={26}
							style={{
								color: "#E5B80B",
								backgroundColor: "#C4C4C4",
								borderRadius: "50%",
							}}
						/>
					</div>
				</div>
			</div>
		</li>
	);
};
export default HelpWanted;
