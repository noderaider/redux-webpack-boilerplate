import { http, https } from 'ext'
import q from 'q'

export default function loadLibs () {
    if(!angular)
        throw new Error('Angular must be globally defined.')

    let ng = angular
    let ngRoute = 'ngRoute'
    let ngAnimate = 'ngAnimate'
    let ngMessages = 'ngMessages'
    let ngInputModified = 'ngInputModified'
    let uiBootstrap = 'ui.bootstrap'
    let vcRecaptcha = 'vcRecaptcha'

    return  { ng
            , ngRoute
            , ngAnimate
            , ngMessages
            , ngInputModified
            , uiBootstrap
            , http
            , https
            , q
            }
}
