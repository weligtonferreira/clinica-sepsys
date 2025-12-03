import { Slide, toast } from 'react-toastify';

export const notifySuccessPopUp = (
  message: string,
  closeTime = 3000,
  theme = 'light'
) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: closeTime,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide,
    theme,
  });
};

export const notifyErrorPopUp = (
  message: string,
  closeTime = 3000,
  theme = 'light'
) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: closeTime,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
  });
};
