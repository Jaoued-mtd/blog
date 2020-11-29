import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import posts from "../posts";
import Post from "../components/Post";

const HomeScreen = () => {
  return (
    <div>
      <Container>
        <h1>Les derniers posts</h1>
        <Row>
          {posts.map((post) => (
            <Col sm={12} md={6} lg={4} xl={4}>
              <Post post={post}></Post>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
