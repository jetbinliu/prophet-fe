<style>
	.query-running-spin {
		display: flex;
		align-items: center;
	}
</style>
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
                        <Input v-model="sql_content" type="textarea" :rows="6" @keyup.native="alterS($event)"
							placeholder="请输入要查询的SQL...表名请带上db名，不带db名默认查询default库...查询大表尽量加上分区键和limit..."></Input>
                        <div style="margin-top: 10px;">
							<div style="float:left; display: inline;">
								&nbsp;运行完邮件通知我：
								<i-switch v-model="emailNotify">
									<span slot="open">开</span>
									<span slot="close">关</span>
								</i-switch>
							</div>
							<div style="float:right; display: inline;">
								<Button type="primary" @click="sendQuery">查询(S)</Button>&nbsp;&nbsp;
								<Button @click="clearQuery">清空</Button>
							</div>
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
                                <Table size="small" stripe :columns="colHistQuery" :data="dataHistQuery" @on-row-click="refillSqlContent">
									
                                </Table>
                            </TabPane>
                            <TabPane label="查询结果" v-if="tabPanels.tabQueryResult.display" name="tabQueryResult">
								<div>
									<p>
									<Button v-if="tabPanels.tabQueryResult.contentType == 'sql_query' && tabPanels.tabQueryResult.status == 0" type="primary" 
										size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> 导出成CSV文件
									</Button>
									</p>
									<br/>
									<Table v-if="tabPanels.tabQueryResult.contentType == 'sql_query' && tabPanels.tabQueryResult.status == 0" size="small" 
										stripe :columns="tabPanels.tabQueryResult.cols" :data="tabPanels.tabQueryResult.data.result_data" 
										no-data-text="SQL查询返回的结果集为空. 换个查询条件试试？" ref="tableResult"
									>
										
									</Table>
									
									<Alert v-if="tabPanels.tabQueryResult.status != 0" type="error" show-icon>
										出错啦!
										<span slot="desc">
											{{tabPanels.tabQueryResult.message}}
										</span>
									</Alert>
									<Table v-if="tabPanels.tabQueryResult.status == 3" size="small" 
										stripe :columns="tabPanels.tabQueryResult.noPrivTablesCols" :data="tabPanels.tabQueryResult.noPrivTablesData" >
										
									</Table>
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
	import { getAllQueryHistoryByUser } from './request';
	import { getQueryStatusById } from './request';
	import { getHistoryResultById } from './request';
	
	import Spin from 'iview/src/components/spin/spin';
	import Button from 'iview/src/components/button/button';
	
    export default {
        data () {
            return {
				sql_content: '',
				emailNotify: false,
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
						status:0,
						message:"",
						data:{},
						cols:[],
						contentType:"",
						noPrivTablesData:[],
						noPrivTablesCols:[
							{
								title: 'tableId',
								key: 'table_id'
							},
							{
								title: '库名',
								key: 'table_schema'
							},
							{
								title: '表名',
								key: 'table_name'
							}
						]
					}
				},
				currActiveTabPanel: "",
                colHistQuery: [
                    {
                        title: '查询语句Id',
                        key: 'id',
						width: 100
                    },
                    {
                        title: '查询时间',
                        key: 'queryTime',
						width: 170
                    },
                    {
                        title: '查询语句',
                        key: 'queryContent',
						width: 300
                    },
                    {
                        title: '任务状态',
                        key: 'strStatus'
						
                    },
					{
                        title: '动作',
                        key: 'action',
						render: (h, params) => {
							var item = params.row;	//item是这一行的数据
                            return (
                                <div>
								{
									item.status === 0 
                                    ? <Button size="small" onClick={this.retrieveResultByQueryId.bind(this, item)}>查看结果</Button>
                                    : ''
								}
								{
									item.status === 1
                                    ? <Button type="info" size="small" loading>运行中...</Button>
                                    : ''
								}
								{
									item.status === 2
                                    ? <Button type="info" size="small" onClick={this.retrieveResultByQueryId.bind(this, item)}>重新运行</Button>
                                    : ''
								}
								{
									item.status === 3
                                    ? <Button type="warning" size="small" onClick={this.retrieveResultByQueryId.bind(this, item)}>查看错误</Button>
                                    : ''
								}
								</div>
							);
						}
                    }
                ],
                dataHistQuery: [
					
				],
				metastoreDbAndTables: {},
				clockQueryHistory: {}
            }
        },
        mounted () {
			this.$Message.config({duration: 3});
			this.currActiveTabPanel = "tabHistoryQuery";
            this.getMetaStoreDbTables();
			this.getQueryHistory();
			
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
				
				//如果输入为空
				if (me.sql_content == '' || me.sql_content == null || me.sql_content == undefined) {
					me.$Message.error("SQL语句不能为空, 请输入SQL语句内容后提交!");
				} else {
					me.$Message.info("SQL已经成功提交，请耐心等待结果!");
					
					//初始化一个变量保存数据库返回的id
					var queryHistoryId = -1;
					
					//不管查询是否成功，都保存一条查询历史
					var queryHistoryParams = {queryContent : me.sql_content, emailNotify : me.emailNotify};
					saveQueryHistory(queryHistoryParams).then(
						function (res) {
							//获取该条查询历史的id并保存，供后面ajax使用
							queryHistoryId = res.data;
							
							//保存历史成功，刷新当前历史查询页面
							me.getQueryHistory();
							me.currActiveTabPanel = "tabHistoryQuery";
							
							//然后开始定时轮询后端是否执行完毕
							var int = setInterval(function(){
								me.getQueryHistoryStatusById(queryHistoryId)
							}, 3000);
							//将指针保存到全局对象里，方便后续clearInterval
							me.$set(me.clockQueryHistory, queryHistoryId, int);
							
							//发送query和刚刚生成的id到后端, 等待hive执行并获取结果展现
							var params = {queryContent : me.sql_content, queryHistId : queryHistoryId, emailNotify : me.emailNotify};
							sendHiveSqlQuery(params).then(
								function (res) {
									var columns = new Array();
									if (res.data != null && "type" in res.data && res.data.type == 'sql_query' && res.status == 0) {
										if (res.data.data.result_cols != null) {
											columns.push({
												title: '行号',
												key: '',
												type: 'index',
												width: 80
											});
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
									} else if (res.status == 3 && res.data.length != 0) {
										//后端数据权限校验没通过
										me.tabPanels.tabQueryResult.noPrivTablesData = res.data;
									}
									
									//设置标签页数据
									me.tabPanels.tabQueryResult.status = res.status;
									me.tabPanels.tabQueryResult.message = res.message;
									if (res.data != null && "data" in res.data && "type" in res.data) {
										me.tabPanels.tabQueryResult.data = res.data.data;
										me.tabPanels.tabQueryResult.contentType = res.data.type;
									}
									
									me.tabPanels.tabQueryResult.cols = columns;

								}, 
								function (res) {
									me.$Message.error("请求后端失败！服务器不知道跑哪里玩儿去了....");
								}
							)
						},
						function (res) {
							me.$Message.warning("保存这条查询历史失败!");
						}
					)
					
				}
			},
			//获取该用户最近查询历史，并重新填充表格
			getQueryHistory(){
				var me = this;
				//从后端获取查询历史
				getAllQueryHistoryByUser().then(
					function (res) {
						me.dataHistQuery = res.data;
					},
					function (res) {
						me.$Message.warning("获取查询历史失败!");
					}
				)
			},
			//轮询某个查询历史状态是否ok了
			getQueryHistoryStatusById(queryId){
				var me = this;
				var params = {queryHistId : queryId};
				getQueryStatusById(params).then(
					function (res) {
						if (res.status != 0 || res.data.status != 1) {
							window.clearInterval(me.clockQueryHistory[queryId]);
							//刷新一下查询历史界面
							me.getQueryHistory();
							
							//最后切换焦点到结果页tab上
							me.currActiveTabPanel = "tabQueryResult";
						}
					},
					function (res) {
						me.$Message.warning("查询任务状态失败! 查询语句Id: " + queryId);
						window.clearInterval(me.clockQueryHistory[queryId]);
					}
				)
			},
			//导出csv文件
			exportData () {
				this.$refs.tableResult.exportCsv({
					filename: 'The original data'
				});
            },
			//查询历史表格里，点击查看结果
			retrieveResultByQueryId(item) {
				var me = this;
				//向后端索取文件结果，如果没有了则提示重新执行query
				var params = {queryHistId:item.id};
				getHistoryResultById(params).then(
					function (res) {
						if (res.status == 0) {
							var columns = new Array();
							if (res.data.type == 'sql_query') {
								if (res.data.data.result_cols != null) {
									columns.push({
										title: '行号',
										key: '',
										type: 'index',
										width: 80
									});
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
								
							}
							
							//设置标签页数据
							me.tabPanels.tabQueryResult.status = res.status;
							me.tabPanels.tabQueryResult.message = res.message;
							me.tabPanels.tabQueryResult.data = res.data.data;
							me.tabPanels.tabQueryResult.cols = columns;
							me.tabPanels.tabQueryResult.contentType = res.data.type;
							
							me.currActiveTabPanel = "tabQueryResult";
						} else {
							me.$Message.warning(res.message);
						}
					},
					function (res) {
						me.$Message.error("查看结果失败！服务器不知道跑哪里玩儿去了....");
					}
				)
			},
			//点击查询历史单行重新填充sql_content输入框
			refillSqlContent(row, index) {
				this.sql_content = row.queryContent;
			},
			//Alt+S快捷键提交查询，仅限于SQL语句输入框获取焦点时
			alterS(event) {
				if (event.altKey && event.keyCode == 83) {
					this.sendQuery();
				}
			}
        },
		components: {
			Spin
		}
    }
</script>
