import { useDataStore } from '@/stores/data'
import { getBaseUrl } from './functions';

const patchData = async (table, id, data) => {

  const { updateTable, triggerToast } = useDataStore();
  console.log(id, data)
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
      triggerToast(result.message, false)
      updateTable(table);
    })
    .catch((error) => {
      console.error("Error:", error);
      triggerToast(error.message, true)
    });
};

export default patchData;
