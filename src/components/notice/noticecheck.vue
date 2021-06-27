<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>消息列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <el-link icon="el-icon-edit">编辑</el-link> -->
    <!-- <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link> -->
    <el-tag>系统消息接收与推送</el-tag>
    <el-collapse accordion>
      <!-- 方式1 -->
      <!-- <el-collapse-item v-for="item in travelInfo" key="item.id">
        <template #title>
          <i class="header-icon el-icon-info"></i>
          {{ item.title }}
        </template>
        <div>{{ item.content }}</div>
      </el-collapse-item> -->
      <!-- 方式2 -->
      <el-collapse-item v-for="item in travelInfo" :key="item.id" :title="item.title">
        <div>
          <i class="header-icon el-icon-info"></i>
          {{ item.content }}
        </div>
        <el-link icon="el-icon-edit" @click="addInfoDia()">发布新消息</el-link>
        <el-link icon="el-icon-delete" @click="deleteInfo(item.id)">删除消息</el-link>
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="发布新消息" :visible.sync="dialogVisible" width="50%" height="400px">
      <span>
          <el-form :model="addTravelInfo" status-icon label-width="80px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input type="text" v-model="addTravelInfo.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="title">
                <el-input type="textarea" v-model="addTravelInfo.content" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible  = false">取 消</el-button>
          <el-button type="primary" @click="addInfo()">发 布</el-button>
        </span>
      </template>
    </el-dialog>
    <el-pagination
      background
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="totals"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totals: 0,
      pageSize: 3,
      currentPage: 1,
      dialogVisible: false,
      addTravelInfo:{
          title:"",
          content:"",
      },
      //景点消息列表
      travelInfo: [
        {
          id: 1,
          title: "安定的我们",
          content:
            "今天在了协商达成!今天在了协商达成!今天在了协商达成!今天在了协商达成!今天在了协商达成!今天在了协商达成!今天在了协商达成!今天在了协商达成!今天在了协商达成!今天在了协商达成!",
        },
        { id: 2, title: "with you!", content: "我们依旧在这几项" },
        { id: 3, title: "with you!", content: "我们依旧在这几项" },
        { id: 4, title: "毕业季", content: "好喷涂有扽分的" },
        { id: 5, title: "毕业季", content: "好喷涂有扽分的" },
        { id: 6, title: "毕业季", content: "好喷涂有扽分的" },
        { id: 7, title: "毕业季", content: "好喷涂有扽分的" },
      ],
    };
  },
  methods: {
    //删除消息
    deleteInfo(index) {
      this.$confirm("确定删除此消息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // js根据索引删除记录
          this.travelInfo.splice(index - 1, 1);
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.totals--;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //显示添加消息框
    addInfoDia() {
        this.dialogVisible=true;
    },
    //添加消息
    addInfo(){
      // 向travelInfo中添加数据
      this.travelInfo.push({
        title:this.addTravelInfo.title,
        content:this.addTravelInfo.content,
      });
      this.dialogVisible=false;
      this.$message({
        message: "添加成功",
        type:"success",
      })
      this.totals=this.totals+1;
    },
    //静态获取页面中数据的总条数
    getTotals() {
      var num = 0;
      this.travelInfo.forEach((element) => {
        num++;
      });
      this.totals = num;
    },
  },
  mounted() {
    this.getTotals();
  },
};
</script>

<style>
.el-collapse {
  margin-top: 20px;
}
.el-collapse-item__header {
  font-family: "楷体";
  font-size: 18px;
  color: #409eff;
}
.el-collapse-item__content {
  font-family: "楷体";
  color: #909399;
  font-size: 16px;
}
.el-link {
  float: right;
}
.el-tag {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
