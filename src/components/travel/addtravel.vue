<template>
<el-card class="card-login">
    <!-- 顶部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理景点信息</el-breadcrumb-item>
        <el-breadcrumb-item>添加景点信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" :label-position="labelPosition" class="add-travel">
        <el-form-item label="旅游团名称" prop="name">
            <el-col :span="11">
                <el-input v-model="ruleForm.name"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="旅游团类型" prop="region">
            <!-- <el-col :span="30"> -->
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            <!-- </el-col> -->
        </el-form-item>
        <el-form-item label="旅游团人数" prop="numbers">
            <el-col :span="11">
                <el-input v-model="ruleForm.numbers"></el-input>
            </el-col>

        </el-form-item>
        <el-form-item label="导游" prop="traveler">
            <el-col :span="11">
                <el-input v-model="ruleForm.traveler"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="旅游时间" required>
            <el-col :span="5">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="5">
                <el-form-item prop="date2">
                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="旅游团介绍" prop="desc">
            <el-col :span="11">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-col>           
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="add-btn">立即添加</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'left',
            ruleForm: {
                name: '',
                region: '',
                numbers: '',
                traveler: '',
                date1: '',
                date2: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入旅游团名称', trigger: 'blur' },
                    { min: 0, max: 100, message: '', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择旅游团类型', trigger: 'change' }
                ],
                numbers: [
                    { required: true, message: '请选择人数', trigger: 'change' }
                ],
                traveler: [
                    { required: true, message: '请选择导游', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写旅游团介绍', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('添加成功!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }

}
</script>

<style>
.card-login {
    height: 100%;
}
.add-travel {
    margin-top: 20px;
}
.line{
    padding-left: 20px;
}
.add-btn{
    margin-left: 120px;
    margin-top: 40px;
}
</style>
