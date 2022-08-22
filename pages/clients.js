import React, {useEffect} from 'react';
import Clients from '../components/Layouts/Clients';
import Router from 'next/router';
import Cookies from 'cookies';
import axios from 'axios';

const clients = ({clientData, sessionData}) => {

  return (
    <div>
      <Clients clientData={clientData} sessionData={sessionData} />
    </div>
  )
}
export default clients

export async function getServerSideProps({req,res}){
  const cookies = new Cookies(req, res)

  const requestOne = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_AUTHENTICATE_USER,{
    headers:{
        "x-access-token":`${cookies.get('token')}`
    }
  }).then((x)=>x.data)

const dataone = await requestOne

  const cleintRequest = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_GET_CLIENTS_GET).then((x)=>x.data);
  return{
      props: { clientData: cleintRequest, sessionData: dataone }
  }
}