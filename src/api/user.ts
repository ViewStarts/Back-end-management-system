import http from '@/utils/http'

//获取管理员列表
export function userList() {
  // 返回promise对象，这个对象获取http请求的结果
  return http({
    url: '/admin/admin/list',
    method: 'get'
  })
}

// 更新管理员信息
export function updateuser(adminname: string, password: string, role: string, checkedKeys: string) {
  return http({
    url: '/admin/admin/update',
    method: 'post',
    data: {
      adminname,
      password,
      role,
      checkedKeys
    }
  })
}

// 添加管理员
export function adduser(adminname: string, password: string, role: string, checkedKeys: string) {
  return http({
    url: '/admin/admin/add',
    method: 'post',
    data: {
      adminname,
      password,
      role,
      checkedKeys
    }
  })
}

// 删除管理员
export function deluser(adminid: string) {
  return http({
    url: '/admin/admin/delete',
    method: 'post',
    data: {
      adminid
    }
  })
}
