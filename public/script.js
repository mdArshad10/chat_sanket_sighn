const socket = io();

socket.on("backend_connection", (data) => {
  console.log(data);

  const div = document.createElement("div");
  div.textContent = data.message;
  document.body.appendChild(div);
  console.log("Backend connected");
});
