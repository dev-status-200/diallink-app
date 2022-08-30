import React, {useState, useEffect} from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { Modal } from 'antd';

import { useSelector } from 'react-redux';
import Create from './Create';

import Router from 'next/router';

import { CloseCircleOutlined, EditOutlined, InfoCircleOutlined, StarOutlined } from '@ant-design/icons';
import AssignVendor from './AssignVendor';

const Clients = ({clientData, sessionData, vendorData}) => {

  const [ visible, setVisible ] = useState(false);
  const [ venderVisible, setVenderVisible ] = useState(false);

  const theme = useSelector((state) => state.theme.value);
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    if(clientData.length>0){
      setClientList(clientData)
    }
    //console.log(vendorData)
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
    <div>
      <div className={theme=='light'?'lightTheme':'darkTheme'}>
        <Row className='box m-3'>
          <Col><h3 className='f my-2'>Clients</h3></Col>
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
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>City</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
            {
            clientList.map((x, index) => {
            return (
            <tr key={index} className='f'>
              <td>{index + 1}</td>
              <td>{x.f_name} {x.l_name}</td>
              <td>{x.contact}</td>
              <td style={{maxWidth:200}}>{x.address_line}</td>
              <td>{x.city}</td>
              <td>
                <span>
                  <InfoCircleOutlined className='modify-info' onClick={()=>{
                    setVenderVisible(true);
                  }} />
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
            })}
            </tbody>
            </Table>
          </div>
        </Row>
      </div>
      <Modal 
        visible={venderVisible}
        onOk={() => setVenderVisible(false)}
        onCancel={() => setVenderVisible(false)}
        //width={800}
        footer={false}
        bodyStyle={{backgroundColor:theme=='light'?'white':'#162A46', borderRadius:1}}
        style={{color:theme=='light'?'black':'white'}}
      >
        <AssignVendor/>
      </Modal>
      <Modal 
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        //width={800}
        footer={false}
        bodyStyle={{backgroundColor:theme=='light'?'white':'#162A46', borderRadius:1}}
        style={{color:theme=='light'?'black':'white'}}
      >
        <Create appendClient={appendClient} setVisible={setVisible} vendorData={vendorData} />
      </Modal>
    </div>
  )
}

export default Clients

/*
<Col md={4}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Search Vendor</Form.Label>
          <Form.Control type="text" placeholder="Enter Vendor Address" value={search} onChange={(e)=>{ setSearch(e.target.value)}} />
        </Form.Group>
        <button className='custom-btn px-5' onClick={()=>{
          if(search!=""){
            setSearchLoad(true);
          axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_SEARCH_VENDOR_POST,{
            searchword:search,
            city:city
          }).then((x)=>{
            console.log(x.data);
            setVendorList(x.data);
            setSearchLoad(false);
          })
          }
        }}>Go</button>
        <div>
          {searchLoad && <Spinner animation="border" className='m-3' size="md" />}
          {!searchLoad && 
            <div>
              {vendorList.map((x, index)=>{
                return(
                <div className='searchList' key={index}>
                  <div className='name'>{x.f_name} {x.l_name}</div>
                  <div className='address'>{x.address_line}</div>
                  <div className='address'>City: {x.city}</div>
                  <div className='address'>ZIP: {x.postal_code}</div>
                </div>
                )
              })}
            </div>
          }
        </div>
        </Col>
        */