import  React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { message, Modal, Button } from "antd";
import { menuList } from '../../config'
import dayjs from 'dayjs'

import { getWeather } from '../../api'
import data from '../../utils/store'
import { removeItem } from '../../utils/storage'

import './index.less'
class HeaderMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            times:""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        let path = nextProps.location.pathname;
        if(path === '/'){
            path = '/home'
        }

        for (let i = 0; i < menuList.length; i++) {
            const cMenu = menuList[i];
            if(cMenu.children){
                for (let j = 0; j < cMenu.children.length; j++) {
                    const jMenu = cMenu.children[j];
                    if (path === jMenu.key){
                        return {
                            title:jMenu.title
                        }
                    }
                }
            }else {
                if (path === cMenu.key){
                    return {
                        title:cMenu.title
                    }
                }
            }
        }
    }


    getTime = () => dayjs().format('YYYY/MM/DD HH:mm:ss');

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                times: this.getTime()
            })

        },1000)

        getWeather('深圳')

    }

    componentWillMount() {
        clearInterval(this.timer)
    }

    off = () => {
        Modal.confirm({
            title: 'Do you Want to delete these items?',
            content: '您确定要退出吗',
            okText:'确定',
            cancelText:'取消',
            onOk: () => {
                data.user = {};
                removeItem();
                message.success("退出登录成功");
                this.props.history.replace('/login')
            },
        });
    };
    render() {
        return <div className='right-header'>
            <div className='header-top'>
                <span> 欢迎 {data.user.username} </span>
                <Button onClick={this.off}>退出</Button>
            </div>
            <div className='green-line'> </div>
            <div className='header-bottom'>
                <h3 className='tips'>{this.state.title}</h3>
                <div className='weather'>
                    <span>{this.state.times}</span>
                    <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气"/>
                    <button className='off'>晴</button>
                </div>
            </div>
        </div>
    }
}

export default withRouter(HeaderMain)