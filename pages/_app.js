import { useEffect, useContext } from "react";
import Layout from '../components/Layout';
import Provider from "../context/context";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
