<template>
    <div>
        <div style="margin: 10px 0;">
            
            <Select v-model="model1"  clearable placeholder="请选择城市" @on-change="refresh" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
             
        </div>
    <Table :columns="columns1" :data="data1"></Table>
<router-link to="/home">Go to Foo</router-link>
    </div>
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
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: []
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
                            age: 123
                        },
                         {
                            name: '12312',
                            age: 123
                        }
                    ];
                    me.cityList = [
                        {
                            value: '1',
                            label: '北京'
                        }
                    ]
                })
            }
        }
    }
</script>
