export async function getUser(email: string) {
  try {
    const user = await fetch(`http://localhost:3000/api/user?email=${email}`);
    const jsonResponse = await user.json();
    console.log('Get User Response: ', jsonResponse);
    if (jsonResponse.status === 200) {
      return {
        data: jsonResponse.data,
      };
    } else if (jsonResponse.status === 500) {
      return null;
    }
  } catch (error) {
    console.log("Error while login: ", error);
    return {
      error: error,
    };
  }
}
