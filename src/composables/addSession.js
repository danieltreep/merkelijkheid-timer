import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const addSession = async (session_id) => {
  const { session } = storeToRefs(useDataStore());

  fetch(
    "https://my-json-server.typicode.com/danieltreep/merkelijkheid-timer/sessions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session.value),
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((db) => console.log(db))
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default addSession;
