import React, { useEffect, useState } from 'react'
import {Row, Col, Form, Spinner } from 'react-bootstrap'
import axios from 'axios';
import Router from 'next/router'

const Edit = ({info}) => {  

    const [load, setLoad] = useState(false);

    const [ f_name, setF_Name ] = useState('');
    const [ l_name, setL_Name ] = useState('');
    const [ contact, setContact ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ type, setType ] = useState('agent');

    useEffect(()=>{
        console.log(info)
        setF_Name(info.f_name)
        setL_Name(info.l_name)
        setContact(info.contact)
        setAddress(info.address)
        setUsername(info.username)
        setPassword(info.password)
    },[info])

    const handleSubmit = (e) => {
        setLoad(true);
        e.preventDefault();
        axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_EDIT_USER,{
            f_name:f_name,
            l_name:l_name,
            contact:contact,
            address_line:address,
            username:username,
            password:password
        }).then((x)=>{
            setLoad(false);
            setF_Name(''); setL_Name(''); setContact('');
            setUsername(''); setPassword(''); setType(''); setAddress('');
            Router.push('/agents')
        })
    }

  return (
    <div className='light'>
    <div className='f-30'>Edit User</div>
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

export default Edit