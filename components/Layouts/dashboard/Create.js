import React, { useEffect, useState } from 'react';
import {Row, Col, Form, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie'

const Create = ({appendCall, setVisible, edit}) => {

    const [load, setLoad] = useState(false);
    const [vendorLoad, setVendorLoad] = useState(false);

    const [allVendor, setAllVendor] = useState(false);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [desc, setDesc] = useState('');
    const [services, setServices] = useState([{id:'', label:'', check:false}]);

    const [searchAddress, setSearchAddress] = useState('');
    const [vendorList, setVendorList] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState({});

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_DIALLINK_GET_SERVICES).then((x)=>{
            console.log(x.data);
            let tempService = []
            x.data.map((y)=>{
                tempService.push({id:y.id, label:y.name, check:false})
            })
            setServices(tempService)
        })
      return () => { }
    }, [])

    const handleSubmit = async(e) => {
        setLoad(true);
        e.preventDefault();
        let selectedServices = '';
        services.forEach((x, index) => {
            if(x.check==true){
                if(selectedServices==''){
                    selectedServices = x.label;
                }else{
                    selectedServices = selectedServices +', '+ x.label 
                }
            }
        })
        await axios.post(process.env.NEXT_PUBLIC_DIALLINK_POST_CREATE_CALL,{
            name:name, contact:contact, city:city, address:address,
            VendorId:selectedVendor.id, UserId:Cookies.get('loginId'), email:email,
            description:desc, services:selectedServices, status:Object.keys(selectedVendor).length>0?1:0,
        }).then(async(x)=>{
            if(x.status==200){
                appendCall(x.data);
                setVisible(false);

                await axios.post(process.env.NEXT_PUBLIC_DIALLINK_SEND_NOTIFICATION,{
                    devices:[selectedVendor.device_id],
                    heading:"Upcoming Call!",
                    msg:"Expiring in 10 minutes!"
                }).then((x)=>console.log(x.data));
            }
            setLoad(false);
        })
    }

    const searchVendor = () => {
        setSelectedVendor({})
        setVendorLoad(true);
        let tempServices = [];
        services.forEach((x) => {
            if(x.check==true){
                tempServices.push({id:x.id});
            }
        });
        axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_SEARCH_VENDOR_POST,{
            city:city,
            services:tempServices,
            address:searchAddress,
            allVendor:allVendor
        }).then((x) => {
            let tempVendor = [];
            x.data.forEach((y) => {
                tempVendor.push({...y, check:false})
            })
            setVendorList(tempVendor);
            setVendorLoad(false);
        })
    }

  return(
    <div>
    <div className='f-30'>New Call</div>
    <hr/>
    <Row>
    <Col md={7}>
    <Form className='' onSubmit={handleSubmit}>
        <Row>
        <Col md={4}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Name" required value={name} onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={4}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Contact" required value={contact} onChange={(e)=>setContact(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={4}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="City" required value={city} onChange={(e)=>setCity(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={5}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={2} placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
        </Form.Group>
        </Col>
        <Col md={5}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Select Services</Form.Label>
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
        <Col md={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)} rows={2} />
        </Form.Group>
        </Col>
        </Row>
        {vendorList.length>0 && <button className='custom-btn' disabled={load?true:false} type="submit">
            {!load?'Submit':<Spinner animation="border" className='mx-3' size="sm" />}
        </button>}
    </Form>
    </Col>
    <Col md={5}>
    <Row>
        <Col md={12}><h5 className='mt-1'>Search Vendors</h5></Col>
        <Col md={12}><Form.Check type="checkbox" checked={allVendor} onChange={()=>setAllVendor(!allVendor)} label="Get All" /></Col>
        <Col md={6}><Form.Control placeholder="Any Similar Place" value={searchAddress} onChange={(e)=>setSearchAddress(e.target.value)} /></Col>
        <Col md={6}><button className='custom-btn' onClick={searchVendor}>Search</button></Col>
        <Col md={12}><hr className='mt-2'/></Col>
        <div style={{maxHeight:500, overflowY:'auto'}}>
        {!vendorLoad &&
            vendorList.map((x,index)=>{
            return(
                <Col md={12} className='searchList' key={index} onClick={()=>{
                    let tempCheck = [...vendorList];
                    tempCheck.forEach((y, index)=>{
                        if(y.id==x.id){
                            tempCheck[index].check=true;
                            setSelectedVendor(tempCheck[index]);
                        }
                        else{ tempCheck[index].check=false }
                    })
                    setVendorList(tempCheck)
                }}>
                    <Form.Check style={{float:'right'}} type={'checkbox'} checked={x.check?true:false} />
                    <div style={{fontSize:22,fontWeight:500}}>{x.f_name} {x.l_name}</div>
                    <div style={{fontSize:15}}>{x.address_line}</div>
                    <div style={{fontSize:16}}><span style={{fontWeight:500}}>Contact: </span>{x.contact}</div>
                </Col>
            )})
        }
        </div>
        { vendorLoad && <Spinner className='my-3 mx-3' animation="border" size="bg" /> }
        { vendorList.length==0 && <h6><hr/>No Vendor Found</h6> }
    </Row>
    </Col>
    </Row>
        
    </div>
  )
}

export default Create