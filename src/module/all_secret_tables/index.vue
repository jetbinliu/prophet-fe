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
		<Alert type="success" show-icon closable>
        机密数据说明
        <span slot="desc">以下展示的表并非全部表，而是已经标记为机密数据的表，并会展示哪些表您已拥有权限</span>
    </Alert>
		<Collapse>
			<Panel key="title" v-for="title in secretPanelTitles">
				{{title}}
				<p slot="content">
					<Table size="small" stripe :columns="secretTableCols" :data="secretPanelTableData[title]" :show-header="false">
					
					</Table>
				</p>
			</Panel>
		</Collapse>
	</div>
</template>
<script>
	import { getAllSecretsByUser } from './request';
	
    export default {
		mounted () {
			this.getAllSecrets();
        },
        data () {
            return {
				secretTableCols:[
					{
						title: '表名',
						key: 'table_name'
					},
					{
						title: '说明',
						key: 'info'
					}
				],
				secretPanelTitles:[],
				secretPanelTableData:[]
            }
        },
        methods: {
            getAllSecrets(){
				var me = this;
				getAllSecretsByUser({}).then(
					function (res) {
						if (res.status == 0) {
							me.secretPanelTitles = Object.keys(res.data);
							me.secretPanelTableData = res.data;
						}
						
					},
					function (res) {
						this.$Message.error("请求所有机密数据失败，服务器不知道去哪儿了...");
					}
				);
			}
        }
    }
</script>