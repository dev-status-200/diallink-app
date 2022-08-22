import React,{ useEffect } from 'react'
import Router from 'next/router';

const Dashboard = ({sessionData}) => {

    useEffect(() => {
        console.log(sessionData)
        if(sessionData.isLoggedIn==false){
            Router.push('/signin')
        }
        
    }, [sessionData])

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
