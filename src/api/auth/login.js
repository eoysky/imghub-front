import request from '@/utils/request'

/**
 * login func
 * parameter: {
 *     userName: '',
 *     passwd: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: '/user/login',
    method: 'post',
    data: parameter,
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: '/message/sms',
    method: 'post',
    data: parameter,
  })
}

export function getInfo () {
  return request({
    url: '/currentUser',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}
