import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Modal } from 'antd';
import Form from 'react-bootstrap/Form';
import { CloseCircleOutlined, EditOutlined, InfoCircleOutlined, StarOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'
import axios from 'axios';
import Create from './Create';
import Edit from './Edit';
import moment from 'moment';

const Agent = ({callsData}) => {

  const [ visible, setVisible ] = useState(false);
  const [ editVisible, setEditVisible ] = useState(false);
  const [ callStatus, setCallStatus ] = useState('all');
  const [ callList, setCallList ] = useState([{Vendor:{id:'', f_name:'', l_name:''}}]);
  const [ selectedCall, setSelectedCall ] = useState({})

  useEffect(() => {
    setCallList(callsData)
    let interval = setInterval(async() => {
      await axios.get(process.env.NEXT_PUBLIC_DIALLINK_GET_GET_ALL_CALLS,{
        headers:{
          "id":`${Cookies.get('loginId')}`
        }
      }).then((x)=>{
        if(x.status==200){ setCallList(x.data) }
      })
    }, 120000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const appendCall = (x) => {
    let tempState = [...callList];
    tempState.unshift(x);
    setCallList(tempState);
  }

  const updateCall = (x) => {
    console.log(x)
     let tempState = [...callList];
     let i = tempState.findIndex((y=>x.id==y.id));
     tempState[i].status = x.status;
     tempState[i].VendorId = x.VendorId;
     tempState[i].Vendor = x.Vendor;
    // setUserList(tempState);
}

  return (
    <div>
      <div className={''}>
        <Row className='box m-3'>
          <Col><h3 className='f my-2'>Calls</h3></Col>
          <Col>
          <Row style={{textAlign:'right'}}>
            <Col md={4}></Col>
            <Col md={4}>
            <Form.Select aria-label="Default select example" onChange={(e)=>setCallStatus(e.target.value)}>
              <option value='all'>All Calls</option>
              <option value="0" style={{color:'#ae1313', fontWeight:500}}>Rejected</option>
              <option value="1" style={{color:'#bdab47', fontWeight:500}}>Pending</option>
              <option value="2" style={{color:'#2a58d5', fontWeight:500}}>Approved</option>
              <option value="3" style={{color:'#1f841a', fontWeight:500}}>Completed</option>
            </Form.Select>
            </Col>
            <Col md={4}> 
            <button className='custom-btn' onClick={()=>setVisible(true)}>Create New</button>
            </Col>
          </Row>
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
                <th>Created</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
            {
              callList.filter((x)=>{
                if(callStatus=='all'){
                  return x
                }else{
                  return x.status==callStatus
                }
              }).map((x, index) => {
              return (
              <tr key={index} className='f' >
                <td>{index + 1}</td>
                <td>{x.tasks}</td>
                <td>{x.customer}</td>
                <td>{x.address}</td>
                <td>
                  {
                    x.status=='0'?<span style={{color:'#ae1313', fontWeight:700}}>Rejected</span>:
                    x.status=='1'?<span style={{color:'#bdab47', fontWeight:700}}>Pending</span>:
                    x.status=='2'?<span style={{color:'#2a58d5', fontWeight:700}}>Approved</span>:
                    <span style={{color:'#1f841a', fontWeight:700}}>Completed</span>
                  }
                </td>
                <td>{x.Vendor!=null?x.Vendor.f_name:'----'} {x.Vendor!=null?x.Vendor.l_name:''}</td>
                <td>{moment(x.createdAt).fromNow()}</td>
                <td>
                  <span style={{cursor:'pointer'}} onClick={()=>{
                        if(x.status=='0'){setSelectedCall(x);
                        setEditVisible(true);}
                      }}>
                    <EditOutlined className='modify-edit' />
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
      >
        <Create appendCall={appendCall} setVisible={setVisible} />
      </Modal>
      <Modal 
        visible={editVisible}
        onOk={() => setEditVisible(false)}
        onCancel={() => setEditVisible(false)}
        width={1000}
        footer={false}
      >
        <Edit selectedCall={selectedCall} setEditVisible={setEditVisible} updateCall={updateCall} setSelectedCall={setSelectedCall} />
      </Modal>
    </div>
  )
}

export default Agent;