const getSessions = async (userid, days) => {

  let url = `http://localhost/merkelijkheid-timer/api.php?table=sessions&days=${days}`

  if (userid) {
    url += `&userid=${encodeURI(userid)}`;
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

    // console.log(data);
  
    return data
  };
  
  export default getSessions;