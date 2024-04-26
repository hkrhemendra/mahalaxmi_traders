export async function getUser(email: string) {
  try {
    const user = await fetch(`${process.env.NEXTAUTH_URL}/api/user?email=${email}`);
    const jsonResponse = await user.json();
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
