import Link from "next/link";
import { useRouter } from "next/router";
import { MdPhoneInTalk } from "react-icons/md";
import { BsInstagram, BsFacebook } from "react-icons/bs";
import Image from "next/image";
import { headerLables } from "../utils/uiConstants";
import { Ctx } from "../context/context";
import styles from "../styles/NavHead.module.css";
import { useContext, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Flags from "country-flag-icons/react/3x2";

const NavHead = () => {
  const [expanded, setExpanded] = useState();
  const router = useRouter();
  const ctx = useContext(Ctx);

  const lang = ctx.state.lang;

  const handleChangeLanguage = () => {
    ctx.dispatch({ type: "SET_LANG", lang: lang === "ro" ? "en" : "ro" });
  };

  return (
    <Navbar
      expand="lg"
      collapseOnSelect
      className={`d-block pt-0 ${styles["navbar-main"]}`}
      expanded={expanded}
      onToggle={() => setExpanded(true)}
    >
      <div className={styles["navbar-mini-main"]}>
        <button onClick={handleChangeLanguage}>
          {lang === "ro" && <Flags.GB title="GB" style={{ width: "2rem" }} />}
          {lang === "en" && <Flags.RO title="RO" style={{ width: "2rem" }} />}
        </button>
        <ul className={styles["social-phone"]}>
          <li className="nav-item">
            <a className="custom-nav-link disabled">
              <MdPhoneInTalk className="me-1" /> +40 748 015 255
            </a>
          </li>
          <li className="nav-item">
            <a className="custom-nav-link disabled">
              <BsFacebook />
            </a>
          </li>
          <li className="nav-item">
            <a className="custom-nav-link disabled">
              <BsInstagram />
            </a>
          </li>
        </ul>
      </div>
      <Container fluid>
        <Navbar.Brand>
          <Link href="/">
            <a className="navbar-brand">
              <Image
                className="logo_image"
                src="/logo-final-DERMATIQ-text-white.png"
                alt=""
                width={200}
                height={80}
              />
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="me-5">
          <Nav
            onClick={() => setExpanded(false)}
            className="d-flex justify-content-end navbar-nav g-3 me-auto mb-2 mb-lg-0 w-100 fw-bold"
            style={{ gap: "1rem" }}
          >
            {headerLables[lang].map(hl => <Link href={hl.link} className="nav-item me-4 li-link">
              <a
                className={`custom-nav-link text-uppercase ${
                  router.pathname === hl.link  ? "active" : ""
                }`}
                aria-current="page"
              >
                {hl.name}
              </a>
            </Link>)}

           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavHead;
