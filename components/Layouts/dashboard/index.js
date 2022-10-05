import React,{ useEffect } from 'react'
import Router from 'next/router';
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

const Dashboard = ({sessionData}) => {

    useEffect(() => {
        console.log(sessionData)
        if(sessionData.isLoggedIn==false){
            Router.push('/signin')
        }
        
    }, [sessionData])

    const sendMessage = () => {
      socket.emit("send_message", {message:'Hello'});
    };
    useEffect(()=>{
      socket.on("receive_message", (data) => {
        console.log(data);
      });
    },[socket])

  return (
    <div>
      <button onClick={sendMessage}>click</button>
    </div>
  )
}

export default Dashboard
