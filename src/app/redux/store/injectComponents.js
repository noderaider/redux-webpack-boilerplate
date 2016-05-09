import { ClassicBannerDOM } from '../../elements/nav/ClassicBanner'
import { ClassicSectionsDOM } from '../../elements/nav/ClassicSections'
import { ClassicFooterDOM } from '../../elements/nav/ClassicFooter'
import domready from 'domready'

/** Injects DOM with react components via react-dom-inject */
export default function injectComponents(store) {
  domready(() => {
    ClassicSectionsDOM(store).render('#classic-sections')
    ClassicBannerDOM(store).render('#classic-banner')
    ClassicFooterDOM.render('#classic-footer')
  })
}
