import { getBaseUrl } from './functions';

const getData = async (tableName) => {

  const serverUrl = `${getBaseUrl()}?table=${encodeURI(tableName)}`;

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
