<template>
<el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理景点信息</el-breadcrumb-item>
        <el-breadcrumb-item>景点列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row class="searchRow">
        <el-col>
            <el-input @click="loadTravelList()" clearable placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button @click="searchTravel()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button @click="showAddTravelDia()" type="success">添加景点</el-button>
        </el-col>
    </el-row>

    <!-- 点击添加景点弹出信息框 -->
    <el-dialog title="添加景点" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="travelform">
            <el-form-item label="景点名称" label-width="100px">
                <el-input v-model="travelform.travelname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在省份" label-width="100px">
                <el-input v-model="travelform.province" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="添加时间" label-width="100px">
                <el-input v-model="travelform.date" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="管理员" label-width="100px">
                <el-input v-model="travelform.administrators" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addTravel()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 获取数据表格 -->
    <el-table :data="travelData" style="width: 100%">
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column prop="travelname" label="景点名称" width="180">
        </el-table-column>
        <el-table-column prop="province" label="所在省" width="180">
        </el-table-column>
        <el-table-column prop="create_time" label="近期查看时间" width="180">
            <template slot-scope="scope">
                <!-- {{create_time | fmtdate}} -->
                {{scope.row.create_time | fmtdate}}
            </template>
        </el-table-column>
        <el-table-column prop="administrators" label="管理员">
        </el-table-column>
        <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
                <!-- size:尺寸 // plain:是否朴素按钮 -->
                <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="showEditUserDia(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="showDeleteUserMsgBox()"></el-button>
                <el-button type="primary" icon="el-icon-share" size="mini" plain circle></el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination class="fenye" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</el-card>
</template>

<script>
export default {
    data(){
        return{
            query: '',
            dialogFormVisibleAdd: false,
            //分组相关数据
            total: 10,
            pagenum: 1,
            pagesize: 2,
            travelform:{
                travelname:'',
                province:'',
                date:'',
                administrators:''
            },
            travelData:[{
                travelname:'丹霞地貌',
                province:'甘肃省',
                administrators:'admin'
            },{
                travelname:'方舟水世界',
                province:'甘肃省',
                administrators:'admin'
            },{
                travelname:'天安门广场',
                province:'北京市',
                administrators:'admin'
            },{
                travelname:'钟鼓楼',
                province:'陕西省',
                administrators:'admin'
            }],
        }
    },
    methods:{
        addTravel(){
            this.dialogFormVisibleAdd = false
        },
        loadTravelList(){
            this.travelData()
        },
        searchTravel(){
            this.travelData()
        },
        showAddTravelDia(){
            this.dialogFormVisibleAdd = true
        },
    }

}
</script>

<style>
.box-card {
    height: 100%;
}

.searchRow {
    margin-top: 20px;
}

.inputSearch {
    width: 400px;
}
.fenye{
    /* margin-top: 20px; */
    padding-top: 20px;
}
</style>
