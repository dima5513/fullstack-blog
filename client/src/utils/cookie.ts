export const useCookie = (nameOfCookie?: string) => {
  const cookies = document.cookie
    .split(';')
    .reduce((cookieObj: Record<string, string>, currentCookie) => {
      const [name, value] = currentCookie.trim().split('=')
      cookieObj[name] = decodeURIComponent(value)
      return cookieObj
    }, {})

  // if (nameOfCookie && nameOfCookie in cookies) {
  //   return {
  //     cookies: {
  //       [nameOfCookie]: cookies[nameOfCookie],
  //     },
  //   }
  // }

  return {
    ...cookies,
  }
}
