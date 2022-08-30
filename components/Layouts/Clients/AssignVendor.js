import React, {useState, useEffect} from 'react'
import {Row, Col, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

const AssignVendor = () => {

    const [searchLoad, setSearchLoad] = useState(false);
    const [city, setCity] = useState('');
    const [search, setSearch] = useState('');
    const [vendorList, setVendorList] = useState([]);

  return (
    <div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Search Vendor</Form.Label>
          <Form.Control type="text" placeholder="Enter Vendor Address" value={search} onChange={(e)=>{ setSearch(e.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" size='sm' placeholder="Enter Vendor Address" value={city} onChange={(e)=>{ setCity(e.target.value)}} />
        </Form.Group>
        <button className='custom-btn px-5' onClick={()=>{
          if(search!=""||city!=""){
            setSearchLoad(true);
          axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_SEARCH_VENDOR_POST,{
            searchword:search,
            city:city
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
                    <Row>
                        <Col>
                            <div className='name'>{x.f_name} {x.l_name}</div>{" "}
                            <span className='address'>Business: {x.business_name}</span>{" "}
                            <div className='address'>Type: {x.type}</div>{" "}
                        </Col>
                        <Col className='p-2'>
                            <span className='address'>{x.address_line}</span> <span className='address'>City: {x.city}</span><br/>
                            <span className='address'>Street: {x.street}</span>{" "}
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
