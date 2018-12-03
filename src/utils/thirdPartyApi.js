import fetch from './fetch'

/*********
@param {*} query 参数 String
@method {*} 请求方式 Object
@url {*} 请求地址 String
*********
*/

export function getThirdPartyMsg(query) {
  return fetch({
    url: '/ClientManagementController/thirdPartyInterface',
    method: 'post',
    params: query
  })
}