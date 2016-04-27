import name from './name.js'
export default ({ host, organization }) => host === 'js.org' ? `https://${name}.js.org` : `https://${organization}.github.io/${name}`
