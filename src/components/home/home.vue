<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <!-- border-radius:50%  将图片设置成圆状 -->
          <!-- <img src="../../assets/images/login.png" alt="图片无法显示" class="login-img"> -->
          <img src="../../assets/images/me.jpg" alt="me" size="small" style=" width: 50px; height: 50px;
                  border-radius: 50%;
                  margin-top: 5px;
                  margin-left: 45px;
                  z-index:1;
                  "/>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="18">
          <div class="login-middle">
            <h3>
              <i class="el-icon-loading"></i>
              基于web旅游景点管理系统的设计与实现
              <span class="timeBtn">{{ dateFormat(newDate) }}</span>
            </h3>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-dropdown>
              <div style="margin-top: 20px">
                <span class="el-dropdown-link">
                  <span>管理员:admin</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              </div>

              <!-- <i class="el-icon-s-fold"></i> -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <a href="#" class="WeInfo" @click="dialogVisible = true"
                    >个人信息</a
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <a
                    href="#"
                    class="Setting"
                    @click="dialogVisibleSetting = true"
                    >系统设置</a
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <a
                    href="http://hotel.qunar.com/?kwid=46317867|13191900948&cooperate=baidu52&pcrid=13191900948&pkw=&pmt=&mkwid=136OVJjc4"
                    class="About"
                    target="_black"
                    >关于我们</a
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <a href="#" class="loginout" @click.prevent="handleSignout()">退出系统</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <!-- 个人信息 弹窗 -->
    <el-dialog title="个人信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose"
    >
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="作者:">
          <el-input type="text" value="admin"></el-input>
        </el-form-item>
        <el-form-item label="年龄:">
          <el-input type="number" value="23"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-input type="sex" value="男"></el-input>
        </el-form-item>
        <el-form-item label="学校:">
          <el-input type="text" value="辽宁科技学院"></el-input>
        </el-form-item>
        <el-form-item label="专业:">
          <el-input type="text" value="计算机科学与技术"></el-input>
        </el-form-item>
        <el-form-item label="年级:">
          <el-input type="text" value="fourth grade"></el-input>
        </el-form-item>
        <el-form-item label="爱好:">
          <el-tag :key="tag.name" v-for="tag in dynamicTags" :type="tag.type" closable
                  :disable-transitions="false"
                  @close="handleCloseTag(tag)">
            {{tag.name}}
            </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="座右铭:">
          <el-input type="text" value="没有比脚更长的路,没有比人更高的山!" style="width:200%"></el-input>
        </el-form-item><br>
        <el-form-item label="计划:">
          <el-input type="textarea" value="..."></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 系统设置 弹窗 -->
    <el-dialog
      title="系统设置"
      :visible.sync="dialogVisibleSetting"
      width="30%"
      :before-close="handleCloseSetting"
    >
      <!-- <span>这是一段信息</span> -->
      <span>
        <h3>暂无更新,敬请期待...</h3>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSetting = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleSetting = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 侧边导航栏 -->
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 侧边导航栏 -->
        <!-- true首字母为大写无用 / 开启路由模式-->
        <el-menu :unique-opened="true" :router="true">
          <!-- 0 -->
          <el-submenu index="0">
            <template slot="title">
              <!-- <template slot="title">分组一</template> -->
              <i class="el-icon-user-solid"></i>
              <span>景点用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-s-custom"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 1 -->
          <el-submenu index="1">
            <!-- index的值不能一样 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理景点信息</span>
            </template>
            <el-menu-item index="travelsAll">
              <i class="el-icon-s-help"></i>
              <span>查看所有景点</span>
            </el-menu-item>
            <el-menu-item index="travellist">
              <i class="el-icon-menu"></i>
              <span>省份景点列表</span>
            </el-menu-item>
            <el-menu-item index="addtravel">
              <i class="el-icon-folder-opened"></i>
              <span>添加景点信息</span>
            </el-menu-item>
            <el-menu-item index="searchTravel">
              <i class="el-icon-search"></i>
              <span>搜索景点信息</span>
            </el-menu-item>

            <el-menu-item index="otherTravel">
              <i class="el-icon-discover"></i>
              <span>景点待开发项</span>
            </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-school"></i>
              <span>景点省份管理</span>
            </template>
            <el-menu-item index="province">
              <i class="el-icon-notebook-2"></i>
              <span>省份列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-discount"></i>
              <span>周边食宿查询</span>
            </template>
            <el-menu-item index="foodcheck">
              <i class="el-icon-price-tag"></i>
              <span>周边住宿查询</span>
            </el-menu-item>
            <el-menu-item index="checkothers">
              <i class="el-icon-ship"></i>
              <span>查看其他景点</span>
            </el-menu-item>
            <el-menu-item index="developed">
              <i class="el-icon-bell"></i>
              <span>待开发</span>
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-magic-stick"></i>
              <span>景点线路查询</span>
            </template>
            <el-menu-item index="routecheck">
              <i class="el-icon-coordinate"></i>
              <span>路线</span>
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>景点门票销售</span>
            </template>
            <el-menu-item index="orderList">
              <i class="el-icon-shopping-cart-1"></i>
              <span>订单列表</span>
            </el-menu-item>
            <el-menu-item index="ticketsale">
              <i class="el-icon-circle-plus"></i>
              <span>门票预订</span>
            </el-menu-item>
            <el-menu-item index="ticketreturn">
              <i class="el-icon-remove"></i>
              <span>门票退订</span>
            </el-menu-item>
          </el-submenu>
          <!-- 6 -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-flag"></i>
              <span>景点公告管理</span>
            </template>
            <el-menu-item index="noticecheck">
              <i class="el-icon-date"></i>
              <span>公告说明</span>
            </el-menu-item>
          </el-submenu>
          <!-- 7 -->
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span>景点数据展示</span>
            </template>
            <el-menu-item index="yiqingdata">
              <i class="el-icon-copy-document"></i>
              <span>疫情可视化</span>
            </el-menu-item>
            <el-menu-item index="datashow">
              <i class="el-icon-data-analysis"></i>
              <span>旅游可视化</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 关闭个人信息弹窗
      dialogVisible: false,
      dialogVisibleSetting: false,
      //当前时间
      newDate: new Date(),
      //标签
      dynamicTags: [
          { name: '写代码', type: '' },
          { name: '打蓝球', type: 'success' },
          { name: '桌球', type: 'info' },
          { name: '哲学', type: 'warning' },
          { name: '健身', type: 'danger' }
      ],
      // dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      imageUrl: 'src\assets\images\me.jpg'   
    };
  },
  // newVue之前自动触发(若没有登录过，就无法进入home组件)
  // beforeCreate() {
  //       // 获取token
  //       const token = localStorage.getItem('token')
  //       if (!token) {
  //             // 没有token，跳转到登录页面
  //             this.$router.push({ name: 'login' })
  //       }
  //       // if token 有 -> 继续渲染组件
  // },
  mounted() {
    let that = this;
    this.timer = setInterval(function () {
      that.newDate = new Date().toLocaleString();
    });
  },
  // 销毁时清除计时器
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
      //头像上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //标签
      handleCloseTag(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    // 时间格式化
    dateFormat() {
      var date = new Date();
      var year = date.getFullYear();
      //在日期格式中，月份是从0开始的
      //使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let week = date.getDay(); // 星期
      let weekArr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      // 拼接 时间格式处理
      return (
        year +
        "年" +
        month +
        "月" +
        day +
        "日 " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        weekArr[week]
      );
    },

    //   退出系统
    handleSignout() {
      // 清楚token
      localStorage.clear();
      // 提示退出成功
      this.$message.success("退出成功");
      // 回到login组件
      this.$router.push({ name: "login" });
    },

    // 点击  个人信息 弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleCloseSetting(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #fff;
}

/* 头部样式 */
.login-img {
  height: 60px;
  width: 80px;
  margin-left: 30px;
}

.login-middle {
  text-align: center;
}
.timeBtn {
  display: block;
  width: 250px;
  font-size: 10px;
  margin-left: 770px;
  margin-top: -20px;
}

.loginout {
  text-decoration: none;
  color: rgb(17, 9, 11);
}

.WeInfo {
  text-decoration: none;
  color: rgb(17, 9, 11);
}

.Setting {
  text-decoration: none;
  color: rgb(17, 9, 11);
}

.About {
  text-decoration: none;
  color: rgb(17, 9, 11);
}
/* tag标签样式 */
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  /* 头像上传样式 */
  .avatar-uploader .el-upload {
    border: 1px dashed gray;
    border-radius: 25px;
    cursor: pointer;
    position: absolute;
    overflow: hidden;
    margin-top: -55px;
    margin-left: 45px; 
    z-index:2;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>
