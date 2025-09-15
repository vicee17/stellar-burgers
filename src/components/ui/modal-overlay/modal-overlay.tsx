import React from 'react';
import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      console.log('Overlay click triggered');
      e.stopPropagation();
      onClick();
    }
  };
  return <div className={styles.overlay} onClick={handleOverlayClick} />;
};
