const buyButton = document.querySelector(".button_product-card-popup");
const modalCartOpen = document.querySelector(".modal-cart");
const modalCartClose = modalCartOpen.querySelector(".modal-close");

buyButton.addEventListener("click", function () {
  modalCartOpen.classList.add("modal--show");
});

modalCartClose.addEventListener("click", function () {
  modalCartOpen.classList.remove("modal--show");
});
