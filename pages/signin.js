import React from 'react'
import SignIn from '../components/Layouts/Signin'
import axios from 'axios'
import Cookies from 'cookies'
export default function signin({sessionData}) {
  return (
    <>
        <SignIn sessionData={sessionData} />
    </>
  )
}

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