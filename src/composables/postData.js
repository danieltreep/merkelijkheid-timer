import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import getAllData from "@/composables/getAllData";

const postData = async (db = "sessions", data) => {
  const { currentSession } = storeToRefs(useDataStore());

  fetch(`http://localhost:3000/${db}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(currentSession.value),
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(() => getAllData())
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default postData;
