const getData = async (tableName) => {

  const data = await fetch(`http://localhost/merkelijkheid-timer/api.php?table=${encodeURI(tableName)}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    // Parse id to number
    const modifiedData = data.map(item => {
      return {
        ...item,
        id: +item.id
      };
    });

  return modifiedData
};

export default getData;
