import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { submitInvestorForm } from "../../service/Api";
import { toast } from "react-toastify";
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[0-9]{10}$/;

function Investor() {
  const showToast = toast;
  const formInit = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    companyname: "",
  };
  const [form, setForm] = useState(formInit);
  const [state, handleSubmit] = useState({
    submitting: false,
    success: false,
    error: false,
  });
  const handleChange = (obj) => {
    setForm({ ...form, ...obj });
  };
  const handleValidation = (obj) => {
    handleSubmit({ ...state, error: false });
    if (obj["email"] && !form.email.match(emailRegex)) {
      document.getElementById("email").classList.add("is-invalid");
      handleSubmit({ ...state, error: true });
    } else {
      document.getElementById("email").classList.remove("is-invalid");
    }
    if (obj["phone"] && !form.phone.match(phoneRegex)) {
      document.getElementById("phone").classList.add("is-invalid");
      handleSubmit({ ...state, error: true });
    } else {
      document.getElementById("phone").classList.remove("is-invalid");
    }
  };
  const onSubmit = () => {
    if (form.first_name.length > 0 && form.last_name.length > 0) {
      handleSubmit({ ...state, submitting: true });
      submitInvestorForm(form)
        .then((res) => {
          // console.log(res);
          showToast(
            `Thank you ${res.data.first_name}! 
            We received your information `,
            {
              type: "success",
              autoClose: 6000,
            }
          );
          handleSubmit({ ...state, success: true, submitting: false });
          setForm(formInit);
        })
        .catch((err) => {
          console.log(err);
          showToast(err.message, {
            type: "error",
            autoClose: 2000,
          });
        });
    } else {
      showToast("Please fill all the fields", {
        type: "error",
        autoClose: 2000,
      });
      handleSubmit({ ...state, error: true, submitting: false });
    }
  };
  return (
    <Container fluid className="investor-bg">
      <div className="dark-filter"></div>
      <Container className="mx-auto h-100 p-2 flex-center">
        <Row className="flex-center">
          <Col sm={12}>
            <h1 className="text-bold text-white text-center">
              Register as Investor
            </h1>
          </Col>
          <Col sm={7} className="mt-4">
            <Form className="form" onSubmit={onSubmit}>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      First Name <span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={form.first_name}
                      onChange={(e) =>
                        handleChange({ first_name: e.target.value })
                      }
                    />
                    {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Last Name <span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={form.last_name}
                      onChange={(e) =>
                        handleChange({ last_name: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>
                      Email <span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onBlur={(e) => {
                        handleValidation({ email: e.target.value });
                      }}
                      onChange={(e) => handleChange({ email: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>
                      Phone <span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Phone"
                      value={form.phone}
                      onBlur={(e) => {
                        handleValidation({ phone: e.target.value });
                      }}
                      onChange={(e) => handleChange({ phone: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Company Name"
                      value={form.companyname}
                      onChange={(e) =>
                        handleChange({ companyname: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="flex-center">
                <Button
                  className="m-btn"
                  variant="primary"
                  disabled={state.submitting}
                  onClick={onSubmit}
                >
                  {state.submitting ? "Submitting.." : "Submit"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Investor;
