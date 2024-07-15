import { useDataStore } from '@/stores/data'
import { getBaseUrl } from './functions';

const patchData = async (table, id, data) => {

  // console.log(data)

  const { updateTable } = useDataStore();

  const serverUrl = 'https://merkelijkheid.today/api.php';
  const localUrl = 'http://localhost/merkelijkheid-timer/api.php';

  fetch(getBaseUrl(), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data, table, id}),
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

export default patchData;
