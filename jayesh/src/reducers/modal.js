import { useSelector } from "react-redux";

const initialState = {
    isModalOpen: false,
  };
  
  export default function modalReducer (state = initialState, action){

    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          isModalOpen: true,
        };
      case 'CLOSE_MODAL':
        return {
          ...state,
          isModalOpen: false,
        };
      default:
        return state;
    }
  };
  
  export const useModalReducer = () => {
    const modal = useSelector((state) => state.modal);
    return modal;
  };
  