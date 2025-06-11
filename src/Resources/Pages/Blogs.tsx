import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { blogsurl } from "../../content/blogsurl";
function Blogs(props) {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    if (props.content) {
      setBlogs(props.content);
    } else {
      setBlogs(blogsurl);
    }
  }, []);
  return (
    <Container
      fluid
      className="hero-bg flex-center"
      style={{
        backgroundImage: `url(${require("../../assets/images/news.jpg")})`,
      }}
    >
      <div className="dark-filter"></div>

      <Container className="mx-auto   p-2">
        <h1
          className="text-bold text-white text-center mt-5"
          data-aos="fade-down"
        >
          Blogs
        </h1>
        <Row>
          <Col sm={10} className="mx-auto">
            {blogs.map((item, i) => {
              return (
                <Card className="blog-cards">
                  <Card.Body>
                    <div className="overlay">
                      <a href={item.url}>
                        {" "}
                        <Button variant="primary" className="m-btn">
                          Read more ..
                        </Button>
                      </a>
                    </div>
                    <img className="image" src={item.img} alt="" />
                    {/* <iframe
                      scrolling="no"
                      src={item.url}
                      title="W3Schools Free Online Web Tutorials"
                      style={{ width: "100%", height: "100%" }}
                    ></iframe> */}
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Blogs;
