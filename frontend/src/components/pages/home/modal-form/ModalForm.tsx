import { Button, Heading, Modal, ModalLayout } from '@/components/shared';
import { ModalFormProps } from './types';

export const ModalForm = ({
  children,
  form,
  icon,
  label,
  open,
  onClose,
  onOpen,
  subTitle,
  title,
}: ModalFormProps) => {
  return (
    <>
      <Button
        className="r-xs"
        color="info"
        type="button"
        iconEnd={[icon]}
        label={label}
        onClick={onOpen}
        size="size-xs"
      />
      <Modal open={open} portal>
        <ModalLayout
          confirmText={label}
          color="info"
          form={form}
          title={label}
          variant="contained"
          onCancel={onClose}
          onClose={onClose}
          type="submit"
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
    </>
  );
};
