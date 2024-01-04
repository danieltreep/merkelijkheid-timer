import { useDataStore } from '@/stores/data'

const postData = async (table, data) => {

  const { updateTable } = useDataStore();
  
  fetch(`http://localhost/merkelijkheid-timer/api.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data, table}),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      console.log(result.message);
      updateTable(table);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

export default postData;
