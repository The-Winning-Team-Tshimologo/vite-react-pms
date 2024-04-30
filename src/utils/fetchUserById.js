const fetchUserById = async (userId) => {
    try {
      const url = `http://localhost:5000/users/${encodeURIComponent(userId)}`;
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const user = await response.json();
      
      return user;
    } catch (error) {
      console.error(`Failed to fetch user with ID ${userId}:`, error);
      return null; 
    }
  };
