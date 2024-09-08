<template>
  <h1>用户管理</h1>

  <!-- 添加用户 -->
  <el-button type="primary" :icon="Edit" circle @click="dialogFormVisible = true" />

  <el-dialog v-model="dialogFormVisible" title="新增管理员" width="500">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.adminname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.passward" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-input v-model="form.rold" autocomplete="off" />
      </el-form-item>
      <el-form-item label="checkedKeys" :label-width="formLabelWidth">
        <el-input v-model="form.checkedKeys" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="restForm()">取消</el-button>
        <el-button type="primary" @click="useradd()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 编辑用户 -->
  <el-dialog v-model="upduser" title="编辑管理员" width="500">
    <el-form :model="updatform" :rules="rules">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="updatform.adminname" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="updatform.passward" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
        <el-input v-model="updatform.role" autocomplete="off" />
      </el-form-item>
      <el-form-item label="checkedKeys" :label-width="formLabelWidth" prop="checkedKeys">
        <el-input v-model="updatform.checkedKeys" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="upduser = false">取消</el-button>
        <el-button type="primary" @click="updateform()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 列表 -->
  <el-table :data="ulist" style="width: 100%">
    <el-table-column prop="adminid" label="用户id" width="180" />
    <el-table-column prop="adminname" label="用户名" width="180" />
    <el-table-column prop="role" label="角色" width="180" />
    <el-table-column prop="checkedKeys" label="checkedKeys" width="180" />

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleupdate(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <div class="example-pagination-block">
    <el-pagination layout="prev, pager, next" :total="list.length" :pager-count="3" :page-size="pagsize"
      v-model:current-page="pagnum" @change="pageChange()" />
  </div>


</template>
<script setup lang="ts">
import { adduser, deluser, updateuser, userList } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, reactive } from 'vue'
import { Edit, } from '@element-plus/icons-vue'
import type { FormRules } from 'element-plus'

interface Iuser {
  adminid: string
  adminname: string
  role: string
  checkedKeys: string
}

// interface IuserRes {
//   code: string
//   message: string
//   data: Array<Iuser>
// }

let list = ref<Array<Iuser>>([])
let ulist = ref<Array<Iuser>>([])

// 分页功能
let pagsize = ref(3)
let pagnum = ref(1)
function pageChange() {
  // 得到需要展示的数据
  ulist.value = list.value.slice((pagnum.value - 1) * pagsize.value, pagsize.value * pagnum.value)
}

//获取管理员列表
loadlist()
function loadlist() {
  userList().then((e) => {
    list.value = e.data.data
    pageChange()
  })
}

// 编辑
const upduser = ref(false)
const updatform = reactive({
  adminname: '',
  passward: '',
  role: '',
  checkedKeys: ''
})
function handleupdate(index: string, row: Iuser) {
  upduser.value = true
  updatform.adminname = row.adminname
  updatform.role = row.role
  updatform.checkedKeys = row.checkedKeys
}
function updateform() {
  updateuser(updatform.adminname, updatform.passward, updatform.role, updatform.checkedKeys).then((e) => {
    if (e.data.code == 200) {
      ElMessage.success(e.data.message)
      upduser.value = false
      loadlist()
    } else {
      ElMessage.error('修改管理员失败')
    }
  })
}

// 编辑表单校验
interface RuleForm {
  role: string
  checkedKeys: string
}
const rules = reactive<FormRules<RuleForm>>({
  role: [{
    required: true,
    message: '请输入0-9的数字，至少一位',
    trigger: 'blur',
    pattern: /^[0-9]{1,}$/
  }],
  checkedKeys: [
    {
      required: true,
      message: '请输入字母下划线数字组成的值，至少一位',
      trigger: 'blur',
      pattern: /^\w{1,}$/
    }
  ]
})

// 删除
function handleDelete(index: string, row: Iuser) {
  ElMessageBox.confirm(
    `确定要删除${row.adminname}这个用户吗?`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deluser(row.adminid).then((e) => {
        if (e.data.code == 200) {
          ElMessage.success(e.data.message + '成功')
          loadlist()
        }
      })
    })
}

// 添加
const dialogFormVisible = ref(false)
const form = reactive({
  adminname: '',
  passward: '',
  rold: '',
  checkedKeys: ''
})
const formLabelWidth = '100px'

// 清空
function useradd() {
  adduser(form.adminname, form.passward, form.rold, form.checkedKeys).then((e) => {
    if (e.data.code == 200) {
      ElMessage.success(e.data.message)

      restForm()
      loadlist()
    }
  })
}
function restForm() {
  dialogFormVisible.value = false
  form.adminname = ''
  form.passward = ''
  form.rold = ''
  form.checkedKeys = ''
}

</script>

<style></style>
