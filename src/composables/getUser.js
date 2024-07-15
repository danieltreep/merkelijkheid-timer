import { getBaseUrl } from './functions';

const getUser = async (email) => {

  let user_id;

  const url = `${getBaseUrl()}?table=users&email=${encodeURI(email)}`;

  const data = await fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      user_id = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    return user_id;
  
};

export default getUser;
