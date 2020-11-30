import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Post = ({ post }) => {
  return (
    <Card className='my-3 card rounded'>
      <Card.Img className='card-img' src={post.image} variant='top' />
      <Card.Body className='mb-2'>
        <a href={`/posts/${post._id}`}>
          <Card.Text>
            <p className='h3'>{post.name}</p>
          </Card.Text>
        </a>
        <p>{post.description.slice(0, 30)}...</p>
      </Card.Body>

      <Row className='p-2 '>
        <Col>{post.createdAt.substring(0, 10)}</Col>-
        <Col>Lecture : {post.readTime} minutes </Col>
      </Row>
    </Card>
  );
};

export default Post;
