import React from 'react';
import Vendors from '/components/Layouts/Vendors';
import Cookies from 'cookies';
import axios from 'axios';

const vendors = ({vendorData, sessionData}) => {

  return (
    <div>
      <Vendors vendorData={vendorData} sessionData={sessionData} />
    </div>
  )
}
export default vendors

export async function getServerSideProps({req,res}){
  const cookies = new Cookies(req, res)

  const requestOne = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_AUTHENTICATE_USER,{
    headers:{
        "x-access-token":`${cookies.get('token')}`
    }
  }).then((x)=>x.data)

const dataone = await requestOne

  const vendorRequest = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_GET_VENDORS_GET).then((x)=>x.data);
  return{
      props: { vendorData: vendorRequest, sessionData: dataone }
  }
}