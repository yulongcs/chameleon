export const getCookieValue = (key: string) => {
  const cookies = document.cookie.split(';')
  let value = ''
  cookies.some(cookiestr => {
    const [cKey, cValue] = cookiestr.split('=')
    if (key === (cKey && cKey.trim()) && cValue) {
      value = cValue
      return value
    }
  })
  return value
}

export const clearCookie = () => {
  document.cookie = 'yyuid=;Domain=.yy.com;path=/'
  document.cookie = 'ussename=;Domain=.yy.com;path=/'
}
