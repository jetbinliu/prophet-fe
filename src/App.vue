<style scoped>
	.center {
		 position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		.v-center {
		 position: absolute;
			top: 50%;
			transform: translate(0, -50%);
		}
		.h-center {
		 position: absolute;
			left: 50%;
			transform: translate(-50%, 0);
		}
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        border-size: 1px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
		height: 1200px;
    }
    .layout-header{
        height: 50px;
        background: #5b6270;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
        text-align: center;
        line-height: 30px;
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
	.layout-ceiling{
        background: #464c5b;
        padding: 10px 0;
        overflow: hidden;
		position: relative;
		height: 50px;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
		right: 10px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
	.layout-hide-text .layout-text{
	
    }
	.welcome-span{
		color: white;
		right: 10px;
	}
</style>
<template>
    <div class="layout" >
        <Row type="flex">
            <Col :span="3" class="layout-menu-left">
                <Menu theme="dark" width="auto" :open-names="subMenuOpenKeys">
                    <div class="layout-logo-left">
						
						<span><font color="white"><B>PROPHET</B></font></span>
					</div>
                    <Submenu name="hive_operation" key="hive_operation">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            <span class="layout-text">hive操作</span>
                        </template>
                        <MenuItem name="hive_query" @click.native="forward('hive_query')">
							<Icon type="ios-list-outline"></Icon>
							<span class="layout-text">查询hive</span>
						</MenuItem>
                        <MenuItem name="all_secret_tables" @click.native="forward('all_secret_tables')">
							<Icon type="ios-chatboxes-outline"></Icon>
							<span class="layout-text">所有机密表</span>
						</MenuItem>
                    </Submenu>
                    <Submenu name="system_management" key="system_management" v-if="currLoginedUserInfo.isAdmin == 1">
                        <template slot="title">
                            <Icon type="unlocked"></Icon>
                            系统管理
                        </template>
						<MenuItem name="config_secret_tables" @click.native="forward('config_secret_tables')">
							<Icon type="plus-circled"></Icon>
							<span class="layout-text">配置机密表</span>
						</MenuItem>
						<MenuItem name="user_secret_privs" @click.native="forward('user_secret_privs')">
							<Icon type="ios-settings-strong"></Icon>
							<span class="layout-text">数据权限</span>
						</MenuItem>
						<MenuItem name="user_config" @click.native="forward('user_config')" 
							v-if="currLoginedUserInfo.isAdmin == 1 && currLoginedUserInfo.userAuthSystemType == 'prophet'">
							<Icon type="person-stalker"></Icon>
							<span class="layout-text">用户管理</span>
						</MenuItem>
                    </Submenu>
                    <!-- <Submenu name="hive_task" key="hive_task">
                        <template slot="title">
                            <Icon type="clock"></Icon>
                            hive任务
                        </template>
                        <MenuItem name="sqoop_task" @click.native="forward('sqoop_task')">
							<Icon type="ios-shuffle-strong"></Icon>
							<span class="layout-text">sqoop任务</span>
						</MenuItem>
						<MenuItem name="scheduled_task" @click.native="forward('scheduled_task')">
							<Icon type="ios-compose-outline"></Icon>
							<span class="layout-text">定时任务</span>
						</MenuItem>
                    </Submenu>-->
                </Menu>
            </Col>
            <Col :span="21">
				<div class="layout-ceiling">
					<div class="layout-ceiling-main v-center">
						
						<span class="welcome-span">您好，{{currLoginedUserInfo.loginedUser}}&nbsp;</span>
						<ButtonGroup size="small" shape="circle">
							<Button type="ghost" ><font color="white"><Icon type="gear-a"></Icon>&nbsp;个人配置</font></Button>
							<Button type="ghost" @click="logOut()"><font color="white"><Icon type="arrow-right-a"></Icon>&nbsp;退出</font></Button>
						</ButtonGroup>
					</div>
				</div>
                <div class="layout-content">
                    <router-view/>
                </div>                
            </Col>
        </Row>
    </div>
</template>
<script>
	import { getLoginedUser } from './module/login/request';
	import { logout } from './module/login/request';

    export default {
		mounted () { 
			this.getCurrLoginedUser();
			
		},
		data () {
            return {
                currLoginedUserInfo:{
					loginedUser:'',
					isAdmin:-1,
					userAuthSystemType:''
				},
				subMenuOpenKeys:['hive_operation','system_management','hive_task']
            }
        },
        created () {
        },
        methods: {
            forward (url) {
                this.$router.push(url);
            },
			getCurrLoginedUser() {
				var me = this;
				getLoginedUser({}).then(
					function (res) {
						if (res.status === 0) {
							me.currLoginedUserInfo.loginedUser = res.data.loginedUser;
							me.currLoginedUserInfo.isAdmin = res.data.isAdmin;
							me.currLoginedUserInfo.userAuthSystemType = res.data.userAuthSystemType;
						}
					},
					function (res) {
						me.$Message.warning("从后端session里获取当前登录用户信息失败!");
					}
				);
			},
			logOut() {
				logout({}).then(
					function (res) {
						window.location.href = '/login.html';
					},
					function (res) {
						window.location.href = '/login.html';
					}
				);
			},
			personalConfig() {
				
			}
        }
    }
</script>
