import { getBaseUrl } from './functions';

const getUser = async (email) => {
  const url = `${getBaseUrl()}?table=users&email=${encodeURI(email)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Return user_id if it exists, otherwise return null
    return data.user_id ? data.user_id : null;
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null in case of error
  }
};

export default getUser;
