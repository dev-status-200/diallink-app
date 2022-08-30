import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Table } from 'react-bootstrap';
import { CloseCircleOutlined, EditOutlined, InfoCircleOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Popconfirm } from 'antd';

const View = ({unApprovedVendors, appendVendor}) => {

  const [load, setLoad] = useState(false);
  const [vendorList, setVendorList] = useState([]);

  useEffect(() => {
    setVendorList(unApprovedVendors)
  }, []);

  const approveVendor = async(x) => {
    setLoad(true);
    await axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_GET_APPROVE_VENDOR_POST,{id:x.id})
    .then((y)=>{
      if(y.data[0]==1){
        let tempState = [...vendorList];
        tempState = tempState.filter((y)=>{
          return y.id!=x.id
        })
        setVendorList(tempState)
        let returnState = x;
        returnState.active=1;
        appendVendor(x)
        setLoad(false);
      }
    })
  }

  return (
    <div style={{minHeight:400, maxHeight:400}}>
        <h4>Up Coming Requests</h4>
      <hr/>
      {load && <div style={{textAlign:'center', marginTop:150}}><Spinner animation="border" role="status" /></div>}
        {!load && <Table className='tableFixHead'>
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
              <th>Actions</th>
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
                  <Popconfirm
                    title="Approve This Vendor?"
                    onConfirm={()=>approveVendor(x)}
                    //onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                  <InfoCircleOutlined className='modify-info' />
                </Popconfirm>
                </span> <span className='mx-1'>  </span>
                <span>
                  <EditOutlined className='modify-edit' />
                </span>
              </td>
            </tr>
              )
            })
          }
          </tbody>
        </Table>}
    </div>
  )
}

export default View
