import styles from '../styles/NavHead.module.css';
import Link from 'next/link'

const NavHead = () => {
    return (
        <nav
            className="navbar sticky-top navbar-expand-lg navbar-light"
            style={{ 
                backgroundColor: '#e4e6d3',
                // borderBottom: '2px solid #79658847' 
                }}
                >
            <div className="container-fluid ps-3 pe-2">
                <a className="navbar-brand" href="#">
                    <img className="logo_image" src="/logo-final-DERMATIQ.png" alt="" width={200} height='auto' />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="me-5 collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="d-flex justify-content-end navbar-nav me-auto mb-2 mb-lg-0 w-100 fw-bold">
                        <li className="nav-item me-4">
                            <Link href="/"><a className="custom-nav-link active" aria-current="page">Acasa</a></Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link href="/booking"><a className="custom-nav-link">Despre Noi</a></Link>
                        </li>
                        <li className="nav-item">
                            <a className="custom-nav-link disabled">Disabled</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default NavHead;