import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdPhoneInTalk } from 'react-icons/md';
import { BsInstagram, BsFacebook } from 'react-icons/bs';
import Image from 'next/image';
import styles from '../styles/NavHead.module.css';

const NavHead = () => {
    const router = useRouter();

    return (
        <nav
            className={`navbar sticky-top navbar-expand-lg navbar-light d-block pt-0 ${styles['navbar-main']}`}>
            <div className={styles['navbar-mini-main']}>
                <ul className={styles['social-phone']}>
                    <li className="nav-item">
                        <a className="custom-nav-link disabled"><MdPhoneInTalk className="me-1" /> +40 748 015 255</a>
                    </li>
                    <li className="nav-item">
                        <a className="custom-nav-link disabled"><BsFacebook /></a>
                    </li>
                    <li className="nav-item">
                        <a className="custom-nav-link disabled"><BsInstagram /></a>
                    </li>
                </ul>
            </div>
            <div className="container-fluid ps-3 pe-2">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link href="/"><a className="navbar-brand">
                    <Image className="logo_image" src="/logo-final-DERMATIQ.png" alt="" width={200} height={80} />
                </a>
                </Link>
                <div className="me-5 collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="d-flex justify-content-end navbar-nav g-3 me-auto mb-2 mb-lg-0 w-100 fw-bold">
                        <li className="nav-item me-4 li-link">
                            <Link href="/"><a className={`custom-nav-link text-uppercase ${router.pathname === '/' ? 'active' : ''}`} aria-current="page">Acasa</a></Link>
                        </li>
                        <li className="nav-item me-4 li-link">
                            <Link href="/about"><a className={`custom-nav-link text-uppercase ${router.pathname === '/about' ? 'active' : ''}`}>Despre Noi</a></Link>
                        </li>
                        <li className="nav-item me-4 li-link">
                            <Link href="/services"><a className={`custom-nav-link text-uppercase ${router.pathname === '/services' ? 'active' : ''}`}>Proceduri</a></Link>
                        </li>
                        <li className="nav-item me-4 li-link">
                            <Link href="/gdpr"><a className={`custom-nav-link text-uppercase ${router.pathname === '/gdpr' ? 'active' : ''}`}>GDPR</a></Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default NavHead;