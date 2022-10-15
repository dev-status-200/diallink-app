import React, { useEffect } from 'react';
import Cookies from 'cookies';
import axios from 'axios';
import Dashboard from '/components/Layouts/dashboard';

const dashboard = ({sessionData, callsData}) => {

  return (
    <div>
      <Dashboard sessionData={sessionData} callsData={callsData} />
    </div>
  )
}
export default dashboard

export async function getServerSideProps({req,res}) {

  const cookies = new Cookies(req, res)
  const requestOne = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_AUTHENTICATE_USER,{
      headers:{
          "x-access-token":`${cookies.get('token')}`
      }
    }).then((x)=>x.data)
  const requesTwo = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_GET_GET_ALL_CALLS,{
    headers:{
      "id":`${cookies.get('loginId')}`
    }
  }).then((x)=>x.data)
  
  const dataone = await requestOne
  const dataTwo = await requesTwo
  return{
      props: { sessionData: dataone, callsData:dataTwo }
  }
}