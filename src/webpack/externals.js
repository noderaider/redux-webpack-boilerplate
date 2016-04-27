
export function getExternals(name) {
  if(name !== 'vendor')
    return  { 'react/lib/ReactCSSTransitionGroup': 'ReactCSSTransitionGroup'
            , 'react': 'React'
            , 'react-dom': 'ReactDOM'
            , 'tinymce': 'tinymce'
            }
}
