import { useDataStore } from '@/stores/data'
import { getBaseUrl } from './functions';

const deleteData = async (table, id, deliverable_id) => {

  const { updateTable, triggerToast } = useDataStore();

  fetch(getBaseUrl(), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, table, deliverable_id })
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

export default deleteData;
