import camelCase from 'lodash.camelcase'
import kebabCase from 'lodash.kebabcase'
$.fn.directive = function({ name, tagName, report }) {
  if(tagName && !name)
    name = camelCase(tagName)
  else if(name && !tagName)
    tagName = kebabCase(name)
  else
    throw new Error('Must supply directive name or tagname.')
  if(report) {
    console.error('DIRECTIVE NOT FOUND, ADD TO DIRECTIVES CONFIG -> ', tagName)
  } else {
    window.document.createElement(tagName)
    //console.warn("DIRECTIVE", tagName)
  }
}
$.fn.IESHIM = function(obj) {
  console.warn('IESHIM', `${obj.issue}|ERR:${obj.err}|LINE:${obj.line}|FILE:${obj.file}|FN:${obj.fn}|ARGS:${JSON.stringify(obj.args)}`)
  if(obj.err)
}
