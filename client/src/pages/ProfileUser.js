import React from 'react';
// import { NavLink } from "react-router-dom";
import 'antd/dist/antd.css';
import { useMutation,useQuery } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/loginUser.css';
import { Form, Input, Button, Checkbox, InputNumber } from 'antd';

import { GET_SERVICES, GET_HEALTHS, GET_SIZES, GET_SOCIABILITIES, QUERY_ME_PETSITTER} from '../utils/queries';
// import { GET_SIZES, GET_SERVICES, GET_HEALTHS, GET_SOCIABILITIES, QUERY_ME_PETSITTER } from '../utils/queries';
import { UPDATE_AVAILABILTY, UPDATE_PETSITTER, ADD_DAYSOFF } from '../utils/mutations';

const ProfileUser = () => {

  const [updateAvailability] = useMutation(UPDATE_AVAILABILTY);
  const [UpdatePetSitter] = useMutation(UPDATE_PETSITTER)


  const { TextArea } = Input;
  const onFinish = async (values) => {
    console.log('Success:', values);
    const mutationResponse = await UpdatePetSitter({
      variables: {
        description: values.description,
        ratePerNight: values.ratePerNight,
        image: values.image,
      }
    })
    console.log( values.ratePerNight)
    return mutationResponse 

  };

  const changeAvailability = async (e) => {
    e.preventDefault();
    const mutationResponse = await updateAvailability({
      variables: {
        availability: petSitter.availability
      }
    })
    if (mutationResponse) {
      window.location.reload()
    }
    
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeServices = async (checkedValues) => {
    console.log('checked = ', checkedValues);
    const mutationResponse = await UpdatePetSitter({
      variables: {
       services: checkedValues
      }
    })
    return mutationResponse 

  }

  const onChangeHealths = async (checkedValues) => {
    console.log('checked = ', checkedValues);
    const mutationResponse = await UpdatePetSitter({
      variables: {
        healthReady: checkedValues
      }
    })
    return mutationResponse 

  }

  const onChangeSizes = async (checkedValues) => {
    console.log('checked = ', checkedValues);
    const mutationResponse = await UpdatePetSitter({
      variables: {
        sizes: checkedValues
      }
    })
    return mutationResponse 

  }

  const onChangeSociability = async (checkedValues) => {
    console.log('checked = ', checkedValues);
    const mutationResponse = await UpdatePetSitter({
      variables: {
        socialReady: checkedValues
      }
    })
    return mutationResponse 

  }


  function arrayOfIds(array) {
    if(!array) return ["empty"]
    const newArray = []
    for (let x = 0; x <array?.length; x++){
      newArray.push(array[x]._id)
    }
    if (newArray) {
      return newArray
    } else {

      return ["empty"]
    }
  }

  const onChangeTextArea = e => {
    console.log('Change:', e.target.value);
  };

  const { loading: loadingPetSitter, data: dataPetSitter } = useQuery(QUERY_ME_PETSITTER); // 400ms
  
  
  const petSitter = dataPetSitter?.me.petSitter|| []
  console.log(petSitter)

  const { loading: loadingServices, data: dataServices} = useQuery(GET_SERVICES);
  const servicesList = dataServices?.services || []

  const services = []
  servicesList.map(service =>{
    services.push({label: service.name, value: service._id})
  })

  const {loading: loadingHealths, data : dataHealth} = useQuery(GET_HEALTHS);
  const healthsList = dataHealth?.healths || []


  const healths = []
  healthsList.map(health =>{
    healths.push({label: health.name, value: health._id})
  })

  const {loading: loadingSizes, data : dataSize} = useQuery(GET_SIZES);
  const sizesList = dataSize?.sizes || []


  const sizes = []
  sizesList.map(size =>{
    sizes.push({label: size.name, value: size._id})
  })

  const {loading: loadingSociabilities, data : dataSociability} = useQuery(GET_SOCIABILITIES);
  const sociabilitiesList = dataSociability?.sociabilities || []
  console.log()

  const sociabilities = []
  sociabilitiesList.map(sociability =>{
    sociabilities.push({label: sociability.name, value: sociability._id})
  })



  return (
     <Container className='container'>
    
    {loadingPetSitter ? (<div>Loading</div>) : (

    <Row>
    <div>
    <Button id='available' type="primary" htmlType="button" onClick={changeAvailability}>
          Change availability
    </Button>
    { petSitter.availability ? (<p>Available</p>) : (<p>Not available</p>)}
    </div>

    <Col sm={12} md={12} lg={12}>
    <Form
      name="basic"
      className='form'
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
    <Form.Item
    label= "Description"
    name="description"  
    onChange={onChangeTextArea} 
    initialValue= {petSitter.description}
    >
    <TextArea 
  
      />
    </Form.Item>
   
    <Form.Item
        label="Rate per Night"
        name="ratePerNight"
       
        rules={[
          {
            required: true,
            message: 'Please enter your rate!',
          },
        ]}
      >

      <InputNumber  placeholder= {petSitter.ratePerNight}     
    />
      </Form.Item>

      {loadingServices ? (
          <div>Loading...</div>
          ) : (
      <Form.Item>
      <p>Services</p>
      
      <Checkbox.Group
        options={services}
        name="services"
        defaultValue={arrayOfIds(petSitter.services)}
        onChange={onChangeServices}
      />
         
         </Form.Item> )}
      {loadingHealths ? (
          <div>Loading...</div>
          ) : (
      <Form.Item>
      <p>Healths</p>
      <Checkbox.Group
        options={healths}
        name="health"
        defaultValue={arrayOfIds(petSitter.healthReady)}
        onChange={onChangeHealths}
      />
      </Form.Item> )}
      {loadingSizes ? (
        <div>Loading...</div>
            ) : (
        <Form.Item>
        <p>Sizes</p>
     
        <Checkbox.Group
          options={sizes}
          name="sizes"
          defaultValue={arrayOfIds(petSitter.sizes)}
          onChange={onChangeSizes}
        />
        </Form.Item> )}

        {loadingSociabilities ? (
        <div>Loading...</div>
              ) : (
          <Form.Item>
          <p>Sociability</p>
          <Checkbox.Group
            options={sociabilities}
            name = "sociabilities"
            defaultValue={arrayOfIds(petSitter.socialReady)}
            onChange={onChangeSociability}
          />
         </Form.Item> )}



      <Form.Item
        label="Image"
        name="image"
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button id='submit-button' type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
  

      {/* <NavLink id="message" to="/signup-user"> Don't have an account? Sign up</NavLink> */}
    </Form>
    
    </Col>
    </Row>
      )}
    </Container>
  );

};

export default ProfileUser;