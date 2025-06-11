import React from "react";
import { Container } from "react-bootstrap";

function AboutUs() {
  return (
    <Container
      fluid
      className="hero-bg  "
      style={{
        backgroundImage: `url(${require("../../assets/images/aboutus.jpg")})`,
      }}
    >
      <div className="dark-filter"></div>
      <Container className="mx-auto mt-5 p-4">
        <h1 className="text-bold text-white  mt-5" data-aos="fade-right">
          About Us
        </h1>
        <p className="text-white" data-aos="fade-right">
          {" "}
          About Us Buymyequity.in is a digital platform where group of investors
          keen to invest in your start up which have potential to create
          disproportionate value. Investors in buymyequity.in are leaders in
          Entrepreneurial Eco-System as they have had strong operational
          experience as CEO’s or a background of creating new and successful
          ventures. They share a passion to create scale and value for startup
          ventures. Buymyequity.in in addition to investment provides constant
          access to high quality mentoring, vast networks and inputs on strategy
          as well as execution. The Network members, because of their background
          are better able to assess the potential and risks at the early stage.
        </p>
        <h4 className="text-bold text-white  mt-5" data-aos="fade-right">
          why Buymyequity.in?
        </h4>
        <p className="  text-white " data-aos="fade-right">
          {" "}
          About Us Buymyequity.in is a digital platform where group of investors
          keen to invest in your start up which have potential to create
          disproportionate value. Investors in buymyequity.in are leaders in
          Entrepreneurial Eco-System as they have had strong operational
          experience as CEO’s or a background of creating new and successful
          ventures. They share a passion to create scale and value for startup
          ventures. Buymyequity.in in addition to investment provides constant
          access to high quality mentoring, vast networks and inputs on strategy
          as well as execution. The Network members, because of their background
          are better able to assess the potential and risks at the early stage.
        </p>
        <h4 className="text-bold text-white  mt-5" data-aos="fade-right">
          What Buymyequity.in is looking for?
        </h4>
        <p className="  text-white  " data-aos="fade-right">
          Buymyequity.in is looking at multiple sectors of investment which
          includes services, Semi-conductor, Retails, Mobile, Social impact,
          Manufacturing, Lifestyle, Internet, Hospitality, Health care,
          Information Technology, Gaming, Financial service, Education,
          E-commerce, Agriculture etc. We likely to invest in startup who have
          high barriers to entity and qualified and strong management team who
          can make business scalable with their unique products, services,
          process either in concept or implementation.
        </p>
      </Container>
    </Container>
  );
}

export default AboutUs;
