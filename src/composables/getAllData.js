import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const getAllData = async () => {
  const { data } = storeToRefs(useDataStore());

  fetch(`http://localhost:3000/db`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((results) => {
      data.value = results;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default getAllData;
