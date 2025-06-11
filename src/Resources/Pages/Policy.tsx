import React from "react";
import { Container } from "react-bootstrap";

function PolicyPage() {
  return (
    <Container
      fluid
      className="hero-bg  "
      style={{
        backgroundImage: `url(${require("../../assets/images/policy.jpg")})`,
      }}
    >
      <div className="dark-filter"></div>
      <Container className="mx-auto mt-5 p-4">
        <h1 className="text-bold text-white  mt-5" data-aos="fade-right">
          Privacy Statement
        </h1>
        <p className="text-white" data-aos="fade-right">
          {" "}
          This Privacy Statement explains our practices, including your choices
          regarding the collection, use and disclosure of certain information,
          including your personal information in connection with{" "}
          <a href="buymyequity.in">buymyequity.in</a> If you have general
          questions about your account or how to contact customer service for
          assistance, please visit our online help center at
          help@buymyequity.in. For questions specifically about this Privacy
          Statement, or our use of your personal information, cookies or similar
          technologies, please contact our Data Protection Officer/Privacy
          Office by email at{" "}
          <a href="mailto:privacy@buymyequity.in">privacy@buymyequity.in</a> The
          data controller of your personal information is Madbrain Media and
          Marketing. Please note that if you contact us to assist you for your
          safety and ours we may need to authenticate your identity before
          fulfilling your request.
        </p>
        <h4 className="text-bold text-white  mt-5" data-aos="fade-right">
          Refund Policy
        </h4>
        <p className="  text-white " data-aos="fade-right">
          {" "}
          Buymyequity.in has simple refund policy any startup doesn&rsquo;t find
          it useful can ask us for refund within 7 days of making payment.
          Buymyequity.in will not be liable to pay any refund if not asked
          within 7 days of payment. For payment refunds startups can mail us
          at&nbsp;
          <a href="mailto:refund@buymyequity.in">refund@buymyequity.in</a>
        </p>
        <h4 className="text-bold text-white  mt-5" data-aos="fade-right">
          Disclaimer:
        </h4>
        <p className="  text-white  " data-aos="fade-right">
          Buymyequity.in acts as an introducer between the investor and start-up
          companies to enable the start-up companies get the required
          investments. Services rendered by buymyequity.in are distinct and
          separate from a Stock Exchange which is set up under the provisions of
          Securities Contract Regulation Act,1956. Buymyequity.in not a Stock
          Exchange and is only a facilitator for investments.
        </p>
      </Container>
    </Container>
  );
}

export default PolicyPage;
