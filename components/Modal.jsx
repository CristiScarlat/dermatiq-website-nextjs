import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";


const ModalComponent = ({ title, body, showConfirmationButton = true, showCancelButton = true, onConfirm, onCancel, ...rest }) => {

    const [disabledConfirm, setDisabledConfirm] = useState(true);

    useEffect(() => {
        console.log(rest.show);
        if(!rest.show)setDisabledConfirm(true);
    }, [rest.show])

    const onCaptchaChange = (e) => {
        if(e){
            setDisabledConfirm(false)
        }
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
                    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
                    onChange={onCaptchaChange}
                />
            </Modal.Body>
            <Modal.Footer>
                {showConfirmationButton && <Button onClick={onConfirm} variant="outline-success" disabled={disabledConfirm}>Confirm</Button>}
                {showCancelButton && <Button onClick={onCancel} variant="outline-primary">Cancel</Button>}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;