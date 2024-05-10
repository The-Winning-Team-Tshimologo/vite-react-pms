import React, { useEffect, useState } from "react";
import "./Users.css";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
// import { fetchAllUsers } from "@/utils/fetchAllUsers";
// import { fetchUsersByRole } from "@/utils/fetchUsersByRole";
import { useNavigate } from "react-router";

// const mockSPData = [
//   {
//     id: 1,
//     firstname: "Chinmay",
//     lastname: "Sarasvati",
//     date: "23 Sep 2023",
//     time: "02:52PM",
//     img: "/src/assets/Ellipse23.png",
//   },
//   {
//     id: 2,
//     firstname: "Dina",
//     lastname: "Glenn",
//     date: "22 Sep 2023",
//     time: "01:36PM",
//     img: "/src/assets/Ellipse24.png",
//   },
//   {
//     id: 3,
//     firstname: "Izabella",
//     lastname: "Tabakova",
//     date: "29 Sep 2023",
//     time: "06:58PM",
//     img: "/src/assets/Ellipse25.png",
//   },
//   {
//     id: 4,
//     firstname: "Opi",
//     lastname: "Watihana",
//     date: "16 Sep 2023",
//     time: "02:41PM",
//     img: "/src/assets/grahamAvatar.png",
//   },
// ];

// const mockCustomerData = [
//   {
//     id: 1,
//     firstname: "Chinmay",
//     lastname: "Sarasvati",
//     date: "23 Sep 2023",
//     time: "02:52PM",
//     img: "/src/assets/Ellipse23.png",
//   },
//   {
//     id: 2,
//     firstname: "Dina",
//     lastname: "Glenn",
//     date: "22 Sep 2023",
//     time: "01:36PM",
//     img: "/src/assets/Ellipse24.png",
//   },
//   {
//     id: 3,
//     firstname: "Izabella",
//     lastname: "Tabakova",
//     date: "29 Sep 2023",
//     time: "06:58PM",
//     img: "/src/assets/Ellipse25.png",
//   },
//   {
//     id: 4,
//     firstname: "Opi",
//     lastname: "Watihana",
//     date: "16 Sep 2023",
//     time: "02:41PM",
//     img: "/src/assets/grahamAvatar.png",
//   },
// ];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetchAllUsers()
  //     .then(setUsers)
  //     // console.log("Users: ", users)
  //     .catch((err) => {
  //       console.error("Error loading users:", err);
  //       setError("Failed to load users");
  //     });

  //   fetchUsersByRole("service_provider").then((users) => {
  //     if (users) {
  //       setServiceProviders(users);
  //       console.log("Fetched service providers:", users);
  //     } else {
  //       console.log("No service providers found or an error occurred.");
  //     }
  //   });

  //   fetchUsersByRole("customer").then((users) => {
  //     if (users) {
  //       setCustomers(users);
  //       console.log("Fetched customers:", users);
  //     } else {
  //       console.log("No customers were found or an error occurred.");
  //     }
  //   });
  // }, []);


  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

useEffect(() => {
  fetch("http://localhost:8081/api/v1/admin/pending-sp", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setApplications(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);




  return (
    <div>
      <Header />
      <h2 className="users-heading">Customers</h2>
      {customers.map((profile) => (
        <div key={profile.id} className="users-card">
          <img
            className="users-card__img"
            src={profile.profilePicture}
            alt={`${profile.firstname} ${profile.lastname}`}
          />
          <p className="users-card-names">
            {profile.firstname} {profile.lastname}
          </p>
          <p className="users-card-date">{profile.date}</p>
          <p className="users-card-time">{profile.time}</p>
          <Button className="users-card__btn">View</Button>
        </div>
      ))}

      <h2 className="users-heading">Service Providers</h2>
      {serviceProviders.map((profile) => (
        <div key={profile.id} className="users-card">
          <img
            className="users-card__img"
            src={profile.profilePicture}
            alt={`${profile.firstName} ${profile.lastName}`}
          />
          <p className="users-card-names">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="users-card-date">{profile.date}</p>
          <p className="users-card-time">{profile.time}</p>
          <Button className="users-card__btn">View</Button>
        </div>
      ))}
    </div>
  );
};

export default Users;

// import React, { useEffect, useState } from 'react';

// function UserList() {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchAllUsers().then(setUsers).catch(err => {
//       console.error('Error loading users:', err);
//       setError('Failed to load users');
//     });
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>All Users</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UserList;
