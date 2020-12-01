import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <Container className='border-top pt-5'>
        <Row>
          <Col>
            <h6>RESEAUX SOCIAUX</h6>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Linkedin</p>
            <p>Twitter</p>
          </Col>
          <Col>
            <h6>NEWSLETTER</h6>
            <Form>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Votre Email</Form.Label>
                <Form.Control type='email' placeholder='Enter email' />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Envoyer
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
