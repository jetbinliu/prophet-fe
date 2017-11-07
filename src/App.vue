<style scoped>
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
        height: 60px;
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
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <Col span="3" class="layout-menu-left">
                <Menu theme="dark" width="auto" :open-names="['1']">
                    <div class="layout-logo-left"><span><font color="white"><B>PROPHET</B></font></span></div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            hive操作
                        </template>
                        <MenuItem name="1-1" @click.native="forward('hive_query')"><Icon type="ios-list-outline"></Icon>发起hive查询</MenuItem>
                        <MenuItem name="1-2" @click.native="forward('hive_create_table')"><Icon type="ios-pricetag"></Icon>创建hive表</MenuItem>
                        <MenuItem name="1-3" @click.native="forward('hive_list_tables')"><Icon type="ios-chatboxes-outline"></Icon>我的hive表</MenuItem>
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
            <Col span="21">
                <div class="layout-header"></div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">Home</BreadcrumbItem>
                        <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                        <BreadcrumbItem>iView</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <router-view/>
                </div>                
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        created () {
        },
        methods: {
            forward (url) {
                this.$router.push(url);
            }
        }
    }
</script>
