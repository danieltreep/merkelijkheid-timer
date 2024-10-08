import { useDataStore } from '@/stores/data'
import { getBaseUrl } from './functions';

const postData = async (table, data) => {

  const { updateTable } = useDataStore();
  
  // console.log(data)
  let id;
  
  await fetch(getBaseUrl(), {
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
    // console.log(result);
    updateTable(table);
    id = result.id
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

  return id;
};

export default postData;
