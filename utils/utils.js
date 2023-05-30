export function handleModalOpen(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalWithClick);
  document.addEventListener("keydown", closeModalWithEsc);
}

export function handleModalClose(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalWithClick);
  document.removeEventListener("keydown", closeModalWithEsc);
}

export const closeModalWithClick = (e) => {
  if (e.target === e.currentTarget) {
    handleModalClose(e.currentTarget);
  }
};

export function closeModalWithEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    handleModalClose(openedModal);
  }
}
