import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Table } from 'react-bootstrap';
import { CloseCircleOutlined, EditOutlined, InfoCircleOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';

const View = ({unApprovedVendors}) => {

  const [load, setLoad] = useState(false);
  const [vendorList, setVendorList] = useState([]);

  useEffect(() => {
    console.log(unApprovedVendors)
    setVendorList(unApprovedVendors)
  }, [])

  return (
    <div>
      <Row>
        <Col>
            <h4>Up Coming Requests</h4>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
        <Table className='tableFixHead'>
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Business Name</th>
                  <th>Postal Code</th>
                  <th>Street</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
              {
                vendorList.map((x, index) => {
                return (
                <tr key={index} className='f'>
                  <td>{index + 1}</td>
                  <td>{x.f_name} {x.l_name}</td>
                  <td>{x.contact}</td>
                  <td>{x.address_line}</td>
                  <td>{x.city}</td>
                  <td>{x.business_name}</td>
                  <td>{x.postal_code}</td>
                  <td>{x.street}</td>
                  <td>
                    <span>
                      <InfoCircleOutlined className='modify-info'
                        onClick={()=>{
                          setVisible(true);
                        }}
                      />
                    </span> <span className='mx-1'> | </span>
                    <span>
                      <EditOutlined className='modify-edit' />
                    </span> <span className='mx-1'> | </span>
                    <span>
                      <CloseCircleOutlined className='modify-red'/>
                    </span>
                  </td>
                </tr>
                  )
                })
              }
              </tbody>
              </Table>
        </Col>
      </Row>
    </div>
  )
}

export default View
