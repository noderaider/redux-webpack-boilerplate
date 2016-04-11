import name from './name.js'
export default ({ organization }) => ({ url: `https://github.com/${organization}/${name}/issues` })
