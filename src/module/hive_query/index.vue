<template>
    <Row>
        <Col span="5">
            <Menu active-name="1-2" width="auto" :open-names="['1']" @on-select="descTable" accordion>
                <Submenu v-for="(tableValue, dbName) in metastoreDbAndTables" :key="dbName" :name="dbName">
                    <template slot="title">
                        <Icon type="soup-can-outline"></Icon>
                            {{dbName}}
                    </template>
                    <MenuItem v-for="tableLine in tableValue" :key="tableLine.TBL_ID" :name="dbName + '.' + tableLine.TBL_NAME" >{{tableLine.TBL_NAME}}
					</MenuItem>
                </Submenu>
            </Menu>
        </Col>
        <Col span="19">
            <div class="layout-content-main">
                <Row>
                    <div style="margin: 10px 10px;">
                        <Input v-model="sql_content" type="textarea" :rows="6" 
							placeholder="请输入要查询的SQL...表名请带上db名...查询大表尽量加上分区键和limit"></Input>
                        <div style="margin-top: 10px; float:right;">
                            <Button type="primary" @click="sendQuery">查询(S)</Button>&nbsp;&nbsp;
                            <Button @click="clearQuery">清空</Button>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div style="margin: 10px 10px;">
                        <Tabs type="card" @on-tab-remove="handleTabRemove" v-model="currActiveTabPanel">
                            <TabPane label="历史查询" v-if="tabPanels.tabHistoryQuery.display" name="tabHistoryQuery">
                                <!-- <Select v-model="model1"  clearable placeholder="请选择城市" @on-change="refresh" style="width:200px">
                                     <Option v-for="item in cityList" value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select> -->
                                <Table size="small" stripe :columns="colHistQuery" :data="dataHistQuery">
									
                                </Table>
								<router-link to="/home">Go to Foo</router-link>
                            </TabPane>
                            <TabPane label="查询结果" v-if="tabPanels.tabQueryResult.display" name="tabQueryResult">
								<div>
									<Table v-if="tabPanels.tabQueryResult.contentType == 'sql_query' && tabPanels.tabQueryResult.status == 0" size="small" 
										stripe :columns="tabPanels.tabQueryResult.cols" :data="tabPanels.tabQueryResult.data.result_data" 
										no-data-text="SQL查询返回的结果集为空. 换个查询条件试试？">
										
									</Table>
									<Alert v-if="tabPanels.tabQueryResult.contentType == 'sql_query' && tabPanels.tabQueryResult.status != 0" type="error" show-icon>
										出错啦!
										<span slot="desc">
											{{tabPanels.tabQueryResult.message}}
										</span>
									</Alert>
								</div>
                                
                            </TabPane>
							<TabPane v-for="(tabValue, tabKey) in tabPanels" closable :key="tabKey" :label="tabKey" 
								v-if="tabValue.display && tabKey !='tabHistoryQuery' && tabKey != 'tabQueryResult'" :name="tabKey">
								<div>
									<Table size="small" stripe :v-if="tabValue.contentType == 'desc_table'" :columns="tabValue.cols" 
										:data="tabValue.content.result_data">
										
									</Table>
								</div>
							</TabPane>
                        </Tabs>
                    </div>
                </Row>
             </div>
         </Col>
     </Row>
