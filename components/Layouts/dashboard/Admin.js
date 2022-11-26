import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'

const Admin = ({adminCallsData}) => {

  const [ calls, setCalls ] = useState({
    complete:0,
    cancel:0,
    ongoing:0,
  }) 

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
    console.log(complete)
    console.log(cancel)
    console.log(ongoing)

    setCalls({
      complete:complete,
      cancel:cancel,
      ongoing:ongoing,
    })
    
    return () => { };
  }, [])

  return (
    <div>
      <div className={''}>
        <Row className='box m-3'>
          <Col md={3}>
           <div className='completeCalls'>
            <h5 className='wh'>Completed Calls</h5>
            <h3 className='wh'>{calls.complete}</h3>
           </div> 
          </Col>
          <Col md={3}>
           <div className='ongoingCalls'>
            <h5 className='wh'>Ongoing Calls</h5>
            <h3 className='wh'>{calls.ongoing}</h3>
           </div> 
          </Col>
          <Col md={3}>
           <div className='cancelCalls'>
            <h5 className='wh'>Cancelled Calls</h5>
            <h3 className='wh'>{calls.cancel}</h3>
           </div> 
          </Col>
          {/* <Col><h3 className='f my-2'>Calls</h3></Col>
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
          </div> */}
        </Row>
      </div>
    </div>
  )
}

export default Admin
