const deleteSession = (session_id) => {
  fetch(
    "https://my-json-server.typicode.com/danieltreep/merkelijkheid-timer/db"
  )
    .then((res) => res.json())
    .then((db) => (data.value = db));
};
