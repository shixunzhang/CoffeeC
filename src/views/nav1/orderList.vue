<template>
    <section>

        <!--列表-->
        <el-table :data="orderList" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="orderNo" label="订单号" width="120" sortable>
            </el-table-column>
            <el-table-column prop="goodsSize" label="规格" width="90" :formatter="formatSize" sortable>
            </el-table-column>
            <el-table-column prop="goodsSugar" label="加糖" width="90" :formatter="formatSugar" sortable>
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
            <el-button @click="finishOrder" :disabled="this.orderList==null||this.orderList.length===0">完成订单</el-button>
        </el-col>

    </section>
</template>

<script>

    export default {
        name: "orderList",
        data() {
            return {
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

            //完成订单
            finishOrder: function () {
                this.$confirm('确认确定完成此订单？', '提示', {
                    type: 'info'
                }).then(() => {
                    this.finishOrderAjax();
                }).catch(() => {
                });
            },
            finishOrderAjax(){
                this.$http.post(' /api/order/FinishOrder.do', {
                    orderNo:this.orderList[0].orderNo,
                    userId:this.orderList[0].userId,
                    },
                ).then((res)=>{
                    if(res.data.success){
                        this.$message({
                            message: '订单完成成功',
                            type: 'success'
                        });
                        this.getOrderList()
                    }else{
                        console.log(res.data.msg)
                    }
                }).catch(error =>{
                    console.log(error)
                })

            },
            getOrderList(){
                this.$http.post('/api/order/ConsoleOrder.do', {},
                ).then((res)=>{
                    if(res.data.success){
                        this.orderList = res.data.data;
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