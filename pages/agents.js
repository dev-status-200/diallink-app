import React from 'react'
import Agents from '../components/Layouts/Agents'
import Router from 'next/router';
import Cookies from 'cookies';
import axios from 'axios';

const agents = ({agentData}) => {
  return (
    <div>
      <Agents agentData={agentData} />
    </div>
  )
}

export default agents

export async function getServerSideProps({req,res}){
  const cookies = new Cookies(req, res)

  const requestOne = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_AUTHENTICATE_USER,{
    headers:{ "x-access-token":`${cookies.get('token')}` }
  }).then((x)=>x.data)
  const dataone = await requestOne
  
  const agentRequest = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_GET_ALL_USERS).then((x)=>x.data);
  return{
      props: { sessionData: dataone, agentData:agentRequest }
  }
}