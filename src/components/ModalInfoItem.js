import React from "react";
import "./ModalInfoItem.scss";

const ModalInfoItem = ({ label, id, children }) => {

    return (
        <div className="modal-info-item" id={id}>
            <span className="modal-info-label">{label}</span>
            {children}
        </div>
    )
}

export default ModalInfoItem;