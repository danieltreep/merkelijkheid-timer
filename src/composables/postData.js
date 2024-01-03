import getAllData from "@/composables/getAllData";

const postData = async (tableName, data) => {

  console.log(data, tableName);
  
  fetch(`http://localhost/merkelijkheid-timer/api.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data, table: tableName}),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((d) => {
      console.log(d.message);
      getAllData();
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

export default postData;
