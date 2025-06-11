import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { countries } from "../../content/countries";
import { toast } from "react-toastify";
import { loadProgressBar } from "axios-progress-bar";
import Uploader from "./components/uploder";
import { default as whatsapp } from "../../assets/icons/whatsapp.svg";
import ReactPlayer from "react-player";
import {
  submitPaymentDetails,
  submitStartupFiles,
  submitStartupForm,
} from "../../service/Api";
import { Dialog } from "primereact/dialog";
import { default as UPI } from "../../assets/icons/upi.svg";
const BGIMG = require("../../assets/images/startup.jpg");
const PhonePay = require("../../assets/images/phonepay.jpeg");

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function StartUp() {
  const showToast = toast;
  const [states, setStates] = useState(countries[0].states);
  const [page, setPage] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [state, handleSubmit] = useState({
    submitting: false,
    success: false,
    error: false,
  });
  const fileInit = {
    video: null,
    logo: null,
    doc: null,
    thumb: null,
    pancard: null,
    companytype: null,
    businessproof: null,
    ownershipproof: null,
  };
  const formInit = {
    tradename: "",
    companyname: "",
    businessmodel: "",
    website: "",
    yest: "",
    email: "",
    country: "",
    state: "",
    city: "",
    industry: "",
    stage: "profitable",
    sector: "",
    offering: "",
    description: "",
  };
  const paymentInit = {
    payee_name: "",
    payee_number: "",
    amount: "",
    date: "",
    payment_id: "",
  };
  const [files, setFiles] = useState(fileInit);
  const [paymentForm, setPaymentForm] = useState(paymentInit);
  const [form, setForm] = useState(formInit);
  useEffect(() => {
    if (form.country) {
      setStates(countries.filter((x) => form.country === x.country)[0].states);
      setForm({ ...form, state: states[0] });
    }
  }, [form.country]);

  const onUploadfiles = (obj) => {
    setFiles({ ...files, ...obj });
    if (obj["video"]) {
      showToast("Video Uploaded", { type: "success" });
    }
    if (obj["logo"]) {
      showToast("Logo Uploaded", { type: "success" });
    }
    if (obj["doc"]) {
      showToast("Document Uploaded", { type: "success" });
    }
    if (obj["thumb"]) {
      showToast("Thumbnail Uploaded", { type: "success" });
    }
  };
  const onFormChange = (obj) => {
    setForm({ ...form, ...obj });
  };
  const onPaymentFormChange = (obj) => {
    setPaymentForm({ ...paymentForm, ...obj });
  };
  const onFormValidate = () => {
    let isvalid = true;
    if (!form.email.match(emailRegex)) {
      document.getElementById("email").classList.add("is-invalid");
      document.getElementById("email").focus();
      isvalid = false;
    } else {
      document.getElementById("email").classList.remove("is-invalid");
    }

    return isvalid;
  };
  const onPaymentFormValidate = (obj: any) => {
    if (!paymentForm.payee_name) {
      document.getElementById("payee_name").classList.add("is-invalid");
      document.getElementById("payee_name").focus();
    } else {
      document.getElementById("payee_name").classList.remove("is-invalid");
    }
    if (
      !paymentForm.payee_number ||
      !paymentForm.payee_number.match(/^[0-9]{10}$/)
    ) {
      document.getElementById("payee_number").classList.add("is-invalid");
      document.getElementById("payee_number").focus();
    } else {
      document.getElementById("payee_number").classList.remove("is-invalid");
    }
    if (!paymentForm.amount) {
      document.getElementById("amount").classList.add("is-invalid");
      document.getElementById("amount").focus();
    } else {
      document.getElementById("amount").classList.remove("is-invalid");
    }
  };
  const copyText = (entryText) => {
    navigator.clipboard.writeText(entryText);
    showToast(`"yogeshkraga@ibl" Copied `);
  };
  const onNext = () => {
    // setPage(page + 1);
    if (
      !form.tradename ||
      !form.companyname ||
      !form.businessmodel ||
      !form.website ||
      !form.yest ||
      !form.email ||
      !form.country ||
      !form.state ||
      !form.city ||
      !form.industry ||
      !form.stage ||
      !form.sector ||
      !form.offering
    ) {
      showToast("Please fill all the fields", { type: "error" });
      window.scrollTo(0, 0);
      return;
    } else {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };
  const onSubmit = () => {
    if (
      !form.tradename ||
      !form.companyname ||
      !form.businessmodel ||
      !form.website ||
      !form.yest ||
      !form.email ||
      !form.city ||
      !form.industry ||
      !form.sector ||
      !form.offering
    ) {
      showToast("Please fill all the fields", { type: "error" });
      setPage(1);
      return;
    } else if (
      !paymentForm.payee_number ||
      !paymentForm.amount ||
      !paymentForm.payment_id
    ) {
      showToast("Please fill Payment Details", { type: "error" });
      setPage(3);
      return;
    } else {
      const submitForm = new FormData();
      if (
        files.pancard ||
        files.companytype ||
        files.businessproof ||
        files.ownershipproof
      ) {
        submitForm.append("video", files.video);
        submitForm.append("logo", files.logo);
        submitForm.append("doc", files.doc);
        submitForm.append("thumbnail", files.thumb);
        submitForm.append("pancard", files.pancard);
        submitForm.append("companytype", files.companytype);
        submitForm.append("businessproof", files.businessproof);
        submitForm.append("ownership", files.ownershipproof);
        // console.log(files);
        // console.log(submitForm);
        handleSubmit({ ...state, submitting: true });
        submitStartupForm(form)
          .then((res) => {
            if (res.status === 200) {
              submitForm.append("body", JSON.stringify(res.data));
              //  console.log(submitForm);
              submitForm.append("startup_id", res.data.id);
              submitStartupFiles(submitForm)
                .then((fileRes) => {
                  if (fileRes.status === 200) {
                    submitPaymentDetails({
                      ...paymentForm,
                      startup_id: res.data.id,
                    })
                      .then((finalRes) => {
                        if (finalRes.status === 200) {
                          //  showToast("Form Submitted", { type: "success" });
                          showToast("Your Details Submitted successfully!", {
                            type: "success",
                          });
                          console.log(finalRes);
                          const url = window.URL.createObjectURL(
                            new Blob([finalRes.data])
                          );
                          const link = document.createElement("a");
                          link.href = url;
                          link.setAttribute(
                            "download",
                            `Invoice_bme_${new Date().getTime()}.pdf`
                          ); //or any other extension
                          document.body.appendChild(link);
                          link.click();
                          setPaymentForm(paymentInit);
                          setForm(formInit);
                          setFiles(fileInit);
                          handleSubmit({
                            ...state,
                            submitting: false,
                            success: true,
                          });
                          setPage(4);
                        }
                      })
                      .catch((err) => {
                        showToast(err.response.data.message, { type: "error" });
                      });
                  }
                })
                .catch((err) => {
                  showToast(err.response.data.message, { type: "error" });
                });
            }
          })
          .catch((err) => {
            showToast(err.response.data.message, { type: "error" });
          });
      } else {
        showToast("Please upload all the files", { type: "error" });
      }
    }
  };

  loadProgressBar();
  return (
    <Container
      fluid
      className="investor-bg"
      style={{
        backgroundImage: "url(" + BGIMG + ")",
      }}
    >
      <Dialog
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw", padding: "0px" }}
      >
        <ReactPlayer
          data-aos="zoom-in"
          data-aos-duration="1500"
          playing={showDialog}
          controls={true}
          width="100%"
          height="100%"
          url={require("../../assets/videos/whiteboardanimation.mp4")}
        />
      </Dialog>
      <div className="dark-filter"></div>
      <Container className="mx-auto h-100 p-2 flex-center mb-5 ">
        <Row className="flex-center mt-5">
          <Col sm={12}>
            <h1 className="text-bold text-white text-center">
              Register your Startup
            </h1>
          </Col>
          <Col sm={7} className="mt-4">
            <Form className="form">
              {
                {
                  1: (
                    <>
                      {" "}
                      <Row>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="tradename">
                            <Form.Label>
                              Trade Name <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={form.tradename}
                              onChange={(e) =>
                                onFormChange({ tradename: e.target.value })
                              }
                              type="text"
                              placeholder="Trade Name"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="companyname">
                            <Form.Label>
                              Register Company Name{" "}
                              <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={form.companyname}
                              onChange={(e) =>
                                onFormChange({ companyname: e.target.value })
                              }
                              type="text"
                              placeholder="Register Company Name"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="businessmodel"
                          >
                            <Form.Label>
                              Year of Establishment{" "}
                              <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={form.yest}
                              onChange={(e) =>
                                onFormChange({ yest: e.target.value })
                              }
                              type="text"
                              placeholder="Year of Establishment"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="website">
                            <Form.Label>Website</Form.Label>
                            <Form.Control
                              value={form.website}
                              onChange={(e) =>
                                onFormChange({ website: e.target.value })
                              }
                              type="text"
                              placeholder="company Website"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="country">
                            <Form.Label>
                              Country <span className="required">*</span>
                            </Form.Label>
                            <Form.Select
                              value={form.country}
                              onChange={(e) =>
                                onFormChange({ country: e.target.value })
                              }
                            >
                              {" "}
                              {countries.map((item) => (
                                <option>{item.country}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="state">
                            <Form.Label>
                              State <span className="required">*</span>
                            </Form.Label>
                            <Form.Select
                              value={form.state}
                              onChange={(e) =>
                                onFormChange({ state: e.target.value })
                              }
                            >
                              {states.map((item) => (
                                <option>{item}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="city">
                            <Form.Label>
                              City <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={form.city}
                              onChange={(e) =>
                                onFormChange({ city: e.target.value })
                              }
                              type="text"
                              placeholder="Enter your city"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="email">
                            <Form.Label>
                              E-mail <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={form.email}
                              onBlur={onFormValidate}
                              onChange={(e) =>
                                onFormChange({ email: e.target.value })
                              }
                              type="email"
                              placeholder="E-mail"
                            />
                            <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="industry">
                            <Form.Label>
                              Industry <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={form.industry}
                              onChange={(e) =>
                                onFormChange({ industry: e.target.value })
                              }
                              type="text"
                              placeholder="Industry"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="stage">
                            <Form.Label>
                              Company Stage <span className="required">*</span>
                            </Form.Label>
                            <Form.Select
                              value={form.stage}
                              onChange={(e) =>
                                onFormChange({ stage: e.target.value })
                              }
                            >
                              <option>Profitable</option>
                              <option>Non-Profitable</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col sm={12}>
                          <Form.Group className="mb-3" controlId="sector">
                            <Form.Label>
                              Sector <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={form.sector}
                              onChange={(e) =>
                                onFormChange({ sector: e.target.value })
                              }
                              type="text"
                              placeholder="Type your business sector"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="offering">
                            <Form.Label>
                              Offering <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={form.offering}
                              onChange={(e) =>
                                onFormChange({ offering: e.target.value })
                              }
                              type="text"
                              placeholder="Your offering"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="model">
                            <Form.Label>
                              Business Model <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={form.businessmodel}
                              onChange={(e) =>
                                onFormChange({ businessmodel: e.target.value })
                              }
                              type="text"
                              placeholder="Type your business model"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.Description"
                          >
                            <Form.Label>Description </Form.Label>
                            <Form.Control
                              value={form.description}
                              onChange={(e) =>
                                onFormChange({ description: e.target.value })
                              }
                              as="textarea"
                              rows={10}
                              placeholder="Tell us more about your company"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Card className="shadow-sm mb-3">
                        <Card.Body>
                          <Row>
                            <Col sm={12}>
                              <Uploader
                                maxSize={800000}
                                label="Upload Logo Image"
                                setRequireFile={(img) =>
                                  onUploadfiles({ logo: img })
                                }
                                filetype={"image"}
                                value={files.logo}
                              />
                            </Col>
                            <Col sm={12}>
                              <Uploader
                                maxSize={800000}
                                label="Upload Thumbnail Image"
                                setRequireFile={(img) =>
                                  onUploadfiles({ thumb: img })
                                }
                                filetype={"image"}
                                value={files.thumb}
                              />
                            </Col>

                            <Col sm={12}>
                              <p
                                className="text-primary h6  cursor-pointer mt-3"
                                onClick={() => setShowDialog(true)}
                              >
                                How to create the video!{" "}
                                <a className="text-link">Watch tutorial</a>
                              </p>
                              <Uploader
                                maxSize={5000000000}
                                label="Upload Video file"
                                setRequireFile={(vid) =>
                                  onUploadfiles({ video: vid })
                                }
                                filetype={"video"}
                                value={files.video}
                              />
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </>
                  ),
                  2: (
                    <>
                      {" "}
                      <Container className="mx-auto p-2">
                        <h4 className="text-white">
                          Upload Required Documents
                        </h4>
                        <Row className="p-3 ">
                          <Col sm={12}>
                            <Uploader
                              important={true}
                              maxSize={2000000}
                              label={` PAN Card `}
                              value={files.pancard}
                              setRequireFile={(pdf) =>
                                onUploadfiles({ pancard: pdf })
                              }
                              filetype={"pdf"}
                            />
                          </Col>
                          <Col sm={12}>
                            <Uploader
                              important={true}
                              maxSize={2000000}
                              label=" Company Type "
                              filetype={"pdf"}
                              value={files.companytype}
                              setRequireFile={(pdf) =>
                                onUploadfiles({ companytype: pdf })
                              }
                            />
                          </Col>
                          <Col sm={12}>
                            <Uploader
                              important={true}
                              maxSize={2000000}
                              label=" Business Proof "
                              filetype={"pdf"}
                              value={files.businessproof}
                              setRequireFile={(pdf) =>
                                onUploadfiles({ businessproof: pdf })
                              }
                            />
                          </Col>
                          <Col sm={12}>
                            <Uploader
                              important={true}
                              maxSize={2000000}
                              label=" Director's/Owner's Documents"
                              filetype={"pdf"}
                              value={files.ownershipproof}
                              setRequireFile={(pdf) =>
                                onUploadfiles({ ownershipproof: pdf })
                              }
                            />
                          </Col>
                        </Row>
                      </Container>
                    </>
                  ),
                  3: (
                    <Container className="mx-auto flex-center  flex-column p-2">
                      <h4 className="text-white ">Create payment</h4>
                      <h3 className="text-white text-start  ">
                        {" "}
                        Pay : ₹2100/-
                      </h3>
                      <Row className="p-3 ">
                        <Col sm={12} className="flex-center  flex-column">
                          <img
                            src={PhonePay}
                            alt=""
                            style={{
                              width: "20rem",
                            }}
                          />
                          <div
                            className="bg-white p-3"
                            style={{
                              width: "20rem",
                            }}
                          >
                            <p className="text-dark  cursor-pointer h4 mt-2">
                              <img src={UPI} className="icon-lg mx-2 " alt="" />{" "}
                              <span onClick={() => copyText("yogeshkraga@ibl")}>
                                yogeshkraga@ibl
                              </span>
                            </p>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <h4 className="text-white text-center  ">
                          {" "}
                          After payment done please update the payment status
                        </h4>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="payee_name">
                            <Form.Label>
                              Payee Name <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={paymentForm.payee_name}
                              onBlur={(e) =>
                                onPaymentFormValidate({
                                  payee_name: e.target.value,
                                })
                              }
                              onChange={(e) =>
                                onPaymentFormChange({
                                  payee_name: e.target.value,
                                })
                              }
                              type="text"
                              placeholder="Payee Name"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="payee_name">
                            <Form.Label>
                              Payee Phone Number{" "}
                              <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={paymentForm.payee_number}
                              onChange={(e) =>
                                onPaymentFormChange({
                                  payee_number: e.target.value,
                                })
                              }
                              type="number"
                              placeholder="Phone Number"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="amount">
                            <Form.Label>
                              Paid Amount : ₹{" "}
                              <span className="required">*</span>
                            </Form.Label>
                            <Form.Control
                              value={paymentForm.amount}
                              onChange={(e) =>
                                onPaymentFormChange({
                                  amount: e.target.value,
                                })
                              }
                              type="number"
                              placeholder="Amount Paid"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="amount">
                            <Form.Label>PaymentID :</Form.Label>
                            <Form.Control
                              value={paymentForm.payment_id}
                              onChange={(e) =>
                                onPaymentFormChange({
                                  payment_id: e.target.value,
                                })
                              }
                              type="text"
                              placeholder="Payment ID"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Container>
                  ),
                  4: (
                    <Container
                      className="mx-auto flex-center flex-column"
                      style={{ maxWidth: "50rem" }}
                    >
                      <h4 className="text-white text-center ">
                        {" "}
                        After Submission update the payment screenshot in our
                        whatsapp
                      </h4>
                      <a
                        href="https://wa.me/message/2SUHZQ5VEJCTO1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={whatsapp}
                          className="logo cursor-pointer"
                          alt=""
                        />
                      </a>
                    </Container>
                  ),
                }[page]
              }

              {/* ////// */}

              {/* /////////////// */}
              {page === 4 ? (
                <div className="flex-center">
                  <Button
                    className="m-btn"
                    variant="primary"
                    onClick={() => setPage(1)}
                  >
                    Back to start
                  </Button>
                </div>
              ) : (
                <div className="flex-center">
                  {page === 2 || page === 3 ? (
                    <Button
                      className="m-btn"
                      variant="primary"
                      onClick={() => setPage(page - 1)}
                    >
                      Back
                    </Button>
                  ) : (
                    <></>
                  )}
                  <Button
                    className="m-btn"
                    variant="primary"
                    disabled={state.submitting}
                    onClick={
                      page === 1 ? onNext : page === 2 ? onNext : onSubmit
                    }
                  >
                    {page === 1
                      ? "Next"
                      : page === 2
                      ? "Next"
                      : state.submitting
                      ? "Submitting.."
                      : "Submit"}
                  </Button>
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default StartUp;
