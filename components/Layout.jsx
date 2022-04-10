import NavHead from './NavHead';
// import Footer from './footer'
import Head from 'next/head';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>DermatIQ</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <NavHead />
            <>{children}</>
            {/* <Footer /> */}
        </>
    )
}