import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const createSession = async (session_id) => {
  const { session } = storeToRefs(useDataStore());

  fetch(
    "https://my-json-server.typicode.com/danieltreep/merkelijkheid-timer/sessions",
    {
      method: "POST",
      body: JSON.stringify(session),
    }
  )
    .then((res) => res.json())
    .then((db) => console.log(db));
};

export default createSession;
