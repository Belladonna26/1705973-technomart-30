const apply = document.querySelector(".contacts__button");
const writeUsOpen = document.querySelector(".modal-write-us");
const writeUsClose = writeUsOpen.querySelector(".modal__close");
const userName = writeUsOpen.querySelector("[name=name]");
const mail = writeUsOpen.querySelector("[name=mail]");
const form = writeUsOpen.querySelector(".write-us__form");

apply.addEventListener("click", function () {
  writeUsOpen.classList.add("modal-show");
  userName.focus();
});

writeUsClose.addEventListener("click", function () {
  writeUsOpen.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (writeUsOpen.classList.contains("modal-show")) {
      evt.preventDefault();
      writeUsOpen.classList.remove("modal-show");
    }
  }
});

