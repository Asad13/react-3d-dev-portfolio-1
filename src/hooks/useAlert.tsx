import { useState } from 'react';

type AlertOptions = {
  show: boolean;
  text: string;
  type: 'danger' | 'success';
};

const useAlert = () => {
  const [alert, setAlert] = useState<AlertOptions>({
    show: false,
    text: '',
    type: 'danger',
  });

  const showAlert = ({ text, type = 'danger' }: Omit<AlertOptions, 'show'>) =>
    setAlert({ show: true, text, type });
  const hideAlert = () => setAlert({ show: false, text: '', type: 'danger' });

  return { alert, showAlert, hideAlert };
};

export default useAlert;
