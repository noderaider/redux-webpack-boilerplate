import React from 'react'
import { renderToString } from 'react-dom/server'
import Router from 'router'
import { log } from '../../config'
import { detectBrowser } from 'browser-detective'

const HTML = ({ name, title, version, emulatedVersion, platform, platformVersion }) => (
  <html lang="en">
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base href="/" />
    <title>Tix - Unsupported</title>
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  </head>
  <body>
    <div style={{width:'100%'}} id="divUserAgent">
      <table style={{paddingLeft:10, paddingRight:10 }}>
        <tr>
          <td style={{width:'10%'}}>
            <img src="/images/dialog-warning-128.png" style={{width:75, height:75}} />
          </td>
          <td style={{width:'90%', backgroundColor: '#ffd800', color: '#000000', border: '1px solid #000', padding: 10, fontSize:14, textAlign:'left'}}>
            <h2>Warning</h2>
            <div style={{fontSize:13, marginTop: 20}}>
              <span style={{fontWeight: 'bold' }}>The browser you are currently using is no longer able to access the Tix Management area of our system.</span>
              <p>
                We are rolling out some exciting system enhancements that only work properly on newer versions of Internet Explorer (10 and 11) or more current browsers like Firefox (<a href="https://www.mozilla.org/en-US/firefox/new/">Download</a>) or Chrome (<a href="https://www.google.com/chrome/browser/">Download</a>). If you would like to continue using Internet Explorer, <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">click here</a> to upgrade to the latest version. Otherwise, contact your System Administrator or call Tix Support at (800) 504-4849, x3 if you need further assistance. For reference, you are currently running {title} {version} on {platform} {platformVersion}.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
  </html>
)

const getHTML = props => {
  return `<!doctype html>
${renderToString(<HTML {...props} />)}`
}



export default function configureUnsupportedRouter() {
  let router = Router()
  router.use((req, res, next) => {
    const browser = detectBrowser(req.headers['user-agent'])
    if(!browser || req.url.startsWith('/images'))
      return next()

    const { name, title, version, emulatedVersion, platform, platformVersion } = browser

    if(name !== 'ie')
      return next()

    if(version >= 10) {
      log.debug(`supported IE version => Actual[${version}] Emulated[${emulatedVersion}]`)
      return next()
    }
    log.debug(`unsupported IE version => Actual[${version}] Emulated[${emulatedVersion}]`)
    res.send(getHTML(browser))
  })
  return router
}
