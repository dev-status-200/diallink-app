import React, { useEffect, useState } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { Modal } from 'antd';
import Create from './Create';
import Router, {useRouter} from 'next/router';

const Agents = ({agentData}) => {

  const router = useRouter();

  const [requestVisible, setRequestVisible] = useState(false)
  const [agents, setAgents] = useState([]);
  const [info, setInfo] = useState({
    f_name:'', l_name:'', username:'', contact:'',
    address:'', password:'', type:'' 
  });

  useEffect(() => {
    console.log(agentData)
    setAgents(agentData)
    
  },[])

  return (
    <div className='agent-styles'>
      <Row className='box m-3'>
          <Col><h3 className='f my-2'>Agents</h3></Col>
          <Col style={{textAlign:'right'}}>
            <button className='custom-btn' onClick={()=>setRequestVisible(true)}>Create New</button>
          </Col>
          <div className='px-2'>
          <hr className='my-2' />
          </div>
        <Col md={4}>
        <div className='p-4'>
            {
              agents.map((x, index)=>{
                return(
                  <div className='user-box' key={index} onClick={()=>setInfo(x)}>
                    <Row>
                      <Col md={3}><img src='user.png' height={50} width={50} /></Col>
                      <Col>
                        <div className='in-box-name'>{x.f_name} {x.l_name}</div>
                        <div className='in-box-desig'>{x.type}</div>
                      </Col>
                    </Row>
                  </div>
                )
              })
            }
          </div>
        </Col>
        <Col md={8}>
         <div className='profile'>
            <img src={'/user.png'} height={100} />
            <Row className='my-3'>
              <Col>
                <div>General Info</div>
                <hr/>
                <div className='values'>Name: <span>{info.f_name} {info.l_name}</span></div>
                <div className='values'>Contact: <span>{info.mobile}</span></div>
                <div className='values'>Type: <span>{info.type}</span></div>
                <div className='values'>Address: <span>{info.address}</span></div>
              </Col>
              <Col>
                <div>Credentials</div>
                <hr/>
                <div className='values'>Username: <span>{info.email}</span></div>
                <div className='values'>Password: {info.password}</div>
              </Col>
            </Row>
         </div>
        </Col>
      </Row>
      <Modal 
        visible={requestVisible}
        onOk={() => setRequestVisible(false)}
        onCancel={() => setRequestVisible(false)}
        //width={800}
        footer={false}
      >
        <Create setRequestVisible={setRequestVisible} />
      </Modal>
    </div>
  )
}

export default Agents
