import { useCallback, useState } from 'react';

import type { ModalProps } from '@interfaces/index';

export const useModal = <T = any>(): ModalProps<T> => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback((modalData: T) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
  };
};
