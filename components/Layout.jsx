import NavHead from "./NavHead";
import Head from "next/head";
import { Toast, ToastContainer } from "react-bootstrap";
import CookieConsent from "react-cookie-consent";

import { Ctx } from "../context/context";
import { useContext } from "react";

export default function Layout({ children }) {
  const { state, dispatch } = useContext(Ctx);

  const handleToastClose = () => {
    dispatch({
      type: "SET_TOAST",
      toast: {
        showToast: false,
        type: "",
        headerText: "",
        bodyText: "",
      },
    });
  };

  const cookieConstentStyle = {
    bottom: "40px",
    alignItems: "baseline",
    background: "rgb(53, 53, 53)",
    color: "white",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    left: "0px",
    position: "fixed",
    width: "100%",
    zIndex: 10000,
    padding: "0.5rem",
  };
  
  const cookieConstentButtonStyle = {
    background: "rgb(255, 212, 45)",
    border: "0px",
    borderRadius: "0px",
    color: "black",
    cursor: "pointer",
    flex: "0 0 auto",
    padding: "5px 10px",
  };

  return (
    <>
      <Head>
        <title>DermatIQ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://www.clinica-dermatiq.ro" />

        {/*HTML Meta Tags*/}
        <meta
          name="description"
          content="Clinica Dermatiq a apărut din dorința de a fi mai aproape de pacienții noștri, precum și de a oferi vizitatorilor mai multe informații despre îngrijirea pielii."
        />
        {/*Facebook Meta Tags*/}
        <meta property="og:url" content="https://www.clinica-dermatiq.ro" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dermatological Clinic Dermatiq" />
        <meta
          property="og:description"
          content="Clinica Dermatiq a apărut din dorința de a fi mai aproape de pacienții noștri, precum și de a oferi vizitatorilor mai multe informații despre îngrijirea pielii."
        />
        <meta property="og:image" content="/logo-final-DERMATIQ-text-white.png" />
        {/*Twitter Meta Tags*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="clinica-dermatiq.ro" />
        <meta
          property="twitter:url"
          content="https://www.clinica-dermatiq.ro"
        />
        <meta name="twitter:title" content="Clinica Dermatiq" />
        <meta
          name="twitter:description"
          content="Clinica Dermatiq a apărut din dorința de a fi mai aproape de pacienții noștri, precum și de a oferi vizitatorilor mai multe informații despre îngrijirea pielii."
        />
        <meta name="twitter:image" content="/logo-final-DERMATIQ-text-white.png" />
        <meta name="google-site-verification" content="EODJlfgOwTLoKHZY01TW31jLhhvT5GpyRVDvEb1Y5OQ" />
      </Head>
      <NavHead />
      <>{children}</>
      <ToastContainer
        position={"bottom-end"}
        style={{ zIndex: "99999", margin: "1rem", color: "white" }}
      >
        <Toast
          onClose={handleToastClose}
          show={state.toast.showToast}
          bg={state.toast.type}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">{state.toast.headerText}</strong>
          </Toast.Header>
          <Toast.Body>{state.toast.bodyText}</Toast.Body>
        </Toast>
      </ToastContainer>
      <CookieConsent
        location=""
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="gdpr-google-analytics"
        disableStyles={false}
        style={cookieConstentStyle}
        buttonStyle={cookieConstentButtonStyle}
      >
        This website uses cookies to enhance the user experience.{" "}
      </CookieConsent>
      {/* <Footer /> */}
    </>
  );
}
