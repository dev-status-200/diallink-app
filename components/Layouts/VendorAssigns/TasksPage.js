import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Spinner, Table } from 'react-bootstrap';
import axios from 'axios';
import { Modal } from 'antd';

const TasksPage = ({selectedAssign}) => {

    const [taskVisible, setTaskVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');

    const [tasksLoad, setTasksLoad] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        console.log(selectedAssign)
    },[selectedAssign])

    useEffect(()=>{
        setTasksLoad(true)
        axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_GET_TASKS,{
            headers:{ "id":`${selectedAssign.id}` }
        }).then((x)=>{
            console.log(x.data)
            setTasks(x.data)
            setTasksLoad(false)
        })
    },[selectedAssign])

    const createTask = async(e) => {
        e.preventDefault();
        await axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_CREATE_TASK,{
            clientAssignId:selectedAssign.id,
            start_date:startDate,
            end_date:endDate,
            title:title,
            price:price
        }).then((x)=>{
            
            let tempState = [...tasks];
            tempState.unshift(x.data);
            setTasks(tempState);
            
            setStartDate("")
            setEndDate("")
            setPrice("")
            setTitle("")
            setTaskVisible(false)
        })
    }

  return (
    <div>
      <Row>
        <Col md={6}>
            <h4>Client: {selectedAssign.Client.f_name} {selectedAssign.Client.l_name}</h4>
            <h4>Vendor: {selectedAssign.Vendor.f_name} {selectedAssign.Vendor.l_name}</h4>
            <h6>{selectedAssign.Client.address_line}</h6>
        </Col>
        <Col>
            <button style={{float:'right', margin:20}} className='custom-btn' 
                onClick={()=>{ setTaskVisible(true) }}
            >Add Task</button>
        </Col>
      </Row>
      <hr/>
      <Table className='tableFixHead'>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Title</th>
                <th>Cost</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {
            tasks.map((x, index) => {
            return (
            <tr key={index} className='hover-table'>
              <td>{index + 1}</td>
              <td>{x.title}</td>
              <td>{x.price}</td>
              <td>{x.start_date}</td>
              <td>{x.end_date}</td>
              <td>Active</td>
            </tr>
              )
            })}
            </tbody>
            </Table>
      <Modal 
        visible={taskVisible}
        onOk={() => setTaskVisible(false)}
        onCancel={() => setTaskVisible(false)}
        footer={false}
        width={800}
        bodyStyle={{backgroundColor:'white', borderRadius:1}}
        style={{color:'black'}}
      >
        <h5>Add A Task</h5>
        <hr/>
        <Form onSubmit={createTask}>
         <Row>
            <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Task Title" required value={title} onChange={(e)=>setTitle(e.target.value)} />
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="Task Cost" required value={price} onChange={(e)=>setPrice(e.target.value)} />
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" placeholder="Task Cost" required value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" placeholder="Task Cost" required value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
            </Form.Group>
            </Col>
            <Col md={6}>
                <button className='custom-btn my-3' type={'submit'}>Submit</button>
            </Col>
         </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default TasksPage
