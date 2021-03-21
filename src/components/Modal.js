import React from "react";
import "./Modal.scss";

const Modal = ({ displayModal, pokemon, hideModal, showModal }) => {
  const visibleClassName = displayModal ? "visible" : "hidden";

  return (
    <div className={`modal ${visibleClassName}`}>
      <section className="modal-main">
        <p>You clicked on {pokemon.name}!</p>
        <button type="button" onClick={hideModal}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
