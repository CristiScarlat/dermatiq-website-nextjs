import {useEffect, useContext} from "react";
import Layout from '../components/Layout';
import Provider from "../context/context";
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import {SessionProvider} from "next-auth/react";

export const getServerSideProps = async ({
                                             res,
                                         }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    return {
        props: {
            time: new Date().toISOString(),
        },
    }
}

function MyApp({Component, pageProps}) {

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    return (
      <SessionProvider session={pageProps.session}>
        <Provider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
      </SessionProvider>
    )
}

export default MyApp
