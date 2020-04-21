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
        return alert(
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

  const nextWord = document.getElementById("nextWord");
  let inTime;
  const selectTime = [
    "in 5 minutes",
    "in 10 minutes",
    "in 15 minutes",
    "in 20 minutes",
    "in 25 minutes",
    "in 30 minutes",
    "in 35 minutes",
    "in 40 minutes",
    "in 45 minutes",
    "in 50 minutes",
    "in 55 minutes",
    "in 60 minutes",
  ];
  function minutes() {
    for (let i = 0; i < selectTime.length; i++) {
      inTime = document.createElement("option");
      inTime.innerHTML = selectTime[i];
      inTime.value = `${i}`;
      nextWord.appendChild(inTime);
      // console.log(inTime.value);
    }
    nextWord.addEventListener("change", () => {
      // console.log(nextWord.value);
      const lastIndex = nextWord.value;
      // console.log(lastIndex);
      out.innerText =
        "/remind" +
        " " +
        mText.trim() +
        " " +
        tText.trim() +
        " " +
        selectTime[lastIndex];
    });
  }
  const selectHours = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];
  function hours() {
    for (let i = 0; i < selectHours.length; i++) {
      inTime = document.createElement("option");
      inTime.innerHTML = selectHours[i];
      inTime.value = `${i}`;
      nextWord.appendChild(inTime);
    }
    nextWord.addEventListener("change", () => {
      // console.log(nextWord.value);
      const lastIndex = nextWord.value;
      // console.log(lastIndex);
      out.innerText =
        "/remind" +
        " " +
        mText.trim() +
        " " +
        tText.trim() +
        " " +
        selectHours[lastIndex];
    });
  }

  select.addEventListener("change", function () {
    const index = this.value;
    if (mText === undefined) {
      alert("メンションを入力してください");
    } else if (tText === undefined) {
      alert("本文を入力してください");
    } else {
      if (index === "1") {
        minutes();
      } else if (index === "2") {
        hours();
      } else if (index === "3") {
        const date = new Date();
        // console.log(date.getDate());
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        out.innerText =
          "/remind" +
          " " +
          mText.trim() +
          " " +
          tText.trim() +
          " " +
          `${month}/${day}/${year}`;
      }
    }
  });

  copy.addEventListener("click", () => {
    out.select();
    document.execCommand("Copy");
  });
}
