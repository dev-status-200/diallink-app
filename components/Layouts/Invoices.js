import { CloseCircleOutlined, EditOutlined, InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Popconfirm } from 'antd';
import axios from 'axios';
import Router from 'next/router'

const Invoices = ({invoiceData}) => {

  const [ records, setRecords ] = useState([]);

  useEffect(() => {
    let tempState = [...invoiceData];
    tempState.forEach((z)=>{
      z.pendingInvoices = 0
      z.amountPending = 0
      z.paidInvoices = 0
      z.amountPaid = 0
      if(z.Calls.length>0){
        z.Calls.forEach((x)=>{
          if(x.Invoices.length>0){
            x.Invoices.forEach((y)=>{
              if(y.is_paid==0){
                z.pendingInvoices = z.pendingInvoices + 1
              }
              if(y.is_paid==0){
                z.amountPending = z.amountPending + parseFloat(y.amount)
              }
              if(y.is_paid!=0){
                z.paidInvoices = z.paidInvoices + 1
              }
              if(y.is_paid!=0){
                z.amountPaid = z.amountPaid + parseFloat(y.amount)
              }
            })
          } 
        })
      }
    })
    console.log('tempState',tempState)
    tempState.sort(function(a, b){return b.pendingInvoices-a.pendingInvoices});
    setRecords(tempState);
  }, []);
  
  const enable = async(id, device_id) => {
    await axios.post(process.env.NEXT_PUBLIC_DIALLINK_POST_ENABLE_VENDOR,{
      id:id, device_id:device_id
    }).then((x)=>{
      alert("Vendor Enabled!");
      Router.push('/invoices')
    })
  }
  const disable = async(id, device_id) => {
    await axios.post(process.env.NEXT_PUBLIC_DIALLINK_POST_DISABLE_VENDOR,{
      id:id, device_id:device_id
    }).then((x)=>{
      alert("Vendor Disabled!");
      Router.push('/invoices')
    })
  }

  return (
    <div className='box m-3'>
      <Row className='p-2'>
        <Col md={12}><h2 className='f my-2'>Invoices</h2></Col>
        <hr/>
        <Col md={12}>
        <div className='table-sm-1 mt-3'>
            <Table className='tableFixHead'>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Name</th>
                <th>Business</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Pending</th>
                <th>Paid</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
            {
              records.map((x, index) => {
              return (
              <tr key={index} className='f' style={{backgroundColor:x.active==0?'#e6bcbc':'white'}}>
                <td>{index+1}</td>
                <td>{x.f_name} {x.l_name}</td>
                <td>{x.business_name}</td>
                <td>{x.contact}</td>
                <td>{x.email}</td>
                <td>
                  <div>Calls: <span style={{color:'blue'}}>{x.pendingInvoices}</span></div>
                  <div>Rs. <span style={{color:'red'}}>{x.amountPending}</span></div>
                </td>
                <td>
                  <div>Calls: <span style={{color:'blue'}}>{x.paidInvoices}</span></div>
                  <div>Rs. <span style={{color:'green'}}>{x.amountPaid}</span></div>
                </td>
                <td>
                  <Popconfirm className='m-2'
                      title="Disable This Vendor?"
                      onConfirm={x.active==1?()=>disable(x.id, x.device_id):()=>console.log('vendor Not Active')}
                      //onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                    <CloseCircleOutlined className='modify-info' style={{color:x.active==1?'red':'grey'}} />
                  </Popconfirm>
                  <Popconfirm className='m-2'
                      title="Enable This Vendor?"
                      onConfirm={x.active==0?()=>enable(x.id, x.device_id):()=>console.log('vendor Not Active')}
                      //onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                    <CheckCircleOutlined className='modify-info' style={{color:x.active==0?'green':'grey'}} />
                  </Popconfirm>
                </td>
              </tr>
                )
              })
            }
            </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Invoices