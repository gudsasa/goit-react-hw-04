import Modal from "react-modal";
import css from "./ImageModal.module.css";

export default function ImageModal({
  isModalOpen,
  closeModal,
  imageInfo: { alt, url },
}) {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        overlayClassName={css.overlay}
        className={css.content}
        closeTimeoutMS={350}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        <img src={url} alt={alt} />
      </Modal>
    </>
  );
}
