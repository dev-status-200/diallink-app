import React, { useEffect, useState } from 'react'
import {Row, Col, Form, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import axios from 'axios'

const Create = () => {
    const theme = useSelector((state) => state.theme.value);

    const [load, setLoad] = useState(false);
    const [vendorLoad, setVendorLoad] = useState(false);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [desc, setDesc] = useState('');
    const [services, setServices] = useState([{id:'', label:'', check:false}]);

    const [vendorList, setVendorList] = useState([]);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_DIALLINK_GET_SERVICES).then((x)=>{
            console.log(x.data);
            let tempService = []
            x.data.map((y)=>{
                tempService.push({id:y.id, label:y.name, check:false})
            })
            setServices(tempService)
        })
      return () => {
      };
    }, [])

    const handleSubmit = (e) => {
        setLoad(true);
        e.preventDefault();
        console.log(name, contact, city, address, start, end, desc, services);
        // axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_CREATE_ORDER_POST,{
        // }).then((x)=>{
        //     console.log(x.data);
        //     //appendClient(x.data);
        //     setLoad(false);
        //     //setVisible(false);
        // })
    }
    const searchVendor = () => {
        setVendorLoad(true)
        let tempServices = []
        services.forEach((x)=>{
            if(x.check==true){
                tempServices.push({id:x.id})
            }
        });
        axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_SEARCH_VENDOR_POST,{
            city:city,
            services:tempServices,
            address:''
        }).then((x)=>{
            let tempVendor = [];
            x.data.forEach((y)=>{
                tempVendor.push({...y, check:false})
            })
            setVendorList(tempVendor);
            setVendorLoad(false);
        })
    }
  return (
    <div className={theme=='light'?'lightTheme':'darkTheme'}>
    <div className='f-30'>New Call</div>
    <hr/>
    <Row>
    <Col md={7}>
    <Form className='' onSubmit={handleSubmit}>
        <Row>
        <Col md={5}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Client Name</Form.Label>
            <Form.Control type="text" placeholder="Name" required value={name} onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={5}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text" placeholder="Contact" required value={contact} onChange={(e)=>setContact(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={5}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required value={city} onChange={(e)=>setCity(e.target.value)} />
        </Form.Group>
        </Col>
       
        <Col md={6}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" rows={2} value={address} onChange={(e)=>setAddress(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={4}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" placeholder="City" required value={start} onChange={(e)=>setStart(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={4}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" placeholder="City" required value={end} onChange={(e)=>setEnd(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={4}></Col>
        <Col md={5}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Services</Form.Label>
            {services.map((type, index) => (
                <Form.Check 
                    key={index}
                    type={'checkbox'}
                    label={`${type.label}`}
                    onChange={()=>{
                        let tempCheck=[...services];
                        tempCheck[index].check=!tempCheck[index].check;
                        setServices(tempCheck);
                    }}
                    checked={type.check}
                />
            ))}
        </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" value={desc} onChange={(e)=>setDesc(e.target.value)} rows={2} />
        </Form.Group>
        </Col>
        </Row>
    </Form>
    </Col>
    <Col md={5}>
        <Row>
            <Col md={5}><h3 className='mt-1'>Vendors</h3></Col>
            <Col md={7}><button className='custom-btn' onClick={searchVendor}>Search</button>
            </Col>
            <Col md={12}><hr className='mt-3'/></Col>
            {!vendorLoad &&
                vendorList.map((x,index)=>{
                    return(
                        <Col md={12} className='searchList' key={index}>
                            <Form.Check style={{float:'right'}} type={'checkbox'} id={`default-`}/>
                            <div style={{fontSize:22, fontWeight:500}}>{x.f_name} {x.l_name}</div>
                            <div style={{fontSize:16}}>{x.address_line}</div>
                            <div style={{fontSize:16}}><span style={{fontWeight:500}}>Contact: </span>{x.contact}</div>
                        </Col>
                    )
                })
            }
            {vendorLoad && <Spinner className='my-3 mx-3' animation="border" size="bg" />}
            {vendorList.length==0 && <h6><hr/>No Vendor Found</h6>}
        </Row>
    </Col>
    </Row>
        <button className='custom-btn' disabled={load?true:false} type="submit">
            {!load?'Submit':<Spinner animation="border" className='mx-3' size="sm" />}
        </button>
    
    </div>
  )
}

export default Create
