import { createContext, useContext, useState } from 'react';

// criando context
const ModalContext = createContext({});

// provendo o estado global do meu item usando provider
const ModalProvider = ({children}) => {
    const [modalState, setState] = useState({visible: false});

    const openModal = (payload) => setState({ ...payload, visible: true});

    const closeModal = () => setState({visible: false});

    return <ModalContext.Provider value={{modalState, openModal, closeModal}}>
        {children}
    </ModalContext.Provider>
}

// criando nosso próprio hook para gerenciarmos nosso próprio estado de modal
const useModalContext = () => {
    const context = useContext(ModalContext);

    return context;
}

export { ModalProvider, useModalContext };