import stylesHeader from '../components/modal-header/ModalHeader.module.css';
import stylesModal from '../Modal.module.css';
import { classNames, generateClassNames } from '@helpers';
import { ModalClassNames, ModalHeaderClassNames } from './types';

export const modalClassNames: ModalClassNames = (className) => {
  return {
    modal: stylesModal,
    modalElement: classNames(stylesModal.modalElement, className ?? ''),
  };
};

export const modalHeaderClassNames: ModalHeaderClassNames = ({ color, variant }) => ({
  header: generateClassNames(stylesHeader, {
    header: true,
    [`${color}`]: Boolean(color),
    [`${variant}`]: Boolean(variant),
  }),
  title: stylesHeader.title,
});
