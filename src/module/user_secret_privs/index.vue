<style>
	.main-form{
		margin-right: 30px;
		margin-top: 10px;
		margin-left: 30px;
		margin-bottom: 10px;
	}
	.input-user{
		width: 300px;
		margin-bottom:10px;
	}
</style>
<template>
	<div class="main-form">
		<Input v-model="inputUser" placeholder="请输入要授权的用户名..." class="input-user">
		</Input>
		<Transfer
			:data="allSecretTables"
			:target-keys="targetSecretTables"
			:list-style="listStyle"
			:render-format="renderSecret"
			:titles="titles"
			filterable
			@on-change="handleChange">
		</Transfer>
		<br/>
		<Button type="primary" @click="addSecretTables()">增加授权</Button>
		<Button @click="reset()" style="margin-left: 8px">清空</Button>
	</div>
</template>
<script>
	import { getAllSecretTablesAjax } from './request';
	import { grantSecretPrivAjax } from './request';
	
    export default {
        data () {
            return {
                allSecretTables: this.getAllSecrets(),
                targetSecretTables: [],
				listStyle: {
                    width: '40%',
                    height: '500px'
                },
				titles:['所有机密数据表','要给用户授权的机密数据表'],
				inputUser:''
            }
        },
		mounted () {
			this.$Message.config({duration: 5});
        },
        methods: {
            getAllSecrets () {
				var me = this;
				var secretData = [];
				getAllSecretTablesAjax({}).then(
					function (res) {
						if (res.status == 0) {
							for (var index in res.data) {
								secretData.push({
									key: res.data[index].id,
									label: res.data[index].table_schema + '.' + res.data[index].table_name,
									description: res.data[index].table_schema + '.' + res.data[index].table_name
								});
							}
						}
					},
					function (res) {
						me.$Message.error("请求后端所有机密表数据失败...");
					}
				);
				return secretData;
            },
            renderSecret (item) {
                return item.label;
            },
            handleChange (newTargetKeys, direction, moveKeys) {
                this.targetSecretTables = newTargetKeys;
            },
			addSecretTables() {
				var me = this;
				
				if (me.inputUser == '') {
					me.$Message.info("请输入要授权的用户名!");
				} else if (me.targetSecretTables.length == 0) {
					me.$Message.info("请选择授权的表!");
				} else {
					var params = {username:me.inputUser, targetSecretTables:me.targetSecretTables};
					grantSecretPrivAjax(params).then(
						function (res){
							if (res.status == 0) {
								me.$Message.success("机密数据授权成功! ");
							} else {
								me.$Message.config({duration: 10});
								me.$Message.warning("已经提交到后端! " + res.message);
							}
						},
						function () {
							me.$Message.error("授权失败! 请检查服务器...");
						}
					);
					
					//从后端刷新一下
					me.getAllSecrets();
				}
			},
			reset() {
				var me = this;
				me.targetSecretTables = [];
				//从后端刷新一下
				me.getAllSecrets();
			}
        }
    }
</script>