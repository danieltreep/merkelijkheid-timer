import { getBaseUrl } from './functions';

const getSessions = async (userid, days, isrunning) => {

  let url = `${getBaseUrl()}?table=sessions&days=${days}`;
  
  if (userid) {
    url += `&userid=${encodeURI(userid)}`;
  }

  if (isrunning) {
    url += '&isrunning=true'
  }

  console.log(url);

  const data = await fetch(url)
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

    data.forEach(item => {
      item.shared_with = JSON.parse(item.shared_with)
    });
    
    return data
  };
  
  export default getSessions;