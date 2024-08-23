import { getBaseUrl } from './functions';

const getData = async (tableName, userid) => {

  let serverUrl = `${getBaseUrl()}?table=${encodeURI(tableName)}`;

  if (userid) {
    serverUrl += `&user_id=${userid}`
  }

  const data = await fetch(serverUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    // .then((d) => console.log(d))
    .catch((error) => {
      console.error("Error:", error);
    });

    // console.log(data);

  return data
};

export default getData;
