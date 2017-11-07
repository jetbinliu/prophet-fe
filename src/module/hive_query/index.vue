<template>
    <Row>
        <Col span="5">
            <Menu active-name="1-2" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="soup-can-outline"></Icon>
                            default
                    </template>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                    </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="soup-can-outline"></Icon>
                            formatter
                    </template>
                    <MenuItem name="2-1">Option 1</MenuItem>
                    <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="soup-can-outline"></Icon>
                            users
                    </template>
                    <MenuItem name="3-1">Option 1</MenuItem>
                    <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
            </Menu>
        </Col>
        <Col span="19">
            <div class="layout-content-main">
                <Row>
                    <div style="margin: 10px 10px;">
                        <Input type="textarea" :rows="6" placeholder="请输入要查询的SQL...查询大表尽量加上分区键和limit"></Input>
                        <div style="margin-top: 10px; float:right;">
                            <Button type="primary">查询(S)</Button>&nbsp;&nbsp;
                            <Button>清空</Button>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div style="margin: 10px 10px;">
                        <Tabs type="card" closable @on-tab-remove="handleTabRemove">
                            <TabPane label="历史查询" v-if="tab0">
                                <Select v-model="model1"  clearable placeholder="请选择城市" @on-change="refresh" style="width:200px">
                                     <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </TabPane>
                            <TabPane label="历史结果" v-if="tab1">
                                <Table stripe :columns="columns1" :data="data1"></Table>
                                <router-link to="/home">Go to Foo</router-link>
                            </TabPane>
                            <TabPane label="标签三" v-if="tab2">标签三的内容</TabPane>
                        </Tabs>

                    </div>
                </Row>
             </div>
         </Col>
     </Row>
</template>
<script>
    import { getList } from './request';
    export default {
        data () {
            return {
                cityList: [
                ],
                model1: '',
                columns1: [
                    {
                        title: 'Name',
                        key: 'name',
                        sortable: true
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: true
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [],
                tab0: true,
                tab1: true,
                tab2: true
            }
        },
        mounted () {
            this.getList();
        },
        methods: {
            refresh () {
                this.$Message.info('refresh');
            },
            getList () {
                var me = this;
                getList().then(function(res) {
                    me.data1 = res.data;
                }, function (res) {
                    me.data1 = [
                        {
                            name: '12312',
                            age: 125
                        },
                         {
                            name: '12312',
                            age: 123
                        },
                        {
                            name: '12312',
                            age: 121
                        },
                        {
                            name: '12312',
                            age: 12
                        },{
                            name: '12312',
                            age: 100
                        }
                    ];
                    me.cityList = [
                        {
                            value: '1',
                            label: '北京'
                        }
                    ]
                })
            },
            handleTabRemove (name) {
                this['tab' + name] = false;
            }
        }
    }
</script>
