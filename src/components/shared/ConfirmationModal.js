import React from 'react';

const ConfirmationModal = ({modalName, confirmationHeading, ConfirmationText, modalActionFn}) => {
    return (
      <>
        {/* Copy this commented Label Button for modal call where is needed..  */}
        {/* <label
        htmlFor="confirmation-modal"
        className="btn"
      ></label> */}

        <input
          type="checkbox"
          id={modalName}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center whitespace-pre-line">
              {confirmationHeading}
            </h3>
            <p className="py-4 text-center whitespace-pre-line">
              {ConfirmationText}
            </p>
            <div className="modal-action w-full justify-center">
              <label
                htmlFor={modalName}
                className="btn btn-error px-10"
                onClick={modalActionFn}
              >
                Yes
              </label>
              <label
                htmlFor={modalName}
                className="btn btn-accent px-7"
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
      </>
    );
};

export default ConfirmationModal;