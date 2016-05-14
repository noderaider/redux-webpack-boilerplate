import name from './name.js'
export default ({ organization = 'cchamberlain' }) => ({ url: `https://github.com/${organization}/${name}/issues` })
