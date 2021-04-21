import { Modal as ModalComponent } from 'antd';
import { useModalContext } from './modal.context'

function Modal() {
    const { modalState: {message, visible}, closeModal } = useModalContext(); 
    return (
        <ModalComponent title='Teste' visible={visible} onOk={closeModal} onCancel={closeModal}>
            <p>{message}</p>
        </ModalComponent>
    );
}

export default Modal;