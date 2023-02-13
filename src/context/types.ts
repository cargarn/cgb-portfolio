export type GeneralProviderProps = {
    children: React.ReactNode,
    authorName?: string,
    authorShortName?: string,
};

export interface IGeneralProvider {
    authorName?: string,
    authorShortName?: string,
}

export type AlertProviderProps = {
    children: React.ReactNode,
};

export type AlertProviderState = {
    isOpen: boolean,
    type: string,
    message: string,
};

export interface IAlertProvider {
    state?: AlertProviderState,
    onOpen: (type: string, message: string) => void,
    onClose?: () => void,
}
