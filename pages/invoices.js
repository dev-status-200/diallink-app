import React from 'react';
import Invoices from '../components/Layouts/Invoices';
import Cookies from 'cookies';
import axios from 'axios';

const invoices = ({invoiceData, sessionData }) => {
  return (
    <Invoices invoiceData={invoiceData} sessionData={sessionData} />
  )
}

export default invoices

export async function getServerSideProps({req,res}){
  const cookies = new Cookies(req, res)

  const requestOne = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_SYS_AUTHENTICATE_USER,{
    headers:{
        "x-access-token":`${cookies.get('token')}`
    }
  }).then((x)=>x.data);

  const adminInvoicesRqust = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_GET_ADMIN_INVOICES,{
  }).then((x)=>x.data)

const dataone = await requestOne

  return{
      props: { sessionData: dataone, invoiceData:adminInvoicesRqust }
  }
}