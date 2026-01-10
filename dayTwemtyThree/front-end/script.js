const userId = "1"; // simple fixed user id
async function geminiData(userMsg){
  const res = await fetch("http://localhost:1122/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userId,
      msg: userMsg,
    }),
  });

  const data = await res.json();

  // show AI reply
  chatBox.innerHTML += `<div class="bot">${data.reply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
async function sendMessage() {
  const input = document.getElementById("msgInput");
  const chatBox = document.getElementById("chatBox");

  const msg = input.value;
  if (!msg) return;

  // show user msg
  chatBox.innerHTML += `<div class="user">${msg}</div>`;
  input.value = "";
  geminiData(msg);

  // send to backend
  
}
