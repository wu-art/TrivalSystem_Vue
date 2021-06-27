<template>
  <el-card class="card-login">
    <!-- 顶部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理景点信息</el-breadcrumb-item>
      <el-breadcrumb-item>添加景点信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加表单 -->
    <el-form
      :model="addTravelList"
      ref="addTravelList"
      :rules="addTravelsRules"
      class="add-form"
    >
      <el-form-item label="景点名称" label-width="100px" prop="name">
        <el-input v-model="addTravelList.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="景点图片" label-width="100px" prop="picpath">
        <label class="el-label">
          <div style="text-align: center; padding-left: 8%">
            <!-- id="upload-tip" -->
            <div id="upload-tip">+</div>
            <img :src="img" v-show="img" id="img-show" style="display: none">
            <input type="file" ref="myfile" style="display:none;" @change="imgfileChange">
          </div>
        </label>
      </el-form-item>
      <el-form-item label="旺季时间" label-width="100px" prop="hottime">
        <el-input
          type="date"
          placeholder="选择日期"
          v-model="addTravelList.hottime"
        ></el-input>
      </el-form-item>
      <el-form-item label="旺季门票" label-width="100px" prop="hotticket">
        <el-input
          v-model="addTravelList.hotticket"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="淡季门票" label-width="100px" prop="dimticket">
        <el-input
          v-model="addTravelList.dimticket"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="景点描述" label-width="100px" prop="descript">
        <el-input
          v-model="addTravelList.descript"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属省份" label-width="100px" prop="provinceid">
        <el-select v-model="addTravelList.provinceid" placeholder="请选择" style="width:500px">
          <!-- <el-option v-for="item in provinces" :key="item.name" :value="item.id" :v-text="item.name">
          </el-option> -->
          <el-option  v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
          <!-- :value="item.id" v-text="item.name" -->
        </el-select>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="addTravel()">添 加</el-button>
        <el-button @click="resetForm('addTravelList')">重 置</el-button>
        <el-button type="primary" @click="toTravelList()">查 看</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      img:"",
      provinces: [],
      addTravelList: {
        name: "",
        picpath: "",
        hottime: "",
        hotticket: "",
        dimticket: "",
        descript: "",
        provinceid: "",
      },
      addTravelsRules: {
        name: [{ required: true, message: "请输入景点名称", trigger: "blur" }],
        picpath: [
          { required: true, message: "请选择景点照片", trigger: "blur" },
        ],
        hottime: [
          { required: true, message: "请选择旺季时间", trigger: "blur" },
        ],
        hotticket: [
          { required: true, message: "请输入旺季门票", trigger: "blur" },
        ],
        dimticket: [
          { required: true, message: "请输入淡季门票", trigger: "blur" },
        ],
        descript: [
          { required: true, message: "请输入景点描述", trigger: "blur" },
        ],
        provinceid: [
          { required: true, message: "请输入省份id", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.findAllProvince()
  },
  methods: {
    // 选择文件
    // selectFile(){
    //   this.$refs.myfile.click()
    // },
    // 显示图片
    imgfileChange() {
      // var freader = new FileReader();
      // 通过DOM取文件数据
      const file = this.$refs.myfile.files[0]
      // freader.readAsDataURL(file);
      // 计算文件大小 KB
      // const size = Math.floor(file.size / 1024)
      // 显示本地图片
      this.img = window.URL.createObjectURL(file)
      // 创建formdata对象
      // var formData = new FormData();
      // formData.append("picfile", file);

      // var upload_tip = document.getElementById("upload-tip");
      // var img_show = document.getElementById("img-show");
      // var imgfile = document.getElementById("imgfile");
      // var freader = new FileReader();
      // // console.log(freader)
      // freader.readAsDataURL(imgfile.files[0]);
      // // console.log(imgfile.files[0]);
      // freader.onload = function (e) {
      //   img_show.src = e.target.result;
      //   img_show.style.display = "inline";
      //   upload_tip.style.display = "none";
      //   // console.log(freader.result)
      // };
    },
    findAllProvince() {
      const _this = this;
      axios.get("http://localhost:8081/api/province/findByPage?rows=35").then((res) => {
          _this.provinces = res.data.province
          // console.log(_this.provinces)
        });
    },
    // 点击查看 按钮 发送请求
    addTravel() {
      const _this = this;
      var formData = new FormData();
      // formData.append("picfile", myfile.files[0]);
      formData.append("picfile", this.$refs.myfile.files[0]);
      formData.append("name", this.addTravelList.name);
      formData.append("hottime", this.addTravelList.hottime);
      formData.append("hotticket", this.addTravelList.hotticket);
      formData.append("dimticket", this.addTravelList.dimticket);
      formData.append("descript", this.addTravelList.descript);
      formData.append("provinceid", this.addTravelList.provinceid);
      axios({
        method: "post",
        url: "http://localhost:8081/api/travels/save",
        headers: {
          "Content-type": "multipart/form-data",
        },
        data: formData,
        // responseType:"arraybuffer"
      }).then(function (res) {
        // console.log(res)
        if (res.data.state) {
          _this.$message.success(res.data.msg);
        } else {
          _this.$message.error(res.data.msg);
        }
      });
    },
    toTravelList() {
      this.$router.push("/travellist");
    },
    resetForm(addTravelList) {
      this.$refs[addTravelList].resetFields();
    },
  },
};
</script>

<style>
.card-login {
  height: 100%;
}

.add-form {
  margin-top: 20px;
}

.el-input {
  width: 50%;
}

.btn {
  margin-top: 50px;
  margin-left: 100px;
}

.el-label {
  display: block;
  padding-bottom: 12px;
  width: 135px;
  height: 135px;
}

#upload-tip {
  border: 1px dashed #d9d9d9;
  width: 135px;
  height: 135px;
  line-height: 135px;
  cursor: pointer;
  font-size: 36px;
  color: #d9d9d9;
}

#img-show {
  width: 135px;
  height: 135px;
  display: block;
  margin: -136px auto;
  object-fit: cover;
}
</style>
