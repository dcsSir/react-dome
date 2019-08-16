import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Spin, message, Layout, Menu, Icon} from 'antd'

import HeaderMain from '../../component/header-main'
import data from '../../utils/store'
import { reqValidateUser } from '../../api'
import { getItem } from '../../utils/storage'
import img from '../../assets/images/logo.png'
import LeftNav from '../../component/Left-nav'
import Home from '../../component/home'
import Css from './index.less'

const { Sider, Header, Content, Footer } = Layout;
const { SubMenu, Item } = Menu;

export default class Admin extends Component {
    state = {
        isLoading:true,
        collapsed:false,
        isDisplay:"block",
        logoR:"10px"
    };
        //登录验证
    loginCheck = () => {
        if(!data.user._id){
            const user = getItem();
            if(!user){
                this.props.history.replace('/login');
                return  true
            }
            reqValidateUser(user._id)
                .then(() => {
                    data.user = user;
                    this.setState({
                        isLoading:false
                    })
                })
                .catch(() => {
                    message.error("请先登陆", 3);
                    this.props.history.replace('/login')
                });

            return true;

        }else {
            return false
        }
    };

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            isDisplay: collapsed ? "none":"block",
            logoR: collapsed ? "0":"12px",
        })

    };

    render(){
        const { isLoading } = this.loginCheck();

        const { collapsed,isDisplay, logoR } = this.state;

        if(isLoading)return <Spin tip="Loading..." size='large'/>;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="admin-logo">
                        <img src={img} style={{ marginRight:logoR }} alt=""/>
                        <span style={{display:isDisplay}}>硅谷后台</span>
                    </div>
                    <LeftNav/>
                </Sider>
                <Layout>
                    {/*<Header style={{ padding: 0 }}/>*/}
                    <HeaderMain/>
                    <Content style={{ marginTop:50 }}>
                        <Home/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}