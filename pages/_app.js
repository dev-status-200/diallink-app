import '../styles/globals.css';
import 'antd/dist/antd.css';
import '../styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react'
import MainLayout from '/components/Shared/MainLayout';
import Loader from '/components/shared/Loader';

import { store } from '../redux/store';
import { Provider } from 'react-redux'

import Router, { useRouter  } from 'next/router';

function MyApp({ Component, pageProps:{ session, ...pageProps }, }) {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", () => { setLoading(true) });
  Router.events.on("routeChangeComplete", () => { setLoading(false)});

  return(
    <>
    <Provider store={store}>
    { router.pathname !='/signin' && 
          <MainLayout>
              { loading && <Loader/> }
              { !loading && <Component {...pageProps} /> }
          </MainLayout>
      }
      { router.pathname =='/signin' &&
        <Component {...pageProps} />
      }
    </Provider>
    </>
  )
}

export default MyApp
