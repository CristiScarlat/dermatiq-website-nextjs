import NavHead from './NavHead';
import Head from 'next/head';
import { Toast, ToastContainer } from 'react-bootstrap';

import { Ctx } from '../context/context';
import { useContext } from 'react';

export default function Layout({ children }) {

    const {state, dispatch} = useContext(Ctx);
    
    const handleToastClose = () => {
        dispatch({type: 'SET_TOAST', toast: {
            showToast: false,
            type: '',
            headerText: '',
            bodyText: ''
          }})
        
    }

    return (
        <>
            <Head>
                <title>DermatIQ</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* <link rel="stylesheet" href="https://use.typekit.net/atw7jti.css"></link> */}
            </Head>
            <NavHead />
            <>{children}</>
            <ToastContainer position={'bottom-end'} style={{zIndex: '99999', margin: '1rem', color: 'white'}}>
                <Toast onClose={handleToastClose} show={state.toast.showToast} bg={state.toast.type} autohide>
                    <Toast.Header>
                        <strong className="me-auto">{state.toast.headerText}</strong>
                    </Toast.Header>
                    <Toast.Body>{state.toast.bodyText}</Toast.Body>
                </Toast>
            </ToastContainer>
            {/* <Footer /> */}
        </>
    )
}