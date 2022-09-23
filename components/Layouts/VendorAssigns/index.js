import React, {useState, useEffect} from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { Modal } from 'antd';

import { useSelector } from 'react-redux';

import Router from 'next/router';

import { CloseCircleOutlined, EditOutlined, InfoCircleOutlined, StarOutlined } from '@ant-design/icons';
import moment from 'moment'

const VendorAssigns = ({sessionData, assigningData}) => {

  const [ visible, setVisible ] = useState(false);
  const [ venderVisible, setVenderVisible ] = useState(false);

  const theme = useSelector((state) => state.theme.value);
  const [assigningList, setAssigningList] = useState([]);

  useEffect(() => {
    setAssigningList(assigningData)
    console.log(assigningData)
  }, []);
  
  useEffect(() => {
    console.log(sessionData)
    if(sessionData.isLoggedIn==false){
        Router.push('/signin')
    }
  }, [sessionData])

  const appendClient = (x) => {
    let tempState = [...clientList];
    tempState.unshift(x);
    setClientList(tempState);
  }

  return (
    <div>
      <div className={theme=='light'?'lightTheme':'darkTheme'}>
        <Row className='box m-3'>
          <Col><h3 className='f my-2'>Vendor Assigns</h3></Col>
          
          <div className='px-2'>
          <hr className='my-2' />
          </div>
          <div className='table-sm-1 mt-3'>
            <Table className='tableFixHead'>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Client</th>
                <th>Vendor</th>
                <th>Address</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
            {
            assigningList.map((x, index) => {
            return (
            <tr key={index} className='f'>
              <td>{index + 1}</td>
              <td>{x.Client.f_name} {x.Client.l_name}</td>
              <td>{x.Vendor.f_name} {x.Vendor.l_name}</td>
              <td style={{maxWidth:200}}>{x.Client.address_line}</td>
              <td>{x.paid=='0'?<span style={{color:'#cdad56'}}>Not Complete</span>:''}</td>
              <td>{moment(x.createdAt).fromNow()}</td>
            </tr>
              )
            })}
            </tbody>
            </Table>
          </div>
        </Row>
      </div>

      <Modal 
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        //width={800}
        footer={false}
        bodyStyle={{backgroundColor:theme=='light'?'white':'#162A46', borderRadius:1}}
        style={{color:theme=='light'?'black':'white'}}
      >
        Tasks
      </Modal>
    </div>
  )
}

export default VendorAssigns
