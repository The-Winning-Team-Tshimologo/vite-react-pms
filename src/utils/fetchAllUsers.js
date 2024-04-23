export async function fetchAllUsers() {
  try {
    const response = await fetch("http://localhost:5000/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}
