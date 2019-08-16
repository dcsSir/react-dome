import React, { Component } from 'react';

import { Form, Input,Icon, Button, message } from 'antd';

import data from '../../utils/store'

import { setItem } from '../../utils/storage'

import { reqLogin } from '../../api'

import img from '../../assets/images/logo.png'

import './index.less'

const Item = Form.Item;


class Login extends Component {

    submit = (e) => {
          e.preventDefault();
          this.props.form.validateFields((err,values) => {
              const { username,password } = values;
              if(!err){
                  reqLogin(username,password)
                      .then((response) => {

                          message.success("登录成功");

                          data.user = response;

                          setItem(response);

                          this.props.history.replace('/home');
                      })
                      .catch((err) => {
                          message.error(err);
                          this.props.form.resetFields(['password'])
                  })
              }
          })
    };

    validator = (rule, value, callback) => {
        const name = rule.field === "username" ? '用户名' : '密码';
        const passwordReg = /^\w+$/;


        if(!value){
            callback('输入的值不能为空')
        }else if(value.length > 10){
            callback('长度必须小于10位')
        }else if(value.length < 4){
            callback("长度必须大于4位")
        }else if(!passwordReg.test(value)){
            callback("只能包含字母，英文，下划线")
        }

        callback();
    };

    render() {

        const { getFieldDecorator } = this.props.form;

        return <div className='login'>
            <header className="login-header">
                <img src={img} alt="没官网了"/>
                <h1>React 项目 后台管理系统</h1>
            </header>
            <section className='content'>

                <h2 className='title'>用户登录</h2>
                <Form onSubmit={this.submit}>
                    <Item>
                        {/*{
                            getFieldDecorator(
                                'username',
                                {
                                    rules:[
                                        {
                                            required:true,
                                            message:'请输入您的用户名'
                                        },
                                        {
                                            min:4,
                                            message:'最小输入4位'
                                        },
                                        {
                                            max:10,
                                            message:'姓名不能超过10个字'
                                        },
                                        {
                                            pattern:/^\w+$/,
                                            message:'用户名只能包含英文，字母，下划线'
                                        }
                                    ]
                                }
                            )(
                                <Input placeholder='用户名'/>
                            )
                        }*/}
                        {
                            getFieldDecorator(
                                'username',
                                {
                                    rules:[
                                        {validator:this.validator}
                                    ]
                                }
                            )(
                                <Input prefix={<Icon type='user'/>} placeholder='user'/>
                            )
                        }
                    </Item>
                    <Item>
                        {
                            getFieldDecorator(
                                'password',
                                {
                                    rules: [
                                        {validator: this.validator}
                                    ]
                                }

                            )(
                                <Input type='password' prefix={<Icon type='lock'/>} placeholder='密码'/>
                            )
                        }
                    </Item>
                    <Item>
                        <Button type='primary' htmlType='submit' className='login-submit'>登录</Button>
                    </Item>
                </Form>
            </section>
        </div>
    }
}

export default Form.create()(Login)

