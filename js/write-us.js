const apply = document.querySelector(".contacts__button");
const writeUsOpen = document.querySelector(".modal-write-us");
const writeUsClose = writeUsOpen.querySelector(".modal-close");


apply.addEventListener("click", function () {
  writeUsOpen.classList.add("modal--show");
});

writeUsClose.addEventListener("click", function () {
  writeUsOpen.classList.remove("modal--show");
});
