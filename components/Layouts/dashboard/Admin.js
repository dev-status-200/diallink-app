import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import moment from 'moment';
import { CloseCircleOutlined, EditOutlined, InfoCircleOutlined, StarOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import axios from 'axios';

const Admin = ({adminCallsData}) => {
  const [ calls, setCalls ] = useState({
    complete:0,
    cancel:0,
    ongoing:0,
  });
  const [ status, setStatus ] = useState('');
  const [records, setRecords] = useState([])
  useEffect(() => {
    console.log(adminCallsData)
    let complete = 0
    let cancel = 0
    let ongoing = 0

    adminCallsData.forEach((x) => {
      if(x.status==3 && x.cost!=0){
        complete = complete + 1
      }
      if(x.status==2){
        ongoing = ongoing + 1
      }
      if(x.status==3 && x.cost==0){
        cancel = cancel + 1
      }
    });
    setCalls({
      complete:complete,
      cancel:cancel,
      ongoing:ongoing,
    })
    setRecords(adminCallsData);
    return () => { };
  }, [])

  const deleteCall = async(data) => {
    await axios.post(process.env.NEXT_PUBLIC_DIALLINK_POST_DELETE_CALLS,{
      data
    }).then((x)=>{
      if(x.data.result){
        let tempState = [...records];
        tempState = tempState.filter((x)=>{
          return x.id!=data.id
        })
        setRecords(tempState)
      }
    })
  }

  return (
    <div>
      <div className={''}>
        <Row className='box m-3'>
        <Col md={12}><h2 className='f my-2'>Calls</h2></Col>
          <Col md={3} onClick={()=>setStatus(3)}>
           <div className='completeCalls'>
            <h5 className='wh'>Completed Calls</h5>
            <h3 className='wh'>{calls.complete}</h3>
           </div> 
          </Col>
          <Col md={3} onClick={()=>setStatus(2)}>
           <div className='ongoingCalls'>
            <h5 className='wh'>Ongoing Calls</h5>
            <h3 className='wh'>{calls.ongoing}</h3>
           </div> 
          </Col>
          <Col md={3} onClick={()=>setStatus(1)}>
           <div className='cancelCalls'>
            <h5 className='wh'>Cancelled Calls</h5>
            <h3 className='wh'>{calls.cancel}</h3>
           </div> 
          </Col>
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
                <th>Agent</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
            {records.filter((x)=>{
                if(status==''){
                  return x
                }else{
                  return x.status==status
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
                  {x.User.f_name}
                  {" "}
                  {x.User.l_name}
                </td>
                <td className='px-4'>
                  <span>
                  <Popconfirm
                    title="Delete This Call?"
                    onConfirm={()=>{deleteCall(x)}}
                    //onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                  <CloseCircleOutlined className='modify-red'/>
                </Popconfirm>
                    
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
    </div>
  )
}

export default Admin