import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocale } from '../../context/local';
import 'react-toastify/dist/ReactToastify.css';

function Error() {
  const { state, dispatch } = useLocale();
  const errorMessage = state.errorMsg;

  useEffect(() => {
    if (errorMessage) {
      toast.info(errorMessage);

      const action = {
        type: 'CLEAR_ERROR',
        payload: {
          value: '',
        },
      };
      dispatch(action);
    }
  }, [errorMessage, dispatch]);

  return <ToastContainer position="top-left" autoClose={2000} />;
}

export default Error;
