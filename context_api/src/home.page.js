import { Button } from 'antd';
import { useModalContext } from './modal.context';
function HomePage() {
    const { openModal } = useModalContext(); 

    const showModal = () => openModal({ message: 'Teste' });
    
    return (
        <> 
            <Button type='primary' onClick={showModal}>Open Modal</Button>
        </>
    );
}

export default HomePage;