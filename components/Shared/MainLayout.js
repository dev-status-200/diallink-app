import { TeamOutlined, AlignLeftOutlined, ProfileOutlined, SolutionOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { CgDarkMode } from "react-icons/cg";
import Router,{ useRouter } from 'next/router';
import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux'
import { light, dark } from '/redux/features/themeSlice';

  const { Header, Sider, Content } = Layout;
  
  const MainLayout = ({children}) => {
    const router = useRouter();

    const [collapsed, setCollapsed] = useState(false);

    const theme = useSelector((state) => state.theme.value)
    const dispatch = useDispatch();

    const values = () => {
      let value = '1';
        if(router.pathname === '/dashboard'){ value='1' }
        else if(router.pathname === '/clients'){ value='2' }
        else { value='null' }
      return value
    }
    const [keys, setKeys] = useState(values());
    
    useEffect(() => {
      if(Cookies.get('theme')===undefined){
        Cookies.set('theme','light')
      }else if(Cookies.get('theme')==='dark'){
        dispatch(dark())
      }else if(Cookies.get('theme')==='light'){
        dispatch(light())
      }
      console.log(theme)
    }, [Cookies.get('theme')]);
    
    return (
      <Layout className='layoutStyles'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <span className={'darkTheme headr-icon'}>
            {React.createElement(collapsed ? AlignLeftOutlined : AlignLeftOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            </span>
            <Menu className='' style={{paddingTop:15}} theme="dark" mode="inline" defaultSelectedKeys={[keys]}>
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link href="/dashboard"><a style={{textDecoration:'none'}}>Dashboard</a></Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}>
              <Link href="/clients"><a style={{textDecoration:'none'}}>Clients</a></Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{backgroundColor:'grey'}}>
          <Header className={'dark-bg'}
          style={{ padding: 0}}>
            <span className='mx-5 f-35' style={{color:'white'}}>Welcome</span>
            <span className={'darkTheme'} style={{float:'right', marginRight:10, cursor:'pointer'}}>
              <CgDarkMode onClick={()=>{
                if(theme=='dark'){
                  dispatch(light()); Cookies.set('theme','light')
                }else if(theme=='light'){
                  dispatch(dark()); Cookies.set('theme','dark')
                }
              }}/>
            </span>
          </Header>
          <Content className={theme==='light'?'light-bg':'dark-bg'}
            style={{
              margin: '1px 0px 0px 1px',
              padding: 24, minHeight: 280,
              backgroundColor:theme==='light'?'#f0f2f5':'rgb(0 21 41)'
            }}
          > 
          <div className={theme==='light'?'lightTheme':'darkTheme'}>
            {children}
          </div>
          </Content>
        </Layout>
      </Layout>
    );
  };
export default MainLayout;