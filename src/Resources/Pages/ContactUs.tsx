import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { contactUsFormSubmit } from "../../service/Api";
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function ContactUs() {
  const [state, handleSubmit] = useState({
    submitting: false,
    success: false,
    error: false,
  });
  const showToast = toast;
  const creds_init = {
    name: "",
    email: "",
    phone: "",
    message: "",
    identity: "Investor",
  };
  const [creds, setCreds] = useState(creds_init);

  const onFormValidate = (obj) => {
    handleSubmit({ ...state, error: false });
    if (!obj.email.match(emailRegex)) {
      document.getElementById("email").classList.add("is-invalid");
      handleSubmit({ ...state, error: true });
    } else {
      document.getElementById("email").classList.remove("is-invalid");
    }
    if (!obj.phone.match(/^[0-9]{10}$/)) {
      document.getElementById("phone").classList.add("is-invalid");
      handleSubmit({ ...state, error: true });
    } else {
      document.getElementById("phone").classList.remove("is-invalid");
    }
  };
  const onFormChange = (obj) => {
    setCreds({ ...creds, ...obj });
  };
  const onSubmitForm = (e) => {
    if (
      !state.error &&
      creds.name &&
      creds.email &&
      creds.phone &&
      creds.message
    ) {
      handleSubmit({ ...state, submitting: true });
      contactUsFormSubmit(creds)
        .then((res) => {
          if (res.status === 200) {
            showToast("Message sent successfully", { type: "success" });
            handleSubmit({ ...state, success: true, submitting: false });
            setCreds(creds_init);
          }
        })
        .catch((err) => {
          showToast("Error in sending message", { type: "error" });
          handleSubmit({ ...state, error: true });
        });
    } else {
      showToast("Please fill all the fields", { type: "error" });
    }
  };
  return (
    <Container
      fluid
      className="hero-bg flex-center"
      style={{
        backgroundImage: `url(${require("../../assets/images/contactus.jpg")})`,
      }}
    >
      <div className="dark-filter"></div>
      <Container className="mx-auto  p-4">
        <Row>
          <Col sm={5}>
            <h1 className="text-bold text-white  ">Contact Us</h1>
            <div className="flex-start ">
              <p className="text-start subtitle text-white">
                <strong>email:</strong>{" "}
                <a href="mailto:info@buymyequity.in">*******equity.in</a>
                <br />
                <strong>Phone:</strong> +91 ******2111
              </p>
            </div>
          </Col>
          <Col sm={7}>
            <h1 className="text-bold text-white  ">Get In Touch</h1>
            <form className="form">
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>
                      Name <span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      value={creds.name}
                      onBlur={(e) => onFormValidate({ name: e.target.value })}
                      onChange={(e) => onFormChange({ name: e.target.value })}
                      type="text"
                      placeholder="Name"
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>
                      Phone <span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      value={creds.phone}
                      onBlur={(e) => onFormValidate({ phone: e.target.value })}
                      onChange={(e) => onFormChange({ phone: e.target.value })}
                      type="number"
                      placeholder="Phone Number"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your phone number with anyone else.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>
                      E-mail <span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      value={creds.email}
                      onBlur={(e) => onFormValidate({ email: e.target.value })}
                      onChange={(e) => onFormChange({ email: e.target.value })}
                      type="email"
                      placeholder="E-mail"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="identity">
                    <Form.Label>
                      Identity Type <span className="required">*</span>
                    </Form.Label>
                    <Form.Select
                      value={creds.identity}
                      onChange={(e) =>
                        onFormChange({ identity: e.target.value })
                      }
                    >
                      <option>Investor</option>
                      <option>Startup</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      value={creds.message}
                      onChange={(e) =>
                        onFormChange({ message: e.target.value })
                      }
                      as="textarea"
                      rows={10}
                      placeholder="Ask us anything"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="primary"
                disabled={state.submitting}
                onClick={onSubmitForm}
                className="m-btn"
              >
                {state.submitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ContactUs;
