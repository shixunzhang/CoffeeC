<template>
    <section>
        <!--工具条   查询-->
        <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">-->
            <!--<el-form :inline="true" :model="filters">-->
                <!--<el-form-item>-->
                    <!--<el-input v-model="filters.name" placeholder="姓名"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" v-on:click="getUsers">查询</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</el-col>-->

        <!--列表-->
        <el-table :data="orderList" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="orderNo" label="订单号" width="120" sortable>
            </el-table-column>
            <el-table-column prop="goodsSize" label="规格" width="90" :formatter="formatSize">
            </el-table-column>
            <el-table-column prop="goodsSugar" label="加糖" width="90" :formatter="formatSugar">
            </el-table-column>
            <el-table-column prop="goodName" label="商品名" width="100" sortable>
            </el-table-column>
            <el-table-column prop="orderNumber" label="数量" width="90" sortable>
            </el-table-column>
            <el-table-column prop="createdTime" label="下单时间" width="120" :formatter="formatTime" sortable>
            </el-table-column>
            <el-table-column prop="orderAddress" label="地址" min-width="180" :formatter="formatAddress" sortable>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
    export default {
        name: "finishList",
        data() {
            return {
                total: 20,
                page: 1,
                listLoading: false,
                orderList:[],
            }
        },
        methods: {

            formatTime: function (row, column) {
                return new Date(row.createdTime).toLocaleString()
            },
            formatAddress: function (row, column) {
                if(row.orderAddress === '-1'){
                    return "自提订单"
                }else{
                    return row.orderAddress
                }
            },
            formatSize: function(row ,column){
                if(row.goodsCategory!=3){
                    if(row.goodsSize === 1){
                        return "小杯"
                    }else if(row.goodsSize === 2){
                        return "中杯"
                    }else{
                        return "大杯"
                    }
                }else{
                    return "×"
                }
            },
            formatSugar: function(row ,column){
                if(row.goodsSugar === 1){
                    return "加糖"
                }else{
                    if(row.goodsCategory===1){
                        return "无糖"
                    }else{
                        return "×"
                    }
                }
            },
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.getOrderList();
            },
            getOrderList(){
                this.$http.post('/api/order/ConsoleList.do',
                    {
                        finishFlag:1,
                        pageNum:this.page,
                        pageSize:20
                    },
                ).then((res)=>{
                    if(res.data.success){
                        this.orderList = res.data.data;
                        this.total = parseInt(res.data.msg);
                    }else{
                        console.log(res.data.msg)
                    }
                }).catch(error =>{
                    console.log(error)
                })
            },
        },
        mounted() {
            this.getOrderList();
        }
    }

</script>

<style scoped>

</style>