</template>
<script>
    import { getMetaStoreDbAndTablesAjax } from './request';
	import { descTableAjax } from './request';
	import { sendHiveSqlQuery } from './request';
	import { saveQueryHistory } from './request';
	
    export default {
        data () {
            return {
				sql_content: '',
				tabPanels: {
					tabHistoryQuery: {
						label:"历史查询", 
						display:true, 
						status:-1, 
						message:""
					},
					tabQueryResult: {
						label:"查询结果", 
						display:true,
						status:-1,
						message:"",
						data:{},
						cols:[],
						contentType:""
					}
				},
				currActiveTabPanel: "",
                colHistQuery: [
                    {
                        title: 'Id',
                        key: 'queryId',
						width: 80
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
                dataHistQuery: [
					
				],
				metastoreDbAndTables: {}
            }
        },
        mounted () {
			this.currActiveTabPanel = "tabHistoryQuery";
            this.getMetaStoreDbTables();
        },
        methods: {
			//获取metastore里所有库表信息并展现
            getMetaStoreDbTables () {
                var me = this;
                getMetaStoreDbAndTablesAjax().then(
					function (res) {
						me.metastoreDbAndTables = res.data;
					}, 
					function (res) {
						me.$Message.info("获取所有库表信息失败!");
					}
				)
            },
			//描述表结构信息
			descTable(menuItemName) {
				var me = this;
				var params = {tableNameWithDb : menuItemName};
				descTableAjax(params).then(
					function (res) {
						//ajax成功时执行
						var columns = new Array();
						
						if (res.data.type == 'desc_table') {
							columns.push({title:"字段名", key:"col_name"});
							columns.push({title:"字段类型", key:"data_type"});
							columns.push({title:"描述", key:"comment"});
						} else {
							//将后端传来的cols信息拼接成VUE table的columns数组
							for (var index in res.data.data.result_cols) {
								var colDict = {
									title : res.data.data.result_cols[index], 
									key :   res.data.data.result_cols[index]
								};
								columns.push(colDict);
							}
						}

						me.$set(
							me.tabPanels, 
							menuItemName, 
							{
								label:menuItemName, 
								content:res.data.data, 
								cols:columns,
								display:true, 
								contentType:res.data.type
							}
						);
						me.currActiveTabPanel = menuItemName;
						me.$Message.info("获取表结构信息成功!");
					}, 
					function (res) {
						//ajax失败时执行
						me.$Message.error("获取表结构信息失败");
						me.$Message.error(res.message);
					}
				)
				
				this.i++;
			},
			//close掉每一个结果集选项卡的方法
            handleTabRemove (name) {
				this['tabPanels'][name]['display'] = false;
            },
			clearQuery () {
				this.sql_content = '';
			},
			//向后端发送SQL，并异步获取结果后展现
			sendQuery() {
				var me = this;
				var params = {queryContent : this.sql_content};
				me.$Message.info("SQL发送成功!");
				
				//发送query到后端和获取结果的接口
				sendHiveSqlQuery(params).then(
					function (res) {
						//最后切换焦点到当前tab上
						me.currActiveTabPanel = "tabQueryResult";
						
						var columns = new Array();
						if (res.data.type == 'sql_query' && res.status == 0) {
							if (res.data.data.result_cols != null) {
								//如果结果集不为空，将后端传来的cols信息拼接成VUE Table的columns数组
								if (res.data.data.result_cols.length >= 8) {
									for (var index in res.data.data.result_cols) {
										var colDict = {
											title : res.data.data.result_cols[index], 
											key :   res.data.data.result_cols[index],
											width: 120
										};
										columns.push(colDict);
									}
								} else {
									for (var index in res.data.data.result_cols) {
										var colDict = {
											title : res.data.data.result_cols[index], 
											key :   res.data.data.result_cols[index]
										};
										columns.push(colDict);
									}
								}
							} else {
								//如果结果集为空啥都不用做
							}
							
							//如果查询成功，则保存一条查询历史
							saveQueryHistory(params).then(
								function (res) {
									me.$Message.info("保存查询历史成功!");
								},
								function (res) {
									me.$Message.warning("保存这条查询历史失败!");
								}
							)
						}
						me.tabPanels.tabQueryResult.status = res.status;
						me.tabPanels.tabQueryResult.message = res.message;
						me.tabPanels.tabQueryResult.data = res.data.data;
						me.tabPanels.tabQueryResult.cols = columns;
						me.tabPanels.tabQueryResult.contentType = res.data.type;
					}, 
					function (res) {
						me.$Message.info("请求后端失败！服务器不知道跑哪里玩儿去了....");
					}
				)
				
			}
			
        }
    }
</script>
