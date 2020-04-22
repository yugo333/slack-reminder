"use strict";
{
  const select = document.querySelector("#word");
  const options = document.querySelectorAll("#word option");
  const out = document.getElementById("out");

  const inputText = document.getElementById("inputText");
  let mText;
  const text = document.getElementById("text");
  let tText;

  const copy = document.getElementById("copy");

  inputText.addEventListener(
    "keyup",
    () => {
      const s = inputText.value;
      if (s.match(/@/) || s.match(/#/)) {
        // out.textContent = s;
        mText = s;
      } else {
        inputText.value = "";
        alert(
          "正しく入力してください。半角で@here,@username もしくは、#hogehoge などと記入してください"
        );
      }
    },
    false
  );
  text.addEventListener(
    "keyup",
    () => {
      const s = text.value;
      // out.textContent = s;
      tText = `"${s}"`;
    },
    false
  );
  select.addEventListener("change", function () {
    const index = this.value;
    if (mText === undefined) {
      alert("メンションを入力してください");
    } else if (tText === undefined) {
      alert("本文を入力してください");
    } else {
      out.innerText =
        "/remind" +
        " " +
        mText.trim() +
        " " +
        tText.trim() +
        " " +
        options[index].innerText;
    }
  });

  copy.addEventListener("click", () => {
    out.select();
    document.execCommand("Copy");
  });
}
