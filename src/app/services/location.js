export const protocol = window.location.protocol
export const scheme = window.location.protocol.slice(0, -1)
export const hostname = window.location.hostname
export const port = parseInt(window.location.port)
export const host = window.location.host
export const path = window.location.pathname
export const query = window.location.search.replace('?', '')
export const title = window.document.title
export const cleanUrl = `${protocol}//${host}${path}`
export const goToUrl = (newUrl, doPostback) => {
  if(!doPostback)
    window.history.pushState({ url: newUrl }, null, newUrl)
  else
    window.location.replace(newUrl)
}
export const goToPath = (newPath, doPostback) => goToUrl(`${protocol}//${host}${newPath}`, doPostback)
export const goToCleanUrl = doPostback => goToUrl(cleanUrl, doPostback)
