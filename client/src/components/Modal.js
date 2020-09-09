import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    props.setUserList(null);
    props.setTeamList(null);
    setDisplay(false);
  };

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close(),
    };
  });

  if (display) {
    return (
      <div className='modal-wrapper'>
        <div onClick={close} className='modal-backdrop' />
        <div className='modal-box'>{props.children}</div>
      </div>
    );
  }

  return null;
});

export default Modal;
