import { getBaseUrl } from './functions';

const getSessions = async (userid, days, isrunning, startDate, endDate) => {

  let url = `${getBaseUrl()}?table=sessions&days=${days}`;
  
  if (userid) {
    url += `&userid=${encodeURI(userid)}`;
  }

  if (isrunning) {
    url += '&isrunning=true'
  }

  if (startDate) {
    url += `&startdate=${startDate}`
  }

  if (endDate) {
    url += `&enddate=${endDate}`
  }

  console.log('url: ', url);

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