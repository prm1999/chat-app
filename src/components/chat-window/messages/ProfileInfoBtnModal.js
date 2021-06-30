import React, { useState } from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvtar from '../../ProfileAvtar';

const ProfileInfoBtnModal = ({ profile, children, ...btnProps }) => {
  const { isOpen, close, open } = useModalState();
  const { name, avatar, createdAt } = profile;
  const shortName = profile.name; // .split('')[0]; use for single alphabet of name
  const memeberSince = new Date(createdAt).toLocaleDateString();

  return (
    <div>
      <Button onClick={open}>{shortName}</Button>

      <Modal {...btnProps} show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortName} Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <ProfileAvtar
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />
          <h4 className="mt2">{name}</h4>
          <p>Member Since {memeberSince}</p>
        </Modal.Body>

        <Modal.Footer>
          {children}
          <Button block onClick={close}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileInfoBtnModal;
