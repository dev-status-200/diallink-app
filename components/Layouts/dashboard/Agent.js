import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Modal } from 'antd';

import { CloseCircleOutlined, EditOutlined, InfoCircleOutlined, StarOutlined } from '@ant-design/icons';

import axios from 'axios';
import Create from './Create';

const Agent = () => {

  const [ visible, setVisible ] = useState(false);

  const [vendorList, setvendorList] = useState([]);

  useEffect(() => {
  }, []);


  return (
    <div>
      <div className={''}>
        <Row className='box m-3'>
          <Col><h3 className='f my-2'>Calls</h3></Col>
          <Col style={{textAlign:'right'}}>
            <button className='custom-btn' onClick={()=>setVisible(true)}>Create New</button>
          </Col>
          <div className='px-2'>
          <hr className='my-2' />
          </div>
          <div className='table-sm-1 mt-3'>
            <Table className='tableFixHead'>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Task</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Status</th>
                <th>Assigned Vendor</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
            {/* {
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
            } */}
            </tbody>
            </Table>
          </div>
        </Row>
      </div>
      <Modal 
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={false}
      >
        <Create/>
      </Modal>
    </div>
  )
}

export default Agent;