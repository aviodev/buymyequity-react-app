import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { blogsurl } from "../../content/blogsurl";
import Blogs from "./Blogs";
import HowWork from "./HowWork";

function Home() {
  const myRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setPlaying(true);
    }, 1000);
  }, []);
  const scrollToHowWeWork = () => myRef.current.scrollIntoView();
  return (
    <>
      <Container fluid className="hero-bg flex-center flex-column">
        <div className="dark-filter"></div>
        <Container className="mx-auto flex-center p-3">
          <Row>
            <Col
              sm={12}
              className="flex-start flex-column "
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1 className="title text-white text-center"> Buy my equity</h1>
              <p className="subtitle text-white text-center">
                Make your path easy for investment and fund raising <br />
                <h2 className="text-uppercase   text-white mt-2">
                  At Just: ₹2100
                </h2>
              </p>
              <Button
                onClick={scrollToHowWeWork}
                variant=" primary"
                className="m-btn"
              >
                Explore
              </Button>
            </Col>
            <Col sm={8} className="flex-center mx-auto  mt-5 ">
              <ReactPlayer
                data-aos="zoom-in"
                data-aos-duration="1500"
                playing={playing}
                controls={true}
                onStart={() => setPlaying(true)}
                onReady={() => setPlaying(true)}
                width="100%"
                height="100%"
                url={require("../../assets/videos/buymyequity.in.mp4")}
              />
            </Col>
            <Col sm={12} className="mt-4 p-5">
              <h2
                className="text-white  text-bold text-center"
                data-aos="fade-down"
              >
                Makes your path easy for investment and fund raising
              </h2>
              <p
                data-aos="fade-down"
                className="subtitle text-white mt-4 p-2 text-center"
              >
                Who you are:{" "}
              </p>
              <div className="flex-center mt-4" data-aos="fade-up">
                <Link to={"/investor"}>
                  {" "}
                  <Button variant="primary" className="m-btn">
                    {" "}
                    Investor
                  </Button>{" "}
                </Link>
                <Link to={"/startup"}>
                  {" "}
                  <Button variant="primary" className="m-btn">
                    {" "}
                    Startups
                  </Button>{" "}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid>
        <Container className="mx-auto mt-5 p-4">
          <h4 data-aos="fade-right" className="text-bold text-hover  mt-5">
            why Buymyequity.in?
          </h4>
          <p data-aos="fade-right" className=" text-dark ">
            {" "}
            About Us Buymyequity.in is a digital platform where group of
            investors keen to invest in your start up which have potential to
            create disproportionate value. Investors in buymyequity.in are
            leaders in Entrepreneurial Eco-System as they have had strong
            operational experience as CEO’s or a background of creating new and
            successful ventures. They share a passion to create scale and value
            for startup ventures. Buymyequity.in in addition to investment
            provides constant access to high quality mentoring, vast networks
            and inputs on strategy as well as execution. The Network members,
            because of their background are better able to assess the potential
            and risks at the early stage.
          </p>
          <h4 data-aos="fade-right" className="text-bold text-hover  mt-5">
            What Buymyequity.in is looking for?
          </h4>
          <p data-aos="fade-right" className=" text-dark ">
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
      <div ref={myRef}>
        <HowWork />
      </div>
      <Blogs content={blogsurl.slice(Math.max(blogsurl.length - 8, 1))} />
      {/* <ComingSoon /> */}
    </>
  );
}

export default Home;
