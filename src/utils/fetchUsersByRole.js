export const fetchUsersByRole = async (role) => {
    try {
      const url = `http://localhost:5000/users?role=${encodeURIComponent(role)}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const users = await response.json();
      return users;
    } catch (error) {
      console.error(`Failed to fetch users with role ${role}:`, error);
      return null;
    }
  };
  
  // Usage:
//   fetchUsersByRole('service_provider').then(users => {
//     if (users) {
//       console.log("Fetched service providers:", users);
//     } else {
//       console.log("No service providers found or an error occurred.");
//     }
//   });
  