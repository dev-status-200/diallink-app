import React, { useEffect, useState } from 'react'
import {Row, Col, Form, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import axios from 'axios'

const Create = ({setRequestVisible, appendAgent}) => {  

    const theme = useSelector((state) => state.theme.value);

    const [load, setLoad] = useState(false);


    const [f_name, setF_Name] = useState('');
    const [l_name, setL_Name] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('agent');

    useEffect(()=>{
      console.log(type)
    },[type])

    const handleSubmit = (e) => {
        setLoad(true);
        e.preventDefault();
        axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_CREATE_USER,{
            f_name:f_name,
            l_name:l_name,
            contact:contact,
            address_line:address,
            username:username,
            password:password,
            type:type
        }).then((x)=>{
            appendAgent(x.data);
            setLoad(false);
            setF_Name(''); setL_Name(''); setContact('');
            setUsername(''); setPassword(''); setType(''); setAddress('');
            setRequestVisible(false);
        })
    }
  return (
    <div className={theme=='light'?'lightTheme':'darkTheme'}>
    <div className='f-30'>Create A New User</div>
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
          <Form.Label>Type</Form.Label>
          <Form.Select required value={type} defaultValue='agent' onChange={(e)=>setType(e.target.value)}>
            <option disabled>select</option>
            <option value="agent">agent</option>
            <option value="admin">admin</option>
          </Form.Select>
        </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="username" required value={username} onChange={(e)=>setUsername(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="passsword" required value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Address</Form.Label>
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
