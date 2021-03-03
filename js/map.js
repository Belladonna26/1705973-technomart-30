const mapLink = document.querySelector(".contacts__map-button");
const mapOpen = document.querySelector(".modal-map");
const mapClose = mapOpen.querySelector(".modal-close");

mapLink.addEventListener("click", function () {
  mapOpen.classList.add("modal--show");
});

mapClose.addEventListener("click", function () {
    mapOpen.classList.remove("modal--show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (mapOpen.classList.contains("modal--show")) {
      evt.preventDefault();
    mapOpen.classList.remove("modal--show");
    }
  }
});
