import React, { useEffect, useState } from 'react'
import {Row, Col, Form, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import axios from 'axios'

const Create = ({appendClient, setVisible}) => {  

    const theme = useSelector((state) => state.theme.value);

    const [load, setLoad] = useState(false);


    const [f_name, setF_Name] = useState('');
    const [l_name, setL_Name] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');


    const handleSubmit = (e) => {
        setLoad(true);
        e.preventDefault();
        axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_CREATE_CLIENT_POST,{
            f_name:f_name,
            l_name:l_name,
            contact:contact,
            address_line:address,
            city:city,
            zip:zip
        }).then((x)=>{
            appendClient(x.data);
            setLoad(false);
            setF_Name(''); setL_Name(''); setContact('');
            setCity(''); setZip(''); setAddress('');
            setVisible(false);
        })
    }
  return (
    <div className={theme=='light'?'lightTheme':'darkTheme'}>
    <div className='f-30'>Create A New Client</div>
    <hr/>
    <Form className='' onSubmit={handleSubmit}>
      <Row>
        <Col >
        <Row>
        <Col md={6}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" required value={f_name} onChange={(e)=>setF_Name(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last Name" required value={l_name} onChange={(e)=>setL_Name(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Contact</Form.Label>
          <Form.Control type="text" placeholder="Contact" required value={contact} onChange={(e)=>setContact(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required value={city} onChange={(e)=>setCity(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="text" placeholder="zip" required value={zip} onChange={(e)=>setZip(e.target.value)} />
        </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Address Line</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Address" required  value={address} onChange={(e)=>setAddress(e.target.value)} />
      </Form.Group>
        </Col>
      </Row>
      <button className='custom-btn' disabled={load?true:false} type="submit">{!load?'Submit':<Spinner animation="border" className='mx-3' size="sm" />}</button>
    </Form>
    </div>
  )
}

export default Create
