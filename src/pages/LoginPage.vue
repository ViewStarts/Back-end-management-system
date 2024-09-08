<template>
  <div class="app">
    <el-card style="width: 480px" class="box">
      <template #header>
        <div class="card-header">
          <span>OA管理系统</span>
        </div>
      </template>

      <!-- 表单 -->
      <el-form
        :model="form"
        label-width="auto"
        style="max-width: 600px"
        :rules="rules"
        ref="ruleFormRef"
      >
        <el-form-item label="用户名" prop="adminname">
          <el-input v-model="form.adminname" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>

      <template #footer>忘记密码请联系管理员</template>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api/login'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const form = reactive({
  adminname: '',
  password: ''
})
const router = useRouter()

//定义接口-限定的表单对象的形状
interface RuleForm {
  adminname: string
  password: string
}

//定义的表单验证的规则
const rules = reactive<FormRules<RuleForm>>({
  adminname: [
    //是否必须 验证不通过的提示 效验的触发时机(失去焦点)
    { required: true, message: '用户名要求非空字符至少三位', trigger: 'blur', pattern: /^\S{3,}$/ }
  ],
  password: [
    {
      required: true,
      message: '密码由字母数值下划线组成,至少四位',
      trigger: 'blur',
      pattern: /^\w{4,}$/
    }
  ]
})

// 模板引用
const ruleFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // formEl 表单组件实例
  formEl.resetFields()
}

interface IresLogin {
  code: string
  message: string
  data: {
    adminname: string
    token: string
  }
}
// 点击登录按钮
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  //获取表单校验的结果
  await formEl.validate((valid, fields) => {
    if (valid) {
      login(form.adminname, form.password).then((e) => {
        let data: IresLogin = e.data
        if (e.data.code == 200) {
          // 登录成功
          ElMessage.success(data.message)
          //本地存入token
          localStorage.setItem('admin-token', data.data.token)
          // 跳转到首页
          router.push('/home')
        } else {
          ElMessage.error(data.message)
        }
      })
    } else {
      console.log('表单校验不通过', fields)
    }
  })
}
</script>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  display: flex;
  background-image: url(../components/宫园薰.png);
  background-size: cover;
  background-position-y: -80px;
  background-repeat: no-repeat;
}

.box {
  margin: auto 270px;
  background-image: url(../components/水洛天依.png);
  background-size: cover;
  color: white;
  border: none;
}
</style>
