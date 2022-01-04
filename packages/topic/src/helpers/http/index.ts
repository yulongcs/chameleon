const fetchAction = async function (url: string, options: any = {}) {
  const {headers, ...rest} = options
  return fetch(url, {
    headers: {
      accept: 'application/json, text/plain, */*',
      ...headers,
    },
    credentials: 'same-origin', // include, same-origin, *omit
    mode: 'cors', // no-cors, cors, *same-origin
    ...rest,
  }).catch(res => {
    console.log('fetch 接口失败', res)
    return res
  })
}

const getUrlWithParams = (url: string, params: any) => {
  if (!params || Object.prototype.toString.call(params).slice(8, -1) !== 'Object') {
    return url
  }
  const search = Object.keys(params).reduce((result, key) => {
    if (params[key] === undefined) {
      return result
    }
    return (result += `${result ? '&' : ''}${key}=${params[key]}`)
  }, '')
  return `${url}${url.indexOf('?') !== -1 ? search : `?${search}`}`
}

const get = async (url: string, options: any = {}) => {
  const {params, ...rest} = options
  url = getUrlWithParams(url, params)
  return fetchAction(url, rest).then(res => res.json())
}

const getWithCredentials = async (url: string, options: any = {}) => {
  const {params, ...rest} = options
  url = getUrlWithParams(url, params)
  return fetchAction(url, {
    credentials: 'include', // include, same-origin, *omit
    headers: {
      accept: 'application/json, text/plain, */*',
    },
    mode: 'cors', // no-cors, cors, *same-origin
    ...rest,
  }).then(response => response.json()) // parses response to JSON
}

const put = (url: string, data = {}) => {
  return fetchAction(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
    },
    method: 'put', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
  }).then(response => response.json()) // parses response to JSON
}

const post = (url: string, data = {}) => {
  return fetchAction(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
    },
    method: 'post', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
  }).then(response => response.json()) // parses response to JSON
}

const http = {
  get,
  put,
  post,
  getWithCredentials,
}
export default http
