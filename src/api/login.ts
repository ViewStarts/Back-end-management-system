import http from '@/utils/http'
export function login(adminname: string, password: string) {
  // 返回promise对象，这个对象获取http请求的结果
  return http({
    url: '/admin/admin/login',
    method: 'post',
    data: {
      adminname,
      password
    }
  })
}
