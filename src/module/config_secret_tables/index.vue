<style>
	.main-form{
		margin-right: 30px;
		margin-top: 10px;
		margin-left: 30px;
		margin-bottom: 10px;
	}
</style>
<template>
	<div class="main-form">
		<Transfer
			:data="allNonSecretTables"
			:target-keys="targetSecretTables"
			:list-style="listStyle"
			:render-format="renderSecret"
			:titles="titles"
			filterable
			@on-change="handleChange">
		</Transfer>
		<br/>
		<Button type="primary" @click="addSecretTables()">提交</Button>
		<Button @click="reset()" style="margin-left: 8px">清空</Button>
	</div>
</template>
<script>
	import { getAllNonSecretsAjax } from './request';
	import { addSecretTablesAjax } from './request';
	
    export default {
        data () {
            return {
                allNonSecretTables: this.getAllNonSecrets(),
                targetSecretTables: [],
				listStyle: {
                    width: '40%',
                    height: '500px'
                },
				titles:['非机密数据表','要标记为机密的表']
            }
        },
		mounted () {
			this.$Message.config({duration: 5});
        },
        methods: {
            getAllNonSecrets () {
				var me = this;
				var secretData = [];
				getAllNonSecretsAjax({}).then(
					function (res) {
						if (res.status == 0) {
							for (var index in res.data) {
								secretData.push({
									key: res.data[index].DB_NAME + '.' + res.data[index].TBL_NAME,
									label: res.data[index].DB_NAME + '.' + res.data[index].TBL_NAME,
									description: res.data[index].DB_NAME + '.' + res.data[index].TBL_NAME
								});
							}
						}
					},
					function (res) {
						me.$Message.error("请求后端所有非机密表数据失败...");
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
				if (me.targetSecretTables.length == 0) {
					me.$Message.info("请选择要标记为机密数据的表!");
				} else {
					var params = {targetSecretTables:me.targetSecretTables};
					addSecretTablesAjax(params).then(
						function (res){
							if (res.status == 0) {
								me.$Message.success("新增成功! ");
							} else {
								me.$Message.config({duration: 10});
								me.$Message.warning("已提交成功但有错误! " + res.message);
							}
						},
						function () {
							me.$Message.error("新增失败! 请检查服务器...");
						}
					);
					
					//从后端刷新一下
					me.getAllNonSecrets();
				}
			},
			reset() {
				var me = this;
				me.targetSecretTables = [];
				//从后端刷新一下
				me.getAllNonSecrets();
			}
        }
    }
</script>