import { useDataStore } from '@/stores/data'

const deleteData = (table, id) => {

  const { updateTable } = useDataStore();

  fetch('http://localhost/merkelijkheid-timer/api.php', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, table })
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
      console.error("Error:", error);
    });
};

export default deleteData;
