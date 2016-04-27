import { setText } from 'state/actions/visual'
import  { IDLESTATUS_NOT_VERY_ACTIVE
        , IDLESTATUS_GONE_FOR_LIKE_A_SECOND
        , IDLESTATUS_LAZY_TYPER
        , IDLESTATUS_ARE_YOU_STILL_THERE
        , IDLESTATUS_GONE
        , IDLESTATUS_THEY_DONT_CARE_ABOUT_YOU
        , IDLESTATUS_THEY_ARE_NEVER_COMING_BACK
        , IDLESTATUS_STONE_AGE_GONE
        , IDLESTATUS_EXTINCT
        } from './constants'
import * as themes from 'redux-devtools-themes'

const paletteMap =  { background: ['base00', 'base01']
                    , content: ['base04', 'base02', 'base05']
                    , accent: ['base0D', 'base0E', 'base0C']
                    }
const invertColors = theme => ( { ...theme
                                , base00: theme.base07
                                , base01: theme.base06
                                , base02: theme.base05
                                , base03: theme.base04
                                , base04: theme.base03
                                , base05: theme.base02
                                , base06: theme.base01
                                , base07: theme.base00
                                } )


const nonColors = ['author', 'scheme', 'base07', 'base06', 'base05', 'base04', 'base02', 'base01', 'base00']
const filterColors = scheme => Object.keys(scheme).filter(x => !nonColors.includes(x)).reduce((colors, key) => Object.assign(colors, { [key]: scheme[key] }), {})

const getRandomColor = colors => {
  let paletteKeys = Object.keys(colors)
  let selectedIndex = Math.floor(paletteKeys.length * Math.random())
  return colors[paletteKeys[selectedIndex]]
}
//** TODO: NPM MODULE */
const palettize = theme => invertTheme => {
  const scheme = invertTheme ? invertColors(themes[theme]) : themes[theme]
  let colors = filterColors(scheme)
  const basePalette = Object.keys(paletteMap).reduce((palette, key) => {
    palette[key] = paletteMap[key].map(x => scheme[x])
    return palette
  }, {})
  return  {...basePalette
          , bool: condition => condition ? scheme['base0B'] : scheme['base08']
          , get colors() { return colors }
          , random: () => getRandomColor(colors)
          , get red() { return scheme['base08'] }
          , get green() { return scheme['base0B'] }
          }
}


const solarized = palettize('solarized')(false)


export const idleStatusDelay = idleStatus => (dispatch, getState) => {
  switch(idleStatus) {
    case IDLESTATUS_NOT_VERY_ACTIVE:
      return 5000
    case IDLESTATUS_GONE_FOR_LIKE_A_SECOND:
      return 4000
    case IDLESTATUS_LAZY_TYPER:
      return 3000
    case IDLESTATUS_ARE_YOU_STILL_THERE:
      return 2000
    case IDLESTATUS_GONE:
      return 1000
    case IDLESTATUS_THEY_DONT_CARE_ABOUT_YOU:
      return 800
    case IDLESTATUS_THEY_ARE_NEVER_COMING_BACK:
      return 600
    case IDLESTATUS_STONE_AGE_GONE:
      return 400
    case IDLESTATUS_EXTINCT:
      return 300
    default:
      return 3000
  }
}


export const activeStatusAction = (dispatch, getState) =>  {
  dispatch(setText({ subtitle: 'ACTIVE' }))
  setColor(solarized.background[0])
}

export const idleStatusAction = idleStatus => (dispatch, getState) => {
  dispatch(setText({ subtitle: idleStatus.replace(/_/g, ' ') }))
  switch(idleStatus) {
    case IDLESTATUS_NOT_VERY_ACTIVE:
      return setColor(solarized.random())
    case IDLESTATUS_GONE_FOR_LIKE_A_SECOND:
      return setColor(solarized.random())
    case IDLESTATUS_LAZY_TYPER:
      return setColor(solarized.random())
    case IDLESTATUS_ARE_YOU_STILL_THERE:
      return setColor(solarized.random())
    case IDLESTATUS_GONE:
      return setColor(solarized.random())
    case IDLESTATUS_THEY_DONT_CARE_ABOUT_YOU:
      return setColor(solarized.random())
    case IDLESTATUS_THEY_ARE_NEVER_COMING_BACK:
      return setColor(solarized.random())
    case IDLESTATUS_STONE_AGE_GONE:
      return setColor(solarized.random())
    case IDLESTATUS_EXTINCT:
      return setColor(solarized.red)
  }
}

const setColor = color => document.body.style.backgroundColor = color

