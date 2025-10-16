import { FC, memo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(
  ({ title, onClose, children, ...rest }) => {
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !e.repeat) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [onClose, location]);

    return ReactDOM.createPortal(
      <ModalUI title={title} onClose={onClose}>
        {children}
      </ModalUI>,
      modalRoot as HTMLDivElement
    );
  }
);
