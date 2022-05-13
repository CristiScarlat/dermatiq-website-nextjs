import { Modal, Button } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";


const ModalComponent = ({ title, body, showConfirmationButton = true, showCancelButton = true, onConfirm, onCancel, ...rest }) => {

    const handleOnConfirm = () => {

    }

    const onCaptchaChange = () => {

    }

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
                <ReCAPTCHA
                    sitekey="6LeCVugfAAAAAM_97OCnlEvwM-0_swB2JePLheuZ"
                    onChange={onCaptchaChange}
                />
            </Modal.Body>
            <Modal.Footer>
                {showConfirmationButton && <Button onClick={handleOnConfirm} variant="outline-success">Confirm</Button>}
                {showCancelButton && <Button onClick={onCancel} variant="outline-primary">Cancel</Button>}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;