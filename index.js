new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  mousewheel: {
    sensitivity: 1,
  },
  autoHeight: true,
  slidesPerView: 2,
  slidesPerGroup: 2,
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
  speed: 800,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 20,
    stretch: 50,
    slideShadows: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
});

const btnShowTitle = document.querySelector(".show-title");
btnShowTitle.addEventListener("click", () => {
  btnShowTitle.nextElementSibling.classList.remove("hide");
  btnShowTitle.classList.add("hide");
});

const opacityModal = document.querySelector(".opacity-modal");
const closeModal = opacityModal.lastElementChild.firstElementChild;
document.querySelector(".main button").addEventListener("click", () => {
  opacityModal.classList.add("opacity");
  closeModal.addEventListener("click", () =>
    opacityModal.classList.remove("opacity")
  );
});

const telInputs = document.querySelectorAll("input[type='tel']");
let previousNumberCount = 1;
let previousInputLength = 4;
telInputs.forEach((t) => {
  t.addEventListener("input", () => {
    const valueString = t.value;
    const numbers = [];

    for (let i = 0; i < valueString.length; i++) {
      if (Number(valueString[i]) || valueString[i] === "0") {
        numbers.push(valueString[i]);
      }
    }

    if (numbers.length <= 1) {
      t.value = "+7 (";
      previousInputLength = 4;
      previousNumberCount = 1;
      return;
    }

    if (previousInputLength + 1 === valueString.length) {
      //&& previousInputLength <= 4
      if (numbers[0] != 7) {
        numbers.push(numbers.shift());
      }

      if (numbers[1] === "7" || numbers[1] === "8") {
        t.value = "+7 (";
        previousInputLength = 4;
        previousNumberCount = 1;
        return;
      }
    }

    if (
      (previousNumberCount + 11 === numbers.length ||
        previousNumberCount === 1) &&
      (numbers[1] === "7" || numbers[1] === "8")
    ) {
      numbers.splice(0, 2, "7");
    }

    let newString = "";
    let j = 1;
    for (let i = 1; i <= 18; i++) {
      if (numbers[j]) {
        switch (i) {
          case 1:
            newString += "+";
            break;
          case 2:
            newString += "7";
            break;
          case 3:
          case 9:
            newString += " ";
            break;
          case 4:
            newString += "(";
            break;
          case 8:
            newString += ")";
            break;
          case 13:
          case 16:
            newString += "-";
            break;
          default:
            newString += numbers[j++];
            break;
        }
      }
    }

    if (previousInputLength < valueString.length) {
      switch (newString.length) {
        case 7:
          newString += ") ";
          break;
        case 12:
        case 15:
          newString += "-";
          break;
        default:
          break;
      }
    }

    if (previousInputLength > valueString.length) {
      switch (valueString.length) {
        case 8:
          newString = newString.substr(0, newString.length - 1);
          break;
        case 12:
        case 15:
          newString = newString.substr(0, newString.length - 1);
          break;
        default:
          break;
      }
    }

    previousNumberCount = numbers.length;
    previousInputLength = newString.length;
    t.value = newString;
  });

  t.addEventListener("focus", () => {
    if (t.value.length <= 4) {
      t.value = "+7 (";
    }
  });

  t.addEventListener("focusout", () => {
    if (t.value.length <= 4) {
      t.value = "";
    }
  });
});

const forms = document.querySelectorAll("form");
const obj = {
  name: "",
  phone: "",
};
const arr = [];

forms.forEach((f) => {
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    let validate = true;
    const inputs = f.querySelectorAll("input");
    inputs.forEach((i) => {
      if (i.name === "name") {
        if (i.value.length < 2) {
          validate = false;
          if (i.value.length === 0) {
            // errorName.textContent = "Введите ваше имя !";
            // f.querySelector(".nameErrorChek").appendChild(errorName);
            return;
          }
          if (i.value.length === 1) {
            // errorName.textContent = "Введите кооректное имя !";
            // f.querySelector(".nameErrorChek").appendChild(errorName);
            return;
          }
        }
        // errorName.textContent = "";
      }
      if (i.name === "phone") {
        if (i.value.length < 18) {
          validate = false;

          if (i.value.length === 0) {
            // error.textContent = "Вы не ввели номер телефона !";
            // f.querySelector(".phoneErrorChek").appendChild(error);
            return;
          }
          if (i.value.length > 0) {
            // error.textContent = "Введите корректный номер телефона !";
            // f.querySelector(".phoneErrorChek").appendChild(error);
            return;
          }
        }
        // error.textContent = "";
      }
      arr.push(i.value);
    });
    obj.name = arr[0];
    obj.phone = arr[1];
    if (!validate) {
      return;
    }

    const url = "mailer/smart.php";
    const data = obj;
    console.log(data);
    try {
      const response = fetch(url, {
        method: "POST",
        body: data,
      });
      const result = response.json();
      console.log("Успех:", JSON.stringify(result));
    } catch (error) {
      console.error("Ошибка:", error);
    }
  });
});
