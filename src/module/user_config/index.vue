<style>
	.main-form{
		margin-right: 30px;
		margin-top: 10px;
		margin-left: 30px;
		margin-bottom: 10px;
		#width:80%;
	}

</style>
<template>
	<div class="main-form">
	<Row>
		<Col span="16">	
			<Table border :content="self" :columns="columnUsers" :data="dataUsers" size="small" stripe>
			
			</Table>
		</Col>
		<Col span="8">
			<i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
				<Form-item label="用户名" prop="username">
					<i-input :value.sync="formValidate.username" v-model="formValidate.username" placeholder="请输入用户名"></i-input>
				</Form-item>
				<Form-item label="密码" prop="password">
					<i-input :value.sync="formValidate.password" v-model="formValidate.password" placeholder="请输入密码"></i-input>
				</Form-item>
				<Form-item label="用户类型" prop="userType">
					<i-select :model.sync="formValidate.userType" v-model="formValidate.userType" placeholder="请选择用户类型">
						<i-option value="normal">普通用户</i-option>
						<i-option value="admin">管理员</i-option>
					</i-select>
				</Form-item>
				<Form-item label="是否激活" prop="isActive">
					<i-switch v-model="formValidate.isActive">
						<span slot="open" >是</span>
						<span slot="close">否</span>
					</i-switch>
				</Form-item>
				<Form-item>
					<i-button type="primary" @click="handleSubmit('formValidate')">新增用户</i-button>
					<i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空</i-button>
				</Form-item>
			</i-form>
		</Col>
	</Row>
	</div>
</template>
<script>
	import Icon from 'iview/src/components/icon/icon';
	import Button from 'iview/src/components/button/button';
	
	import { getAllProphetUsersAjax } from './request';
	import { addProphetUserAjax } from './request';
	import { deleteUserByIdAjax } from './request';
	
    export default {
        data () {
            return {
				self: this,
				columnUsers: [
                    {
                        title: '用户Id',
                        key: 'id',
						sortable: true
                    },
                    {
                        title: '用户名',
                        key: 'username',
						sortable: true,
						render: (h, params) => {
                            var item = params.row;	//item是这一行的数据
                            return (
                                <div>
                                    <Icon type="person"></Icon>&nbsp;{item.username}
								</div>
							);
                        }
                    },
					{
                        title: '是否激活(1:是, 0:否)',
                        key: 'is_active',
						sortable: true
                    },
                    {
                        title: '用户类型',
                        key: 'user_type',
						sortable: true
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var item = params.row;	//item是这一行的数据
                            return (
                                <div>
                                    <Button size="small" onClick={this.deleteUserById.bind(this, item)}>删除</Button>
								</div>
							);
                        }
                    }
                ],
                dataUsers: [
                    
                ],
                formValidate: {
                    username: '',
                    password: '',
                    userType: '',
					isActive: true
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    userType: [
                        { required: true, message: '请选择用户类型', trigger: 'change' }
                    ]
                }
            }
        },
		mounted(){
			this.getAllProphetUsers();
		},
        methods: {
			getAllProphetUsers() {
				var me = this;
				getAllProphetUsersAjax().then(
					function (res) {
						if (res.status == 0) {
							me.dataUsers = res.data;
						} else {
							me.$Message.error("请求所有prophet用户信息失败!");
						}
						
					},
					function (res) {
						me.$Message.error("请求所有prophet用户信息失败!");
					}
				)
			},
            handleSubmit (name) {
				var me = this;
                me.$refs[name].validate((valid) => {
                    if (valid) {
						var params = {
							username: me.formValidate.username,
							password: me.formValidate.password,
							isActive: me.formValidate.isActive,
							userType: me.formValidate.userType
						};
						addProphetUserAjax(params).then(
							function (res) {
								if (res.status == 0) {
									me.$Message.success('新增用户成功!');
									
									//刷新一下
									me.getAllProphetUsers();
								} else {
									me.$Message.config({duration: 10});
									me.$Message.error(res.message);
								}
							},
							function (res) {
								me.$Message.error("新增用户失败!");
							}
						);
                        
                    } else {
                        me.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
			deleteUserById(item) {
				var me = this;
				deleteUserByIdAjax({userId: item.id}).then(
					function(res) {
						if (res.status == 0) {
							me.$Message.success("删除用户成功!");
							me.getAllProphetUsers();
						} else {
							me.$Message.error(res.message);
						}
					},
					function(res){
						me.$Message.error("删除用户失败!");
					}
				)
			}
        }
    }
</script>