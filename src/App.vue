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
                <Menu theme="dark" width="auto" :open-names="['1']">
                    <div class="layout-logo-left">
						
						<span><font color="white"><B>PROPHET</B></font></span>
					</div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            <span class="layout-text">hive操作</span>
                        </template>
                        <MenuItem name="1-1" @click.native="forward('hive_query')">
							<Icon type="ios-list-outline"></Icon>
							<span class="layout-text">发起hive查询</span>
						</MenuItem>
                        <MenuItem name="1-2" @click.native="forward('hive_create_table')">
							<Icon type="ios-pricetag"></Icon>
							<span class="layout-text">创建hive表</span>
						</MenuItem>
                        <MenuItem name="1-3" @click.native="forward('login')">
							<Icon type="ios-chatboxes-outline"></Icon>
							<span class="layout-text">我的hive表</span>
						</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            hive报表
                        </template>
                        <MenuItem name="3-1"><Icon type="ios-analytics"></Icon>Option 1</MenuItem>
                        <MenuItem name="3-2"><Icon type="ios-analytics"></Icon>Option 2</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            定时任务
                        </template>
                        <MenuItem name="3-1"><Icon type="ios-analytics"></Icon>Option 1</MenuItem>
                        <MenuItem name="3-2"><Icon type="ios-analytics"></Icon>Option 2</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col :span="21">
				<div class="layout-ceiling">
					<div class="layout-ceiling-main v-center">
						
						<span class="welcome-span">您好，{{currLoginedUser}}&nbsp;</span>
						<ButtonGroup size="small" shape="circle">
							<Button type="ghost"><font color="white"><Icon type="gear-a"></Icon>&nbsp;配置</font></Button>
							<Button type="ghost"><font color="white" @click="logOut()"><Icon type="arrow-right-a"></Icon>&nbsp;退出</font></Button>
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
                currLoginedUser:''
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
							me.currLoginedUser = res.data;
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
			}
        }
    }
</script>
