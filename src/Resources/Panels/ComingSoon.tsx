import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { default as logo } from "../../assets/svg/logo.svg";

function ComingSoon() {
  return (
    <Container
      fluid
      className=" hero-bg"
      style={{
        backgroundImage: `url(${require("../../assets/images/pagenotfound.jpg")})`,
      }}
    >
      <div className="dark-filter"></div>
      <Container
        id="coming-soon"
        className="h-100 flex-center mx-auto flex-column
      "
      >
        <img src={logo} alt="" className="logo" />
        <hr />
        <h1 className="title text-background text-hover text-center">
          404 Not Found
        </h1>
        <Link to={"/Home"}>
          <Button variant="primary" className="m-btn">
            Home
          </Button>
        </Link>
        <br />
      </Container>
    </Container>
  );
}

export default ComingSoon;
