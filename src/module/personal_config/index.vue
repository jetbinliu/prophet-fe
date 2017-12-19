<style>
	.main-form{
		margin-right: 30px;
		margin-top: 10px;
		margin-left: 30px;
		margin-bottom: 10px;
		width:80%;
	}

</style>
<template>
	<div class="main-form">
		<i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180">
			<Form-item label="查询历史显示条目数" prop="histQueryCnt">
				<Input-number :max="100" :min="20" v-model="formValidate.histQueryCnt"></Input-number>
			</Form-item>
			<Form-item label="是否显示头像" prop="displayAvator">
				<i-switch v-model="formValidate.displayAvator">
					<span slot="open" >是</span>
					<span slot="close">否</span>
				</i-switch>
			</Form-item>
			<Form-item>
				<i-button type="primary" @click="handleSubmit('formValidate')">保存修改</i-button>
				<i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空</i-button>
			</Form-item>
		</i-form>
	</div>
</template>
<script>
	import Icon from 'iview/src/components/icon/icon';
	import Button from 'iview/src/components/button/button';
	
	import { getAllProphetUsersAjax } from './request';
	
    export default {
        data () {
            return {
				
                formValidate: {
                    histQueryCnt: 20,
					displayAvator: true
                },
                ruleValidate: {
                    histQueryCnt: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
		mounted(){
			
		},
        methods: {
            handleSubmit (name) {
				var me = this;
                me.$refs[name].validate((valid) => {
                    if (valid) {
						var params = {
							displayAvator: me.formValidate.displayAvator
						};
						addProphetUserAjax(params).then(
							function (res) {
								if (res.status == 0) {
									me.$Message.success('新增用户成功!');
									
									//刷新一下
									me.getAllProphetUsers();
								} else {
									me.$Message.config({duration: 10});
									me.$Message.error(res.message);
								}
							},
							function (res) {
								me.$Message.error("新增用户失败!");
							}
						);
                        
                    } else {
                        me.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>