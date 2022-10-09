import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Modal } from 'antd';

import { CloseCircleOutlined, EditOutlined, InfoCircleOutlined, StarOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'
import axios from 'axios';
import Create from './Create';

const Agent = ({callsData}) => {

  const [ visible, setVisible ] = useState(false);

  const [ callList, setCallList ] = useState([{Vendor:{id:'',f_name:'', l_name:''}}]);
  
  useEffect(() => {
    setCallList(callsData)
    console.log(callsData)
    let interval = setInterval(async() => {
      await axios.get(process.env.NEXT_PUBLIC_DIALLINK_GET_GET_ALL_CALLS,{
        headers:{
          "id":`${Cookies.get('loginId')}`
        }
      }).then((x)=>{
        if(x.status==200){ setCallList(x.data) }
      })
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const appendCall = (x) => {
    let tempState = [...callList];
    tempState.unshift(x);
    setCallList(tempState);
  }

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
            {
              callList.map((x, index) => {
              return (
              <tr key={index} className='f'>
                <td>{index + 1}</td>
                <td>{x.tasks}</td>
                <td>{x.customer}</td>
                <td>{x.address}</td>
                <td>
                  {
                    x.status=='0'?<span style={{color:'grey', fontWeight:700}}>Un Assigned</span>:
                    x.status=='1'?<span style={{color:'#bdab47', fontWeight:700}}>Pending</span>:
                    x.status=='2'?<span style={{color:'#2a58d5', fontWeight:700}}>Assigned</span>:
                    <span style={{color:'#1f841a', fontWeight:700}}>Completed</span>
                  }
                </td>
                <td>{x.Vendor!=null?x.Vendor.f_name:'----'} {x.Vendor!=null?x.Vendor.l_name:''}</td>
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
      >
        <Create appendCall={appendCall} setVisible={setVisible} />
      </Modal>
    </div>
  )
}

export default Agent;