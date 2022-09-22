import React, {useState, useEffect} from 'react'
import {Row, Col, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

const AssignVendor = () => {

    const [searchLoad, setSearchLoad] = useState(false);
    const [city, setCity] = useState('');
    const [service, setService] = useState('');
    const [search, setSearch] = useState('');
    const [vendorList, setVendorList] = useState([]);

  return (
    <div>
      <h2>Search Venor</h2>
      <hr/>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter Address" value={search} onChange={(e)=>{ setSearch(e.target.value)}} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter City" value={city} onChange={(e)=>{ setCity(e.target.value)}} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Service</Form.Label>
              <Form.Control type="text" placeholder="Enter City" value={service} onChange={(e)=>{ setService(e.target.value)}} />
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
          {!searchLoad && 
            <div>
              {vendorList.map((x, index)=>{
                return(
                <div className='searchList' key={index}>
                    <h4 className=''>{x.business_name}</h4>{" "}
                    <Row>
                        <Col md={6}>
                          <div><span className=''>Vendor Name: </span><span className='name'> {x.f_name} {x.l_name}</span></div>
                          <div><span className=''>Services: </span><span className='name'> {x.services}</span></div>
                        </Col>
                        <Col md={6} className=''>
                            <span>Address: </span><span className='name'>{x.address_line}</span><br/>
                            <span className='address'>City: {x.city}</span>{" "}
                            <span className='address'>ZIP: {x.postal_code}</span>
                        </Col>
                    </Row>
                  
                  
                  
                  
                </div>
                )
              })}
            </div>
          }
        </div>
    </div>
  )
}

export default AssignVendor
