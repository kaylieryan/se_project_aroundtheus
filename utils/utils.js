export function handleModalOpen(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalWithClick);
  document.addEventListener("keydown", handleEscClose);
}

export function handleModalClose(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalWithClick);
  document.removeEventListener("keydown", handleEscClose);
}

export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    handleModalClose(openedModal);
  }
}

export function closeModalWithEsc(evt) {
  if (evt.key === "Escape") {
    handleModalClose(this);
  }
}
