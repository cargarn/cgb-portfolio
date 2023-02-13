import { FC, createContext, useContext, useState } from "react";
import { AlertProviderProps, AlertProviderState, IAlertProvider } from "./types";

const AlertContext = createContext<IAlertProvider>({
  onOpen: () => {},
});

const defaultAlertState: AlertProviderState = {
  isOpen: false,
  type: '',
  message: '',     // Message to be displayed, can be any string
};

export const AlertProvider: FC<AlertProviderProps> = ({ children }: AlertProviderProps) => {
  const [state, setState] = useState(defaultAlertState);

  const value = {
    ...state,
    onOpen: (type: string, message: string) => setState({ isOpen: true, type, message }),
    onClose: () => setState({ isOpen: false, type: '', message: '' }),
  };
  return (
    <AlertContext.Provider
      value={ value }
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
