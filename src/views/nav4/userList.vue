<template>
    <section>

        <!--列表-->
        <template>
            <el-table :data="userList" highlight-current-row v-loading="loading" style="width: 100%;">
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="userId" label="Id" width="90" sortable>
                </el-table-column>
                <el-table-column prop="userSex" label="性别" width="90" :formatter="formatSex" sortable>
                </el-table-column>
                <el-table-column prop="userPhone" label="电话" width="130" sortable>
                </el-table-column>
                <el-table-column prop="addressString" label="地址" width="280" sortable>
                </el-table-column>
                <el-table-column prop="userNick" label="昵称" width="120" sortable>
                </el-table-column>
                <el-table-column prop="takeOut" label="外卖状态" width="120" :formatter="formatTake" sortable>
                </el-table-column>
                <el-table-column prop="createdTime" label="创建时间" min-width="185" :formatter="formatTime" sortable>
                </el-table-column>
            </el-table>
        </template>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>
<script>
    export default {
        name: "userList",
        data() {
            return {
                loading: false,
                userList:[],
                page:1,
                total:20,
            }
        },
        methods: {
            formatTime: function (row, column) {
                return new Date(row.createdTime).toLocaleString()
            },
            formatSex: function (row, column) {
                return row.userSex === 1 ? '男' : row.userSex === 0 ? '女' : '未知';
            },
            formatTake: function (row, column) {
                return row.takeOut === 1 ? '外卖' : row.takeOut === 0 ? '自提' : '未知';
            },
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.getFeedList();
            },
            getFeedList(){
                this.$http.post('/api/user/list.do', {
                        pageNum:this.page,
                        pageSize:20
                    },
                ).then((res)=>{
                    if(res.data.success){
                        this.userList = res.data.data;
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
            this.getFeedList();
        }
    };

</script>

<style scoped>

</style>