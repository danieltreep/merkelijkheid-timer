const getUser = async (email) => {

  let id;

  const data = await fetch(`http://localhost/merkelijkheid-timer/api.php?table=users&email=${encodeURI(email)}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      id = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    return id;
  
};

export default getUser;
