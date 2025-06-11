import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { default as register } from "../../assets/icons/checklist.svg";
import { default as photo_camera } from "../../assets/icons/photo-camera.svg";
import { default as growth } from "../../assets/icons/growth.svg";
import { default as money } from "../../assets/icons/money.svg";
import { Timeline } from "primereact/timeline";
function HowWork() {
  const processLine = [
    {
      status: `Register`,
      process: `Signup and register your company to get in touch with investors`,
      icon: "pi pi-check-square",
      color: "#6363ff",
      svg: register,
    },
    {
      status: `Upload Your Pitch`,
      process: `Create a video to pitch your idea, so investor can watch it and invest in your comnapany`,
      icon: "pi pi-cloud-upload",
      color: "#6363ff",
      svg: photo_camera,
    },
    {
      status: `Submit Your Plan`,
      process: `Find out all the details in the form along with a video and requirements and submit`,
      icon: "pi pi-chart-bar",
      color: "#6363ff",
      svg: growth,
    },
    {
      status: `Pay For Registration`,
      process: `As you submit your plan, pay a registration amount for showcasing your pitch to investors `,
      icon: "pi pi-wallet",
      color: "#6363ff",
      svg: money,
    },
  ];
  const customizedMarker = (item) => {
    return (
      <span
        className="custom-marker p-shadow-2"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };
  const customizedContent = (item, i) => {
    return (
      <Card
        className="card-list-group mb-5 mt-4 "
        data-aos={i % 2 ? "fade-right" : "fade-left"}
        data-aos-duration="1500"
      >
        <Card.Body className="p-2 flex-start  ">
          <Row>
            <Col sm={3}>
              {" "}
              <div className="p-3 mr-2">
                <img
                  src={item.svg}
                  style={{
                    width: "4rem",
                  }}
                  alt=""
                />
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-column p-3">
                <h4 className="text-primary text-start">{item.status}</h4>
                <p className="subtitle-primary text-start">{item.process}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };
  return (
    <Container
      fluid
      className=" mt-4"
      //   style={{
      //     backgroundImage: `url(${require("../../assets/images/how-work.jpg")})`,
      //   }}
    >
      <Container className="mx-auto p-4">
        <h3 className="text-hover text-bold text-primary ">How It works?</h3>
        <div className="p-2 mt-5">
          <Timeline
            value={processLine}
            align="alternate"
            className="timeline-demo"
            marker={customizedMarker}
            content={customizedContent}
          />
        </div>
      </Container>
    </Container>
  );
}

export default HowWork;
