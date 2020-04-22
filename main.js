"use strict";
{
  let copy = document.getElementById("copy");

  // 作成するメッセージ内容の各をここに保存する
  let createdMessageValues = {
    sender: "",
    contents: "",
    remindType: "",
    when: { in: { time: 0, unit: "" }, on: { date: "", time: "" } },
  };

  const outPutText = document.getElementById("outPutText");

  // この関数を実行してslackに実際に貼る文字列を作成する。
  const createOutput = () => {
    const { sender, contents, remindType, when } = createdMessageValues;
    let outputStrings = "";
    // TODO: outputStringsの形式は確認していない。
    switch (remindType) {
      case "in":
        outputStrings = `/remind ${sender} "${contents}" ${remindType} ${when.in.time} ${when.in.unit}`;
        break;
      case "on":
        outputStrings = `/remind ${sender} "${contents}" ${remindType} ${when.on.date} ${when.on.time}`;
        break;
      default:
        break;
    }
    outPutText.value = outputStrings;
  };

  const messageSender = document.getElementById("messageSender");
  messageSender.addEventListener(
    "change",
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
    "change",
    () => {
      const { value } = messageContents;
      createdMessageValues.contents = value;
    },
    false
  );

  const remindType = document.getElementById("remindType");
  remindType.addEventListener("change", () => {
    const { value } = remindType.type;
    createdMessageValues.remindType = value;

    if (value === "in") {
      createInSelectBox();
      return;
    }
    if (value === "on") {
      createOnSelectBox();
    }
  });

  const wrapper = document.getElementById("wrapper");

  const createInSelectBox = () => {
    // すでに日時指定の要素を作っている場合は削除
    const onForm = document.getElementById("onForm");
    if (onForm) {
      onForm.remove();
    }

    const inFormElement = document.createElement("form");
    inFormElement.id = "inForm";
    wrapper.appendChild(inFormElement);

    const inputNumber = document.createElement("input");
    inputNumber.type = "number";
    inputNumber.name = "timeNumber";
    // クリックでは5単位で変わる。それより小さい単位は手入力出来る。
    inputNumber.step = 5;
    inputNumber.min = 0;
    inputNumber.placeholder = "数字を入力";
    inFormElement.appendChild(inputNumber);

    const selectbox = document.createElement("select");
    selectbox.id = "selectTime";
    selectbox.name = "timeUnit";
    inFormElement.appendChild(selectbox);

    // TODO: minutesとhoursであっているか確認。
    const options = [
      { text: "分後", value: "minutes" },
      { text: "時間後", value: "hours" },
    ];

    options.forEach((object) => {
      const optionElement = document.createElement("option");
      optionElement.text = object.text;
      optionElement.value = object.value;
      selectbox.appendChild(optionElement);
    });

    // inFormにchangeのイベントリスナーを付与。
    inFormElement.addEventListener("change", (element) => {
      if (element.target.name === "timeNumber") {
        createdMessageValues.when.in.time = element.target.value;
        // timeUnitを触らないと空のままになってしまうので、空の場合はminutesを入れる
        if (!createdMessageValues.when.type) {
          createdMessageValues.when.in.unit = "minutes";
        }
      }
      if (element.target.name === "timeUnit") {
        createdMessageValues.when.in.unit = element.target.value;
      }
      createOutput();
    });
  };

  const createOnSelectBox = () => {
    const inForm = document.getElementById("inForm");
    if (inForm) {
      inForm.remove();
    }
    // 日付のセレクトボックスと時間のセレクトボックスを作成

    // 日時指定で使用するelement
    const onFormElement = document.createElement("form");
    onFormElement.id = "onForm";
    wrapper.appendChild(onFormElement);

    const inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.name = "datePicker";
    onFormElement.appendChild(inputDate);

    const inputTime = document.createElement("input");
    inputTime.type = "time";
    inputTime.name = "timePicker";
    onFormElement.appendChild(inputTime);

    // inFormにchangeのイベントリスナーを付与。
    onFormElement.addEventListener("change", (element) => {
      if (element.target.name === "datePicker") {
        createdMessageValues.when.on.date = element.target.value;
      }

      if (element.target.name === "timePicker") {
        createdMessageValues.when.on.time = element.target.value;
      }
      createOutput();
    });
  };

  copy.addEventListener("click", () => {
    out.select();
    document.execCommand("Copy");
  });
}
