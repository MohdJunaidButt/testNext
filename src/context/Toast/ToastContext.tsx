import { Toast } from '@/components';
import {
  ToastConfig,
  ToastContextInterface,
} from '@/context/Toast/ToastInterface';
import { createContext, useContext, useEffect, useState } from 'react';

const initialState: ToastContextInterface = {
  toast: {
    message: '',
    type: 'success',
    isOpen: false,
    duration: 4000,
    position: 'top-right',
    onClose: () => {},
    onOpen: () => {},
  },
  setToast: (message: string, toast: ToastConfig) => {},
  closeToast: () => {},
  openToast: () => {},
};

export const AppToastContext = createContext(initialState);

export const ToastProvider = ({ children }: any) => {
  const [stateToast, setStateToast] = useState(initialState.toast);

  function setToast(message: string, toast: ToastConfig = initialState.toast) {
    setStateToast({
      ...stateToast,
      type: toast?.type || 'success',
      message: message,
      isOpen: true,
    });
  }

  const closeToast = () => {
    setStateToast({ ...stateToast, isOpen: false });
  };

  const openToast = () => {
    setStateToast({ ...stateToast, isOpen: true, message: '' });
  };

  useEffect(() => {
    if (stateToast.isOpen) {
      setTimeout(() => {
        closeToast();
      }, stateToast.duration);
    }
  }, [stateToast]);

  return (
    <AppToastContext.Provider
      value={{ toast: stateToast, setToast: setToast, closeToast, openToast }}
    >
      {children}
      {stateToast.isOpen && (
        <Toast
          show={stateToast.isOpen}
          text={stateToast.message}
          type={stateToast.type}
        />
      )}
    </AppToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext<ToastContextInterface>(AppToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default ToastProvider;
