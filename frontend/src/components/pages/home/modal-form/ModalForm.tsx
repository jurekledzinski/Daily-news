import { Heading, Modal, ModalLayout } from '@components/shared';
import { ModalFormProps } from './types';

export const ModalForm = ({
  children,
  form,
  label,
  open,
  onClose,
  subTitle,
  title,
}: ModalFormProps) => {
  return (
    <Modal open={open} portal>
      <ModalLayout
        confirmText={label}
        color="info"
        form={form}
        onCancel={onClose}
        onClose={onClose}
        title={label}
        type="submit"
        variant="contained"
      >
        <Heading className="mb-xs" level={5}>
          {title}
        </Heading>
        <p className="mb-md" style={{ fontSize: 12 }}>
          {subTitle}
        </p>
        {children}
      </ModalLayout>
    </Modal>
  );
};
