"use strict";
{
  let select = document.querySelector("#word");
  let options = document.querySelectorAll("#word option");
  let out = document.getElementById("out");

  let inputText = document.getElementById("inputText");
  let mText;
  let text = document.getElementById("text");
  let tText;

  inputText.addEventListener(
    "keyup",
    function () {
      let s = inputText.value;
      if (s.match(/@/) || s.match(/#/)) {
        // out.textContent = s;
        mText = s;
      } else {
        mText = "@" + s;
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
    out.innerHTML =
      "/remind" +
      " " +
      mText.trim() +
      " " +
      tText.trim() +
      " " +
      options[index].innerHTML;
  });
}
