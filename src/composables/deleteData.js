import getAllData from "@/composables/getAllData";

const deleteData = (db, id) => {
  fetch(`http://localhost:3000/${db}/${id}`, {
    method: "DELETE",
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

export default deleteData;
