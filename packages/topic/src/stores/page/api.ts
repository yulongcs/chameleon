import config from 'src/configs'
import http from 'src/helpers/http'

export const getPageById: (pageId: string) => Promise<any> = async (pageId: string) => {
  return await http.get(`${config.publicHost}/topicPage/${pageId}`, {
    withCredentials: false,
  })
}

export const updatePageData: (pageId: string, content: any) => Promise<any> = async (pageId: string, content: any) => {
  if (!pageId) {
    console.error('pageId is not defined', pageId)
    return
  }
  const url = `${config.adminHost}/admin/topicPage/${pageId}`
  console.log('updatePageData', content)
  return await http.put(url, {
    content,
  })
}

export const getUnpkgVersionsByPkg = async (node: TreeNodePropsInEdit) => {
  console.log(node.rm.unpkgUrlMap)
  const pkgName = (node.rm.unpkgUrlMap?.test || node.rm.unpkgUrlMap?.prod)?.match(
    /https:\/\/unpkg.(yy|bdgamelive).com\/(\S+)@/,
  )?.[2]
  if (!pkgName) return null
  let res = {}
  try {
    res = await window
      .fetch(`https://unpkg.yy.com/version/${pkgName}`, {
        credentials: 'same-origin',
      })
      .then(res => res.json())
    console.log(res)
    return res as {
      tags: {
        beta?: string
        latest?: string
        test?: string
      }
    }
  } catch {
    return null
  }
}

export const refreshCdn = async (urls: any) => {
  const host = config.adminHost
  return await http.post(`${host}/admin/mlproject/refreshCdn`, {
    urls,
  })
}
