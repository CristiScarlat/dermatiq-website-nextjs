import { Modal, Button } from 'react-bootstrap';


const ModalComponent = ({title, body, showConfirmationButton=true, showCancelButton=true, onConfirm, onCancel, ...rest}) => {
    return (
        <Modal
            {...rest}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>{body}</div>
            </Modal.Body>
            <Modal.Footer>
                {showConfirmationButton && <Button onClick={onConfirm} variant="outline-success">Confirm</Button>}
                {showCancelButton && <Button onClick={onCancel} variant="outline-primary">Cancel</Button>}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;