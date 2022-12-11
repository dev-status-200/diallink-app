import React from 'react';
import Invoices from '../components/Layouts/Invoices';
import Cookies from 'cookies';
import axios from 'axios';

const invoices = ({invoiceData }) => {
  return (
    <Invoices invoiceData={invoiceData} />
  )
}

export default invoices

export async function getServerSideProps({req,res}){
  const cookies = new Cookies(req, res)

  const adminInvoicesRqust = await axios.get(process.env.NEXT_PUBLIC_DIALLINK_GET_ADMIN_INVOICES,{
  }).then((x)=>x.data)

  return{
      props: { invoiceData:adminInvoicesRqust }
  }
}