import { useState } from "react";

import { Modal } from "components/Modal";

export const Trade: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>show modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>modal content</Modal>
      )}
    </div>
  );
};
