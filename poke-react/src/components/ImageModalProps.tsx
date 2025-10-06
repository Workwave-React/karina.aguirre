import Modal from "react-modal";

Modal.setAppElement("#root");

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ImageModal = ({ imageUrl, onClose }: ImageModalProps) => {
  return (
    <Modal
      isOpen={!!imageUrl}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 1000,
        },
        content: {
          background: "transparent",
          border: "none",
          display: "flex",
          justifyContent: "center",
          padding: 0,
          inset: 0,
        },
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Expanded view"
          style={{
            maxHeight: "100vh",
            maxWidth: "100vw",
            objectFit: "contain",
            cursor: "pointer",
          }}
          onClick={onClose}
        />
      )}
    </Modal>
  );
};

export default ImageModal;
