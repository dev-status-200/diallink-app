
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Pay() {
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState('');

  function loadRazorpay() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post(process.env.NEXT_PUBLIC_DIALLINK_SYS_ACCEPT_VENDOR_PAY_POST, {
          amount: orderAmount,
        });
        const { amount, id: order_id, currency } = result.data;

        const options = {
          key: 'rzp_live_I417iReKRgjqLH',
          amount: amount,
          currency: currency,
          name: 'Test User',
          description: 'Test transaction',
          order_id: order_id,
          handler: async function (response) {
            console.log(response)
            alert(result.data.msg);
          },
          prefill: {
            name: 'example name',
            email: 'email@example.com',
            contact: '111111',
          },
          notes: {
            address: 'example address',
          },
          theme: {
            color: '#80c0f0',
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  return (
    <div className="App">
      <h1> Vendor Pament Test</h1>
      <hr />
      <div>
        <h2> Pay Amount</h2>
        <label>
          Amount:{' '}
          <input
            placeholder="INR"
            type="number"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
          ></input>
        </label>

        <button disabled={loading} onClick={loadRazorpay}>
          Razorpay
        </button>
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default Pay;