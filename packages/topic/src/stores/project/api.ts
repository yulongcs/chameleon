import config from 'src/configs'
import http from 'src/helpers/http'
/**
 * 获取项目信息
 * params 参数列表：
 * @param {string} projectId 项目projectId
 * @return {object} restult
 * */
export async function getProjectInfo(projectId: string): Promise<any> {
  if (!projectId) {
    console.error('缺少projectId')
    return {}
  }
  const res = await http.getWithCredentials(`${config.adminHost}/admin/mlproject/` + projectId).catch((e: any) => {
    if (e.response && e.response.status === 401) {
      return {
        code: 401,
        message: '无权限',
      }
    }
    return {
      code: 302,
      message: e.message,
    }
  })
  return res
}
