export type ModalProps<T> = {
  isOpen: boolean;
  data: T | null;
  open: (data: T) => void;
  close: () => void;
};
