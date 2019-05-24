<template>
    <section>

        <!--列表-->
        <template>
            <el-table :data="goodsList" highlight-current-row v-loading="loading" style="width: 100%;">
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="goodsName" label="商品名" width="130" sortable>
                </el-table-column>
                <el-table-column prop="goodsNameEn" label="英文名" width="150" sortable>
                </el-table-column>
                <el-table-column prop="goodsPriceSmall" label="商品价格" width="120" sortable>
                </el-table-column>
                <el-table-column prop="createdTime" label="创建时间" min-width="185" :formatter="formatTime" sortable>
                </el-table-column>
            </el-table>
        </template>

    </section>
</template>
<script>
    import { getUserList } from '../../api/api';
    export default {
        name: "dessertList",
        data() {
            return {
                loading: false,
                goodsList:[],
            }
        },
        methods: {
            formatTime: function (row, column) {
                return new Date(row.createdTime).toLocaleString()
            },
            getGoodsList(){
                this.$http.post('/api/goods/list.do', {
                        goodsCategory:3,
                    },
                ).then((res)=>{
                    if(res.data.success){
                        this.goodsList = res.data.data;
                    }else{
                        console.log(res.data.msg)
                    }
                }).catch(error =>{
                    console.log(error)
                })
            },
        },
        mounted() {
            this.getGoodsList();
        }
    };

</script>

<style scoped>

</style>