import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { listPostDetails, createPostReview } from "../actions/postActions";
import { POST_CREATE_REVIEW_RESET } from "../constants/postConstants";

const PostScreen = ({ history, match }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postReviewCreate = useSelector((state) => state.postReviewCreate);
  const {
    success: successPostReview,
    loading: loadingPostReview,
    error: errorPostReview,
  } = postReviewCreate;

  useEffect(() => {
    if (successPostReview) {
      setComment("");
    }
    if (!post._id || post._id !== match.params.id) {
      dispatch(listPostDetails(match.params.id));
      dispatch({ type: POST_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successPostReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPostReview(match.params.id, { comment }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
                  {/* <Col>{post.createdAt}</Col>- */}
                  <Col>Lecture : {post.readTime} minutes </Col>
                </Row>
                <p className='mt-4 font-weight-bold'>
                  Auteur : Jaoued Mouetamid
                </p>
              </Col>
            </Row>

            <Container className='w-75 content'>
              <h2 className='text-center'>Contenu du post</h2>
              <p>{post.description}</p>
            </Container>
            <Container className='w-75 m-auto pt-5'>
              <h3>Commentaires</h3>
              {post.reviews.length === 0 && (
                <Message>Aucun commentaire</Message>
              )}
              <ListGroup variant='flush'>
                {post.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>

                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  {successPostReview && (
                    <Message variant='success'>
                      Merci pour votre commentaire
                    </Message>
                  )}
                  {loadingPostReview && <Loader />}
                  {errorPostReview && (
                    <Message variant='danger'>{errorPostReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='comment'>
                        <Form.Label>Ecrire un commentaire</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingPostReview}
                        type='submit'
                        variant='primary'
                      >
                        Envoyer
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Merci de vous <Link to='/login'>connecter</Link> pour
                      commenter{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Container>
          </Container>
        </>
      )}
    </>
  );
};

export default PostScreen;
