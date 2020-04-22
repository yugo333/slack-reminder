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
      createdMessageValues.contents = `"${value}"`;
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
    // クリックでは5単位で変わる。それより小さい単位は手入力出来る。
    inputNumber.step = 5;
    inputNumber.min = 0;
    inputNumber.placeholder = "数字を入力";
    inFormElement.appendChild(inputNumber);

    const selectbox = document.createElement("select");
    selectbox.id = "selectTime";
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
    onFormElement.appendChild(inputDate);

    const inputTime = document.createElement("input");
    inputTime.type = "time";
    onFormElement.appendChild(inputTime);
  };

  copy.addEventListener("click", () => {
    out.select();
    document.execCommand("Copy");
  });
}
