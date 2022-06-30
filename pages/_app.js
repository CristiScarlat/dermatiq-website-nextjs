import { useEffect, useContext } from "react";
import Layout from '../components/Layout';
import Provider from "../context/context";
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';

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
