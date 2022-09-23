import React from 'react'
import VendorAssigns from '/components/Layouts/VendorAssigns'
import Cookies from 'cookies'
import axios from 'axios'

const vendorAssigns = ({sessionData, assigningData}) => {
  return (
    <>
      <VendorAssigns assigningData={assigningData} sessionData={sessionData} />
    </>
  )
}

export default vendorAssigns

export async function getServerSideProps({req,res}){
    const cookies = new Cookies(req, res)
  
    const requestOne = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_AUTHENTICATE_USER,{
      headers:{ "x-access-token":`${cookies.get('token')}` }
    }).then((x)=>x.data)
    const dataone = await requestOne
    
    const requestTwo = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_GET_ASSIGNS).then((x)=>x.data);
    return{
        props: { sessionData: dataone, assigningData:requestTwo }
    }
  }