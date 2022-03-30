import styles from '../styles/NavHead.module.css';

const NavHead = () => {
    return (
        <nav className="navbar sticky-top navbar-expand-lg" style={{backgroundColor: '#ede6f2'}}>
            <div className="container-fluid ps-5 pe-5">
                <a className="navbar-brand" href="#">
                    <img className="logo_image" src="/logo-final-DERMATIQ.png" alt="" width={200} height='auto' />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="me-5 collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="d-flex justify-content-end navbar-nav me-auto mb-2 mb-lg-0 w-100 fw-bold">
                        <li className="nav-item me-4">
                            <a className="custom-nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item me-4">
                            <a className="custom-nav-link" href="#">Link</a>
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