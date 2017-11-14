<template>
    <Row>
        <Col span="5">
            <Menu active-name="1-2" width="auto" :open-names="['1']" @on-select="descTable" accordion>
                <Submenu v-for="(tableValue, dbName) in metastoreDbAndTables" :key="dbName" :name="dbName">
                    <template slot="title">
                        <Icon type="soup-can-outline"></Icon>
                            {{dbName}}
                    </template>
                    <MenuItem v-for="tableLine in tableValue" :key="tableLine.TBL_ID" :name="tableLine.TBL_ID" >{{tableLine.TBL_NAME}}
					</MenuItem>
                </Submenu>
            </Menu>
        </Col>
        <Col span="19">
            <div class="layout-content-main">
                <Row>
                    <div style="margin: 10px 10px;">
                        <Input type="textarea" :rows="6" placeholder="请输入要查询的SQL...表名请带上db名...查询大表尽量加上分区键和limit"></Input>
                        <div style="margin-top: 10px; float:right;">
                            <Button type="primary">查询(S)</Button>&nbsp;&nbsp;
                            <Button>清空</Button>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div style="margin: 10px 10px;">
                        <Tabs type="card" closable @on-tab-remove="handleTabRemove">
                            <TabPane :label="tabPanels.tab0.label" v-if="tabPanels.tab0.display" name="tab0">
                                <!-- <Select v-model="model1"  clearable placeholder="请选择城市" @on-change="refresh" style="width:200px">
                                     <Option v-for="item in cityList" value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select> -->
                                <Table size="small" stripe :columns="colHistQuery" :data="dataHistQuery">
									
                                </Table>
                            </TabPane>
                            <TabPane :label="tabPanels.tab1.label" v-if="tabPanels.tab1.display" name="tab1">
                                <Table size="small" stripe :columns="columns1" :data="data1">
                                    
                                </Table>
                                <router-link to="/home">Go to Foo</router-link>
                            </TabPane>
							<TabPane  v-for="(tabValue, tabKey) in tabPanels" :key="tabKey" :label="'标签' + tabKey" :v-if="tabValue.display && tabKey !='tab0' && tabKey != 'tab1'" :name="tabKey">
								{{ tabValue.content }}
							</TabPane>
                        </Tabs>
                    </div>
                </Row>
             </div>
         </Col>
     </Row>
</template>
<script>
    import { getMetaStoreDbAndTables } from './request';
    export default {
        data () {
            return {
				tabPanels: {
					tab0: {label:"历史查询", display:true},
					tab1: {label:"历史结果", display:true},
					tab2: {label:"标签1", content:"222", display:true},
					tab3: {label:"标签2", content:"333", display:true},
					tab4: {label:"标签3", content:"444", display:true}
				},
				tab0: true,
                tab1: true,
                tab2: true,
                cityList: [
                ],
                model1: '',
                columns1: [
                    {
                        title: 'userName',
                        key: 'userName',
                        sortable: true
                    },
                    {
                        title: 'password',
                        key: 'password',
                        sortable: true
                    }
                ],
                data1: [],
                colHistQuery: [
                    {
                        title: 'Id',
                        key: 'queryId',
                    },
                    {
                        title: '查询时间',
                        key: 'queryTime',
                    },
                    {
                        title: '查询语句',
                        key: 'query',
                    },
                    {
                        title: '任务状态',
                        key: 'status',
                    }
                ],
                dataHistQuery: [],
				metastoreDbAndTables: {}
            }
        },
        mounted () {
            this.getMetaStoreDbTables();
        },
        methods: {
            refresh () {
                this.$Message.info('refresh');
            },
			descTable() {
				
				this.$Message.info("获取表信息成功");
			},
            getMetaStoreDbTables () {
                var me = this;
                getMetaStoreDbAndTables().then(function(res) {
                    me.metastoreDbAndTables = res.data;
                }, function (res) {
                    me.metastoreDbAndTables = {
								default112:[
									{'TBL_ID':21, 'TBL_NAME':'access_path1', 'TBL_TYPE':'EXTERNAL_TABLE'},
								   {'TBL_ID':22, 'TBL_NAME':'access_path2', 'TBL_TYPE':'EXTERNAL_TABLE'},
								   {'TBL_ID':23, 'TBL_NAME':'access_path3', 'TBL_TYPE':'MANAGED_TABLE'}
								 ],
								formatter:[
								   {'TBL_ID':24, 'TBL_NAME':'access_path4', 'TBL_TYPE':'EXTERNAL_TABLE'},
								   {'TBL_ID':25, 'TBL_NAME':'access_path5', 'TBL_TYPE':'EXTERNAL_TABLE'}
								 ]
							  };
                    me.cityList = [
                        {
                            value: '1',
                            label: '北京'
                        }
                    ]
                })
            },
            handleTabRemove (name) {
			debugger;
                //this['tab' + name] = false;
				this['tabPanels'][name]['display'] = false;
            }
        }
    }
</script>
