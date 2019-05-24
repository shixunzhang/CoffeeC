<template>
    <section>

        <!--列表-->
        <template>
            <el-table :data="FeedList" highlight-current-row v-loading="loading" style="width: 100%;">
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="feedbackId" label="ID" width="100" sortable>
                </el-table-column>
                <el-table-column prop="userId" label="用户Id" width="100" sortable>
                </el-table-column>
                <el-table-column prop="feedbackText" label="反馈内容" width="420" sortable>
                </el-table-column>
                <el-table-column prop="contactInformation" label="联系方式" width="200" sortable>
                </el-table-column>
                <el-table-column prop="createdTime" label="创建时间" min-width="185" :formatter="formatTime" sortable>
                </el-table-column>
            </el-table>
        </template>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>
<script>
    export default {
        name: "feedBack",
        data() {
            return {
                loading: false,
                FeedList:[],
                page:1,
                total:10,
            }
        },
        methods: {
            formatTime: function (row, column) {
                return new Date(row.createdTime).toLocaleString()
            },
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.getFeedList();
            },
            getFeedList(){
                this.$http.post('/api/feedback/list.do', {
                    pageNum:this.page,
                    pageSize:10
                    },
                ).then((res)=>{
                    if(res.data.success){
                        this.FeedList = res.data.data;
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