import stylesHeader from '../components/modal-header/ModalHeader.module.css';
import stylesModal from '../Modal.module.css';
import { generateClassNames } from '@helpers';
import { ModalHeaderClassNames } from './types';

export const modalClassNames = () => ({
  modal: stylesModal,
  modalElement: stylesModal.modalElement,
});

export const modalHeaderClassNames: ModalHeaderClassNames = ({ color, variant }) => ({
  header: generateClassNames(stylesHeader, {
    header: true,
    [`${color}`]: Boolean(color),
    [`${variant}`]: Boolean(variant),
  }),
  title: stylesHeader.title,
});
