import { createContext, useContext, useReducer } from "react";
import { ToastContainer } from "../components/ToastContainer";

export const DispatchCtx = createContext(null);
export const ToastCTx = createContext(null);

function ToastReducer(state, action) {
  switch (action.type) {
    case "add_toast": {
      return [...state, { id: Date.now(), ...action.payload }];
    }
    case "remove_toast": {
      return state.filter((x) => x.id !== action.payload.id);
    }
    case "remove_all": {
      return [];
    }
    default: {
      return state;
    }
  }
}

export const ToastProvider = ({ children }) => {
  const [toastList, dispatch] = useReducer(ToastReducer, []);
  function success(message) {
    dispatch({
      type: "add_toast",
      payload: { type: "success", message: message },
    });
  }

  function warning(message) {
    dispatch({
      type: "add_toast",
      payload: { type: "warning", message: message },
    });
  }

  function error(message) {
    dispatch({
      type: "add_toast",
      payload: { type: "danger", message: message },
    });
  }

  return (
    <DispatchCtx.Provider value={dispatch}>
      <ToastCTx.Provider value={{ warning, success, error }}>
        <ToastContainer toasts={toastList}>{children}</ToastContainer>
      </ToastCTx.Provider>
    </DispatchCtx.Provider>
  );
};

export function ToastDispatch() {
  return useContext(DispatchCtx);
}
