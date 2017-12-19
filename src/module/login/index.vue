<style>
	.layout{
		background-color: #f8f8f9;
	}
	.central{
		overflow: hidden;
		background: #f3f3f3;
		border-radius: 4px;
	}
	.login-form{
		margin: 30px;
	}
	.login-top {
		background: #464c5b;
		border-radius: 25px 25px 0px 0px;
		-webkit-border-radius: 25px 25px 0px 0px;
		-moz-border-radius: 25px 25px 0px 0px;
		-o-border-radius: 25px 25px 0px 0px;
		padding: 30px 65px;
		text-align: center;
		border-top: 2px solid #1580ad;
	}
	.login-bottom {
		background: #464c5b;
		padding: 30px 65px;
		border-radius: 0px 0px 25px 25px;
		-webkit-border-radius: 0px 0px 25px 25px;
		-moz-border-radius: 0px 0px 25px 25px;
		-o-border-radius: 0px 0px 25px 25px;
		text-align: center;
		border-top: 2px solid #1580ad;
	}
	
</style>
<template>
	<div>
		<Row type="flex" style="margin-top:160px;">
            <Col :span="8">
				
			</Col>
			<Col :span="8" class="central">
				<div class="login-top">
					<font color="white"><h1>Prophet</h1></font>
				</div>
				<div class="login-form">
					<Form ref="formLogin" :model="formLogin" :rules="ruleCustom" :label-width="80" >
						<FormItem label="用户名" prop="username">
							<Input type="text" v-model="formLogin.username" @keyup.enter.native="handleSubmit()"></Input>
						</FormItem>
						<FormItem label="密码" prop="passwd">
							<Input type="password" v-model="formLogin.passwd" @keyup.enter.native="handleSubmit()"></Input>
						</FormItem>
						
						<FormItem>
							<Button type="primary" @click="handleSubmit('formLogin')" style="background-color:#464c5b; border-color:#464c5b;">登录</Button>
							<Button type="ghost" @click="handleReset('formLogin')" style="margin-left: 8px">清空</Button>
						</FormItem>
					</Form>
				</div>
				<div class="login-bottom">
				</div>
			</Col>
			<Col :span="8">
				
			</Col>
		</Row>
	</div>
</template>
<script>
	import { login } from './request';

    export default {
        data () {
			const validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } 
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
            };
            
            return {
                formLogin: {
                    passwd: '',
					username: ''
                },
                ruleCustom: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
		mounted () {
			this.$Message.config({duration: 4});
		},
        methods: {
            handleSubmit (name) {
				var me = this;
				if (me.formLogin.username === '' || me.formLogin.passwd === '') {
					me.$Message.error("用户名或密码未填写!");
					return;
				}
				
				var params = {username: me.formLogin.username, password: me.formLogin.passwd};
                login(params).then(
					function (res) {
						if (res.status === 0 && res.data === 0) {
							me.$Message.success("登录成功，正在跳转");
							window.location.href = '/';
						} else {
							me.$Message.error("用户名或密码不正确，请重新输入!");
						}
						return;
					},
					function (res) {
						me.$Message.error("系统异常，无法登录，请检查服务器日志!");
					}
				);
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>