<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
          default-active="/home" text-color="#fff" @open="handleOpen" @close="handleClose" :router="true"
          :default-openeds="['2', '3']">
          <el-menu-item index="/home">
            <el-icon><icon-menu /></el-icon>
            <span>工作台</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user"><el-icon>
                <Avatar />
              </el-icon>
              <span>用户列表</span>
            </el-menu-item>
            <el-menu-item index="2-2"><el-icon>
                <Avatar />
              </el-icon>
              <span>用户列表</span>
            </el-menu-item>
            <el-menu-item index="2-3">用户列表</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <Briefcase />
              </el-icon>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/product"><el-icon>
                <StarFilled />
              </el-icon>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">商品列表</el-menu-item>
            <el-menu-item index="3-3">商品列表</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, Setting } from '@element-plus/icons-vue'
function handleOpen() { }
function handleClose() { }
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  border-bottom: 1px solid gray;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: #545c64;
  height: 100vh;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
