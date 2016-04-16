import  { IDLESTATUS_NOT_GODLY_FAST
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

//** TODO: NPM MODULE */
const palettize = theme => invertTheme => {
  const scheme = invertTheme ? invertColors(themes[theme]) : themes[theme]
  console.warn('CALLING PALETTIZE', scheme)
  let colors = filterColors(scheme)
  console.warn(colors)
  const basePalette = Object.keys(paletteMap).reduce((palette, key) => {
    palette[key] = paletteMap[key].map(x => scheme[x])
    return palette
  }, {})
  return  {...basePalette
          , bool: condition => condition ? scheme['base0B'] : scheme['base08']
          , random: () => {
              let paletteKeys = Object.keys(colors)
              return colors[paletteKeys[Math.floor(paletteKeys.length * Math.random())]]
              /*
              let paletteIndex = Math.floor(paletteKeys.length * Math.random())
              let paletteKey = paletteKeys[paletteIndex]
              let paletteSlice = basePalette[paletteKey]
              let paletteSliceIndex = Math.floor(paletteSlice.length * Math.random())
              return paletteSlice[paletteSliceIndex]
              */
            }
          }
}


const solarized = palettize('solarized')(false)


export const idleStatusDelay = idleStatus => (dispatch, getState) => {
  switch(idleStatus) {
    case IDLESTATUS_NOT_GODLY_FAST:
    case IDLESTATUS_GONE_FOR_LIKE_A_SECOND:
    case IDLESTATUS_LAZY_TYPER:
    case IDLESTATUS_ARE_YOU_STILL_THERE:
    case IDLESTATUS_GONE:
    case IDLESTATUS_THEY_DONT_CARE_ABOUT_YOU:
    case IDLESTATUS_THEY_ARE_NEVER_COMING_BACK:
    case IDLESTATUS_STONE_AGE_GONE:
    case IDLESTATUS_EXTINCT:
    default:
      return 3000
  }
}


export const activeStatusAction = (dispatch, getState) => setColor(solarized.background[0])

export const idleStatusAction = idleStatus => (dispatch, getState) => {
  switch(idleStatus) {
    case IDLESTATUS_NOT_GODLY_FAST:
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
      return setColor(solarized.random())
  }
}

const setColor = color => document.body.style.backgroundColor = color

