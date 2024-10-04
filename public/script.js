const socket = io();

const btn = document.querySelector("button");
const inputMsg = document.querySelector("#newmsg");
const msgList = document.querySelector("#msglist");



socket.on("msg_received", (data) => {
  const listmsg = document.createElement("li");
  listmsg.innerText = data.message;
  listmsg.appendChild(listmsg);
  console.log("Backend connected");
});
