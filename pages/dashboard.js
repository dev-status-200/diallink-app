import React from 'react';
import Router from 'next/router';
import Cookies from 'cookies';
import axios from 'axios';

const dashboard = ({sessionData}) => {

  React.useEffect(() => {
    console.log(sessionData)
    if(sessionData.isLoggedIn==false){
        Router.push('/signin')
    }
    
}, [sessionData])

  return (
    <div>
      dashboard
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
  
  const dataone = await requestOne
  return{
      props: { sessionData: dataone }
  }
}