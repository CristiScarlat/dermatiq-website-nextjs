import { Modal, Button } from 'react-bootstrap';


const ModalComponent = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>{props.body}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onConfirm} variant="outline-success">Confirm</Button>
                <Button onClick={props.onCancel} variant="outline-primary">Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;