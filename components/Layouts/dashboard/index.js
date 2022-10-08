import React,{ useEffect, useState } from 'react'
import Router from 'next/router';
import io from "socket.io-client";
import Agent from './Agent';
import Admin from './Admin';
import Cookies from 'js-cookie'

const Dashboard = ({sessionData}) => {

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if(Cookies.get('type')=='admin'){
      setIsAdmin(true)
    }
    return () => {
    };
  }, [])
  return (
    <div>
      {isAdmin && <Admin/>}
      {!isAdmin && <Agent/>}
    </div>
  )
}

export default Dashboard
