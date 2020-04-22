"use strict";
{
  let out = document.getElementById("out");

  let copy = document.getElementById("copy");

  // 作成するメッセージ内容の各をここに保存する
  let createdMessageValues = {
    sender: "",
    contents: "",
    remindType: "",
  };

  const messageSender = document.getElementById("messageSender");
  messageSender.addEventListener(
    "keyup",
    () => {
      const { value } = messageSender;
      if (value.match(/@/) || value.match(/#/)) {
        createdMessageValues.sender = value;
      } else {
        alert(
          "正しく入力してください。半角で@here,@username もしくは、#hogehoge などと記入してください"
        );
        messageSender.value = "";
      }
    },
    false
  );

  const messageContents = document.getElementById("messageContents");
  messageContents.addEventListener(
    "keyup",
    () => {
      const { value } = messageContents;
      createdMessageValues.contents = `"${value}"`;
    },
    false
  );

  const remindType = document.getElementById("remindType");
  remindType.addEventListener("change", () => {
    const { value } = remindType.type;
    createdMessageValues.remindType = value;
  });

  copy.addEventListener("click", () => {
    out.select();
    document.execCommand("Copy");
  });
}
