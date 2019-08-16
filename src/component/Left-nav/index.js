
import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon,  } from "antd"
import { menuList } from '../../config/index'
const { SubMenu, Item }  = Menu;


class LeftNav extends Component {
    constructor(props){
        super(props);
        this.path = this.props.location.pathname;
        this.menus = this.createMenus(this.path)
    }

    createMenus = (path) => {
        const menus = menuList.map((navigationItem) => {
            if(navigationItem.children){
                return <SubMenu
                    key={navigationItem.key} title={<span><Icon type={navigationItem.icon} /><span>{ navigationItem.title }</span></span>}>
                    {
                        navigationItem.children.map((item) => {
                            if(path === item.key){
                                this.openKey = navigationItem.key
                            }
                           return  this.secondaryList(item)
                        })
                    }
                </SubMenu>
            }else{
                return this.secondaryList(navigationItem)
            }
        });
        return menus
    };
    secondaryList = (item) => {
        return <Item key={item.key}>
            <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
            </Link>
        </Item>
    };

    render() {

        return <Menu theme="dark" defaultSelectedKeys={[this.path]} defaultOpenKeys={[this.openKey]} mode="inline">
            {
                this.menus
            }
        </Menu>

    }
}
export default withRouter(LeftNav)