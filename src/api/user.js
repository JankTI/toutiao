/*
  用户相关请求模块
*/
import request from '@/utils/request';
// import store from '@/store'

/*
  登录验证
*/
export const login = data => {
  return request({
    method: "POST",
    url: ' /app/v1_0/authorizations',
    data
  })
}

/*
  发送验证码
  注意: 每个手机号每分钟一次
*/
export const sendSms = mobile => request({
  method: 'GET',
  url: `/app/v1_0/sms/codes/${mobile}`,
})

/*
  获取用户自己的信息
*/
export const getUserInfo = () => request({
  method: 'GET',
  url: '/app/v1_0/user/profile',
  // 发送请求头数据
  // headers: {
  //   // 注意: 该接口需要授权才能访问
  //   // token 的数据格式: Bearer token数据,注意 Bearer 后面有个空格
  //   Authorzation: `Bearer ${store.state.user.token}`
  // }
})

/*
  获取用户频道列表
*/
export const getuserChannel = () => request({
  method: 'GET',
  url: '/app/v1_0/user/channels'
})
