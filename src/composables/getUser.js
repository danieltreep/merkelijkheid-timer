const getUser = async (email) => {

  let user_id;

  const data = await fetch(`http://localhost/merkelijkheid-timer/api.php?table=users&email=${encodeURI(email)}`)
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
