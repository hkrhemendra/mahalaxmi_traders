export const getUserByEmail = async (email: string) => {
  try {
    const response = await fetch(`/api/user/?email=${email}`);
    const jsonResponse = await response.json();

    const user = jsonResponse?.data;
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    console.log("Error: ", error);
    return error
  }
};
