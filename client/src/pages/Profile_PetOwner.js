import React, { useState } from "react";
import "antd/dist/antd.css";
import { useMutation, useQuery } from "@apollo/client";
import { Container, Row, Col, Card, ListGroup, ButtonGroup } from "react-bootstrap";
import "../styles/loginUser.css";
import "../styles/profile.css";
import { Form, Input, Button, Radio } from "antd";

import {
  GET_HEALTHS,
  GET_SIZES,
  GET_SOCIABILITIES,
  QUERY_ME_PETOWNER,
} from "../utils/queries";

import {
  ADD_PET,
  DELETE_EVENT,
  UPDATE_EVENT_STATUS,
  DELETE_PET,
  ADD_PETSITTER_RATING,
} from "../utils/mutations";

const ProfilePetOwner = () => {
  const dateFormat = (date) => {
    let stringDate = new Date(parseInt(date)).toDateString();
    return stringDate;
  };
  const [AddPet] = useMutation(ADD_PET);
  const [UpdateEventStatus] = useMutation(UPDATE_EVENT_STATUS);
  const [DeleteEvent] = useMutation(DELETE_EVENT);
  const [DeletePet] = useMutation(DELETE_PET);
  const [AddPetSitterRating] = useMutation(ADD_PETSITTER_RATING)

  const deletePet = async (e, dogId) => {
    try {
      const mutationResponse = await DeletePet({
        variables: {
          dogId: dogId,
        },
      });
      if (mutationResponse) {
        alert("Pet deleted!");
        window.location.assign("/profile-petowner");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    const variables = {
      owner: petOwner._id,
      description: values.description,
      name: values.name,
      image: values.image,
      size: state.size,
      health: state.health,
      sociability: state.social,
    };
    console.log(variables);
    try {
      const mutationResponse = await AddPet({
        variables: {
          owner: petOwner._id,
          description: values.description,
          name: values.name,
          image: values.image,
          size: state.size,
          health: state.health,
          sociability: state.social,
        },
      });
      console.log(mutationResponse);
      if (mutationResponse) {
        alert("Pet added");
        window.location.assign("/profile-petowner");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { TextArea } = Input;

  const onChangeTextArea = (e) => {
    console.log("Change:", e.target.value);
  };

  const { loading: loadingPetOwner, data: dataPetOwner } =
    useQuery(QUERY_ME_PETOWNER); // 400ms
  const petOwner = dataPetOwner?.me.petOwner || [];

  const { loading: loadingHealths, data: dataHealth } = useQuery(GET_HEALTHS);
  const healthsList = dataHealth?.healths || [];

  const healths = [];
  healthsList.map((health) => {
    healths.push({ label: health.name, value: health._id });
  });

  const { loading: loadingSizes, data: dataSize } = useQuery(GET_SIZES);
  const sizesList = dataSize?.sizes || [];

  const sizes = [];
  sizesList.map((size) => {
    sizes.push({ label: size.name, value: size._id });
  });

  const { loading: loadingSociabilities, data: dataSociability } =
    useQuery(GET_SOCIABILITIES);
  const sociabilitiesList = dataSociability?.sociabilities || [];
  console.log();

  const sociabilities = [];
  sociabilitiesList.map((sociability) => {
    sociabilities.push({ label: sociability.name, value: sociability._id });
  });

  const [state, setFormState] = useState({
    health: "",
    social: "",
    size: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setFormState({
      ...state,
      [name]: value,
    });
    console.log(state);
  };

  const changeToPaid = async (e, id) => {
    try {
      const mutationResponse = await UpdateEventStatus({
        variables: {
          eventId: id,
          status: "Paid",
        },
      });
      console.log(mutationResponse);
      if (mutationResponse) {
        alert(
          "Congratulations! Wait for the Pet Sitter to get in contact. If you don't have an answer in a couple of hours. Contact us for a refund"
        );
        window.location.assign("/profile-petowner");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeToRejected = async (e, id) => {
    try {
      const mutationResponse = await UpdateEventStatus({
        variables: {
          eventId: id,
          status: "Rejected",
        },
      });
      console.log(id);
      console.log(mutationResponse);
      if (mutationResponse) {
        alert("Status Updated");
        window.location.assign("/profile-petowner");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteEvent = async (e, eventId, petSitterId, petOwnerId) => {
    console.log(eventId, petSitterId, petOwnerId);
    try {
      const mutationResponse = await DeleteEvent({
        variables: {
          eventId: eventId,
          petSitterId: petSitterId,
          petOwnerId: petOwnerId,
        },
      });
      if (mutationResponse) {
        alert("Event deleted!");
        window.location.assign("/profile-petowner");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addPetSitterRating = async (e, eventId, petSitterId, rating) => {
    try {
      const mutationResponse = await AddPetSitterRating({
        variables: {
          eventId: eventId,
          petSitterId: petSitterId,
          rating: rating
        }
      });
      if (mutationResponse) {
      
        alert("Rating added");
        window.location.assign("/profile-petowner");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container className="p-5 mr-0 ml-0">
      {loadingPetOwner ? (
        <div>Loading</div>
      ) : (
        <Row>
          <Col lg={6} md={12} sm={12} className="pb-3">
            <h4 className="pb-3">Add a new pet</h4>
            <Form
              name="basic"
              className="profile-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Description"
                name="description"
                onChange={onChangeTextArea}
              >
                <TextArea />
              </Form.Item>

              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {loadingHealths ? (
                <div>Loading...</div>
              ) : (
                <Form.Item>
                  <p>Healths</p>
                  <Radio.Group
                    options={healths}
                    onChange={handleChange}
                    name="health"
                  />
                </Form.Item>
              )}
              {loadingSizes ? (
                <div>Loading...</div>
              ) : (
                <Form.Item>
                  <p>Sizes</p>

                  <Radio.Group
                    options={sizes}
                    onChange={handleChange}
                    name="size"
                  />
                </Form.Item>
              )}

              {loadingSociabilities ? (
                <div>Loading...</div>
              ) : (
                <Form.Item>
                  <p>Sociability</p>
                  <Radio.Group
                    options={sociabilities}
                    onChange={handleChange}
                    name="social"
                  />
                </Form.Item>
              )}
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button id="submit-button" type="primary" htmlType="submit">
                  Add Pet
                </Button>
              </Form.Item>

              {/* <NavLink id="message" to="/signup-user"> Don't have an account? Sign up</NavLink> */}
            </Form>
          </Col>
          <Col lg={3} md={12} sm={12} className="pb-3">
            <h4 className="pb-3">Your pets</h4>
            <div id="pet-container">
              {petOwner.petsOwned.map((pet) => (
                <div className="d-flex justify-content-center pb-3">
                  <Card style={{ width: "18rem" }}>
                    <Card.Header className="d-flex justify-content-center">
                      <img
                        className="cardImage"
                        alt="puppyImage"
                        src={require("../images/puppy.jpeg")}
                      ></img>
                    </Card.Header>
                    <ListGroup>
                      <ListGroup.Item>Name: {pet.name}</ListGroup.Item>
                      <ListGroup.Item>Size: {pet.size.name}</ListGroup.Item>
                      <ListGroup.Item>
                        Description: {pet.description}
                      </ListGroup.Item>
                      <ListGroup.Item>Health: {pet.health.name}</ListGroup.Item>
                      <ListGroup.Item>
                        Sociability: {pet.sociability.name}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Rating: {pet.ratings.name}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button onClick={(e) => deletePet(e, pet._id)}>
                          Delete
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
              ))}
            </div>
          </Col>

          <Col lg={3} md={12} sm={12} className="pb-3">
            <h4 className="pb-3">Upcoming events</h4>
            <div id="event-container">
              {petOwner.eventsOwned.map((event) => (
                <div className="pb-3">
                  <Card style={{ width: "18rem" }}>
                    <Card.Header className="d-flex justify-content-center">
                      Booking for {event.pets[0].name}
                    </Card.Header>
                    <ListGroup>
                      <ListGroup.Item>
                        Name: {event.petSitter.name}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Pet name:{" "}
                        {event.pets[0] ? (
                          <span>{event.pets[0].name}</span>
                        ) : (
                          <span>Pet Deleted</span>
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Start Date: {dateFormat(event.daysOfEvent.start)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        End Date: {dateFormat(event.daysOfEvent.end)}
                      </ListGroup.Item>
                      <ListGroup.Item>Price: {event.price}</ListGroup.Item>
                      <ListGroup.Item>Status: {event.status}</ListGroup.Item>
                      <ListGroup.Item>
                        Rating:{" "}
                        {Number.isNaN(event.petsRating[0])
                          ? "No ratings yet"
                          : event.petsRating[0]}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Pet Sitter Rating:{" "}
                        {Number.isNaN(event.petSitterRating)
                          ? "No ratings yet"
                          : event.petSitterRating}
                      </ListGroup.Item>

                           
                      { !event.petsSitterRating  ? (<ButtonGroup>  
                        <Button onClick={(e) => addPetSitterRating(e, event._id, event.petSitter._id, 1)}>1</Button>
                        <Button onClick={(e) => addPetSitterRating(e, event._id, event.petSitter._id, 2)}>2</Button>
                        <Button onClick={(e) => addPetSitterRating(e, event._id, event.petSitter._id, 3)}>3</Button>
                        <Button onClick={(e) => addPetSitterRating(e, event._id, event.petSitter._id, 4)}>4</Button>
                        <Button onClick={(e) => addPetSitterRating(e, event._id, event.petSitter._id, 5)}>5</Button>
                        </ButtonGroup>) : (<span></span>)}
                      
                      <ListGroup.Item>
                        {event.status === "Confirmed" ? (
                          <div>
                            <Button onClick={(e) => changeToPaid(e, event._id)}>
                              Pay
                            </Button>
                            <Button
                              onClick={(e) => changeToRejected(e, event._id)}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span></span>
                        )}
                        {event.status === "Paid" ? (
                          <p>Wait for Pet Sitter Contact</p>
                        ) : (
                          <span></span>
                        )}
                        {event.status === "Reserved" ? (
                          <p>Wait for Pet Sitter Response</p>
                        ) : (
                          <span></span>
                        )}
                        {event.status === "Rejected" ? (
                          <div>
                            <Button
                              onClick={(e) =>
                                deleteEvent(
                                  e,
                                  event._id,
                                  event.petSitter._id,
                                  event.petOwner._id
                                )
                              }
                            >
                              Delete
                            </Button>
                            <a href="/catalog">Find someone else!</a>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProfilePetOwner;
