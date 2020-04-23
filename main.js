"use strict";
{
  const select = document.querySelector("#word");
  const nextForm = document.getElementById("nextForm");
  const out = document.getElementById("out");

  const inputText = document.getElementById("inputText");
  let mText;
  const text = document.getElementById("text");
  let tText;

  const copy = document.getElementById("copy");

  //上部メンション入力欄
  inputText.addEventListener(
    "change",
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

  //中部メイン内容欄
  text.addEventListener(
    "keyup",
    () => {
      const s = text.value;
      // out.textContent = s;
      tText = `"${s}"`;
    },
    false
  );

  //セレクタークリックした後の動き
  let index;
  select.addEventListener("change", function () {
    index = this.value;
    if (mText === undefined) {
      alert("メンションを入力してください");
    } else if (tText === undefined) {
      alert("本文を入力してください");
    } else {
      switch (index) {
        case "selectMinutes":
        case "selectHours":
          times();
          break;
        case "selectDayTime":
          dayTime();
          break;
        default:
          break;
      }
    }
  });

  //セレクターselectMinutes,selectHours,が押された時の処理
  const times = () => {
    if (nextForm.hasChildNodes()) {
      nextForm.removeChild(nextForm.firstChild);
      out.innerText = "";
      console.log(nextForm);
    }
    const inputForm = document.createElement("input");
    inputForm.setAttribute("style", "width:90px;");
    inputForm.type = "number";
    inputForm.maxLength = "2";
    inputForm.id = "inputForm";
    inputForm.placeholder = "数字入力";
    nextForm.appendChild(inputForm);
    // console.log("inputForm");

    inputForm.addEventListener("input", () => {
      const inputFormValue = inputForm.value.replace(/^0/g, "");
      switch (index) {
        case "selectMinutes":
          const putTime1 = "in " + inputFormValue.substr(0, 2) + " minutes";
          lastForm(putTime1);
          break;
        case "selectHours":
          const putTime2 = "in " + inputFormValue.substr(0, 2) + " hours";
          lastForm(putTime2);
          break;
        default:
          break;
      }
    });
  };
  //セレクターselectDayTime,が押された時
  const dayTime = () => {
    if (nextForm.hasChildNodes()) {
      nextForm.removeChild(nextForm.firstChild);
      out.innerText = "";
      // console.log(nextForm);
    }
    const dayTimeElement = document.createElement("input");
    dayTimeElement.type = "dateTime-local";
    dayTimeElement.name = "example";
    dayTimeElement.id = "dayTimeElement";
    dayTimeElement.min = "2020-01-01T00:00";
    dayTimeElement.max = "2022-12-31T23:59";
    nextForm.appendChild(dayTimeElement);

    dayTimeElement.addEventListener("input", () => {
      //下記の正規表現は、inputを.type = "dateTime-local"で指定しており記述が"2020-01-01T00:00"になってしまってます。それを"on 07/21/2019 at 07:00"の形に治すため正規表現で数字だけを摘出しresultElementで文法を書き換えてます
      const result = dayTimeElement.value.match(
        /(?<year>\d+)-(?<month>\d+)-(?<day>\d+)T(?<timeHours>\d+):(?<timeMinute>\d+)/u
      );
      // console.log(result.groups.year);
      const resultElement = `on ${result.groups.month}/${result.groups.day}/${result.groups.year} at ${result.groups.timeHours}:${result.groups.timeMinute}`;
      // console.log(resultElement);
      lastForm(resultElement);
    });
  };

  //最終的に下部のテキストエリアに出力される処理
  const lastForm = (e) => {
    out.value = "/remind" + " " + mText.trim() + " " + tText.trim() + " " + e;
  };

  //コピーボタン
  copy.addEventListener("click", () => {
    out.select();
    document.execCommand("Copy");
  });
}
