import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { VscTools } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";

const ProfileCard = ({ profile, handleClick }) => {


  return (
		<div
			className='profile-card'
			key={profile.id}
			onClick={() => {
				handleClick(profile);
			}}
		>
			<div className='profile-header'>
				<img
					src={profile.profilePicture}
					alt={profile.name}
				/>
				<div>
					{/* <h2>{profile.name}</h2>
              <p>{profile.address}</p>
              <p>{profile.job}</p> */}

					<table className=''>
						<tbody>
							<tr>
								<td></td>
								<td>
									{profile.firstName} {profile.lastName}
								</td>
							</tr>
							<tr>
								<td className='table__Icons__container'>
									<MdOutlineLocationOn className='table__Icons' />{" "}
								</td>
								<td>
									{profile.address.city} <br /> {profile.address.streetName}
								</td>
							</tr>
							<tr>
								<td className='table__Icons'>
									<VscTools className='table__Icons' />{" "}
								</td>
								<td>{profile.category}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='profile-rating'>
					<p>{profile.rating}</p>
					{/* <FontAwesomeIcon icon={faStar} /> */}
					<div className='rating__icon__container'>
						{/* <img src="src/assets/image.png" /> */}
						<IoIosStar className='rating__icon' />
					</div>
				</div>
			</div>
			{/* <button>{profile.job}</button> */}
		</div>
	);
};

export default ProfileCard;
