import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { default as logo } from "../../assets/svg/logo.svg";
function FooterBar() {
  return (
    <Container fluid className="bg-dark-offset">
      <Container className="mx-auto p-2">
        <Row className="  p-3">
          {/* <Col sm={3}>
            <h4 className="text-primary ">Contact Us</h4>
            <div className="flex-center mt-4">
              <p className="text-dark">
                Madbrain Media and Marketing
                <br />
                Plot 74, New A.G. Cooperative Colony,
                <br />
                Kadru, Jharkhand 834002
                <br />
                <strong>email:</strong>{" "}
                <a href="mailto:info@buymyequity.in">info@buymyequity.in</a>
                <br />
                <strong>Phone:</strong> +91 9031642111
              </p>
            </div>
          </Col>
          <Col sm={3}>
            <h4 className="text-primary ">Resources</h4>
            <ul className="footer-ul">
              <Link className="footer-link" to="/home">
                Home
              </Link>
              <Link className="footer-link" to="/about">
                Investor
              </Link>
              <Link className="footer-link" to="/pricing">
                Startup
              </Link>
              <Link className="footer-link" to="#">
                Gallery
              </Link>
              <Link className="footer-link" to="/contact">
                Contact Us
              </Link>
              <Link className="footer-link" to="/contact">
                About Us
              </Link>
            </ul>
          </Col> */}
          <Col sm={12} className="flex-center    ">
            <img src={logo} className="logo bg-white p-3" alt="" />
          </Col>
          <hr />
          <Col sm={12}>
            <Link to={"/policy"} className="footer-link ">
              <p className="text-white text-bold text-center hover">
                Privacy statement and Refund policy
              </p>
            </Link>
          </Col>

          <hr />
          <Col sm={12} className=" mt-3 ">
            <h4 className="text-white text-center">Disclaimer</h4>
            <p className="text-white text-center">
              Buymyequity.in acts as an introducer between the investor and
              start-up companies to enable the start-up companies get the
              required investments. Services rendered by buymyequity.in are
              distinct and separate from a Stock Exchange which is set up under
              the provisions of Securities Contract Regulation Act,1956.
              Buymyequity.in not a Stock Exchange and is only a facilitator for
              investments.
            </p>
          </Col>
          <hr />
          <Col sm={12}>
            <p className="text-white text-center">
              Copyright © 2022 Buymyequity.in. All Rights Reserved{" "}
            </p>
            <p className="text-white text-center">
              Developed By{" "}
              <a href="https://crawlers.co.in/">
                {" "}
                <span className="text-white subtitle">crawlers</span>
              </a>{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default FooterBar;
