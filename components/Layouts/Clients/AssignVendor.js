import React, {useState, useEffect} from 'react';
import {Row, Col, Form, Spinner, Table } from 'react-bootstrap';
import axios from 'axios';
import { Popconfirm } from 'antd';

const AssignVendor = ({selectedClient}) => {

    const [searchLoad, setSearchLoad] = useState(false);
    const [city, setCity] = useState('');
    const [service, setService] = useState('');
    const [search, setSearch] = useState('');
    const [vendorList, setVendorList] = useState([]);

  return (
    <div>
      <h2>Search Venor for {selectedClient.f_name} {selectedClient.l_name}</h2>
      <div>Addresss: <b>{selectedClient.address_line}</b></div>
      <hr/>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter Address" value={search} onChange={(e)=>{ setSearch(e.target.value)}} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter City" required value={city} onChange={(e)=>{ setCity(e.target.value)}} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Service</Form.Label>
              <Form.Control type="text" placeholder="Enter Service" value={service} onChange={(e)=>{ setService(e.target.value)}} />
            </Form.Group>
          </Col>
        </Row>
        
        <button className='custom-btn px-5' onClick={()=>{
          if(search!=""||city!=""){
            setSearchLoad(true);
          axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_SEARCH_VENDOR_POST,{
            searchword:search,
            city:city,
            service:service
          }).then((x)=>{
            console.log(x.data);
            setVendorList(x.data);
            setSearchLoad(false);
          })
          }
        }}>Go</button>
        <div>
          {searchLoad && <Spinner animation="border" className='m-3' size="md" />}
          {
            !searchLoad &&
            <Table className='tableFixHead'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Services</th>
              </tr>
            </thead>
            <tbody>
            {
              vendorList.map((x, index) => {
              return (
                <Popconfirm
                    title={()=> <span>Assign <b>{x.business_name}</b> ?</span>}
                    onConfirm={()=>{
                      axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_ASSIGN_VENDOR_TO_CLIENT,{
                        name:'',
                        cost:'',
                        clientId:selectedClient.id,
                        vendorId:x.id
                      }).then((x) => {
                        console.log(x)
                      })
                    }}
                    //onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                  <tr key={index} className='hover-table'>
                  <td>{x.id}</td>
                  <td>{x.business_name}</td>
                  <td>{x.address_line}</td>
                  <td>{x.services}</td>
                </tr>
                </Popconfirm>
                )
              })
            }
            </tbody>
            </Table>
          }
        </div>
    </div>
  )
}

export default AssignVendor
