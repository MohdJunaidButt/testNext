export interface ToastContextInterface {
    toast: ToastConfig;
    setToast: (message: string, toast: ToastConfig) => void;
    closeToast: () => void;
    openToast: () => void;

}


export interface ToastConfig {
    message: string;
    type: "success" | "fail" ;
    isOpen: boolean;
    duration: number;
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    onClose: () => void;
    onOpen: () => void;
}