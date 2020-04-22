"use strict";
{
  let select = document.querySelector("#word");
  let options = document.querySelectorAll("#word option");
  let out = document.getElementById("out");

  let inputText = document.getElementById("inputText");
  let mText;
  let text = document.getElementById("text");
  let tText;

  let copy = document.getElementById("copy");

  inputText.addEventListener(
    "keyup",
    function () {
      let s = inputText.value;
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
    function () {
      let s = text.value;
      // out.textContent = s;
      tText = `"${s}"`;
    },
    false
  );
  select.addEventListener("change", function () {
    let index = this.value;
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
