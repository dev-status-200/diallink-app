import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Modal } from 'antd';

import { useSelector } from 'react-redux';
import { CloseCircleOutlined, EditOutlined, InfoCircleOutlined, StarOutlined } from '@ant-design/icons';

import axios from 'axios';
import View from './View';

const Vendors = ({vendorData, unApprovedVendors}) => {

  const [ visible, setVisible ] = useState(false);
  const [ requestVisible, setRequestVisible ] = useState(false);
  
  const theme = useSelector((state) => state.theme.value);

  const [vendorList, setvendorList] = useState([]);

  useEffect(() => {
    setvendorList(vendorData)
  }, []);

  const appendVendor = (x) => {
    let tempState = [...vendorList];
    tempState.unshift(x);
    setvendorList(tempState);
  }

  return (
    <div>
      <div className={theme=='light'?'lightTheme':'darkTheme'}>
        <Row className='box m-3'>
          <Col><h3 className='f my-2'>Vendors</h3></Col>
          <Col style={{textAlign:'right'}}>
            <button className='custom-btn' onClick={()=>setRequestVisible(true)}>New Requests</button>
          </Col>
          <div className='px-2'>
          <hr className='my-2' />
          </div>
          <div className='table-sm-1 mt-3'>
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
          </div>
        </Row>
      </div>
      <Modal 
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={false}
        bodyStyle={{backgroundColor:theme=='light'?'white':'#162A46', borderRadius:1}}
        style={{color:theme=='light'?'black':'white'}}
      >
        Request View
      </Modal>
      <Modal 
        visible={requestVisible}
        onOk={() => setRequestVisible(false)}
        onCancel={() => setRequestVisible(false)}
        width={1000}
        footer={false}
        bodyStyle={{backgroundColor:theme=='light'?'white':'#162A46', borderRadius:1}}
        style={{color:theme=='light'?'black':'white'}}
      >
        <View unApprovedVendors={unApprovedVendors} appendVendor={appendVendor} />
      </Modal>
    </div>
  )
}

export default Vendors;