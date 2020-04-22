"use strict";
{
  let select = document.querySelector("#word");
  let options = document.querySelectorAll("#word option");
  let out = document.getElementById("out");

  let copy = document.getElementById("copy");

  // 作成するメッセージ内容の各をここに保存する
  let createdMessageValues = {
    sender: "",
    contents: "",
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

  select.addEventListener("change", function () {
    let index = this.value;
    if (mText === undefined) {
      return alert("メンションを入力してください");
    } else if (tText === undefined) {
      return alert("本文を入力してください");
    } else {
      out.innerHTML =
        "/remind" +
        " " +
        mText.trim() +
        " " +
        tText.trim() +
        " " +
        options[index].innerHTML;
    }
  });

  copy.addEventListener("click", () => {
    out.select();
    document.execCommand("Copy");
  });
}
