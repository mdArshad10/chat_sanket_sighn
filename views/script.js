const socket = io();

const btn = document.querySelector("button");
const inputMsg = document.querySelector("#newmsg");
const msgList = document.querySelector("#msglist");

btn.addEventListener("click", (e) => {
  console.log("submit");

  socket.emit("msg_send", {
    msg: inputMsg.value,
  });
});

socket.on("msg_received", (data) => {
  console.log(data.msg);

  const listmsg = document.createElement("li");
  listmsg.innerText = data.msg;
  msgList.appendChild(listmsg);
  console.log("Backend connected");
});
