import React from "react";
import posts from "../posts";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";

const PostScreen = ({ match }) => {
  const post = posts.find((p) => p._id === match.params.id);
  return (
    <Container>
      <Link className='btn btn-dark my-3' to='/'>
        Retour
      </Link>
      <Row>
        <Col>
          <Image src={post.image} fluid></Image>
        </Col>
        <Col className='p-4'>
          <p className='text-uppercase'>{post.category}</p>
          <h1>{post.name}</h1>
          <Row>
            <Col>27 Novembre 2020</Col>-<Col>{post.readTime} minutes </Col>
          </Row>
          <p className='mt-4 font-weight-bold'>Jaoued Mouetamid</p>
        </Col>
      </Row>
      <Container className='w-75 m-auto'>
        <h2 className='text-center'>Contenu du post</h2>
        <p>{post.description}</p>
      </Container>
    </Container>
  );
};

export default PostScreen;
