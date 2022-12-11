import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';

const Invoices = ({invoiceData, sessionData}) => {

  const [ records, setRecords ] = useState([])

  useEffect(() => {
    setRecords(invoiceData)
  }, []);
  
  const calculateUnPaidInvoices = (data) => {
    let inv = 0;
    data.forEach(x => {
      if(x.Invoices.length>0){
        x.Invoices.forEach((y)=>{
          if(y.is_paid==0){
            inv = inv + 1
          }
        })
      } 
    });
    return inv
  }
  const totalPendingPay = (data) => {
    let amount = 0.0;
    data.forEach(x => {
      if(x.Invoices.length>0){
        x.Invoices.forEach((y)=>{
          if(y.is_paid==0){
            amount = amount + parseFloat(y.amount)
          }
        })
      } 
    });
    return amount
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
                <th>Name</th>
                <th>Business</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Pending</th>
              </tr>
            </thead>
            <tbody>
            {
              records.map((x, index) => {
              return (
              <tr key={index} className='f' >
                <td>{x.f_name} {x.l_name}</td>
                <td>{x.business_name}</td>
                <td>{x.contact}</td>
                <td>{x.email}</td>
                <td>
                  <div>Invoices: <span style={{color:'blue'}}>{calculateUnPaidInvoices(x.Calls)}</span></div>
                  <div>Rs. <span style={{color:'red'}}>{totalPendingPay(x.Calls)}</span></div>
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