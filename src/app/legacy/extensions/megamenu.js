import assert from 'assert'
import { byIDSuffix } from './select'
import './jquery/jquery.dcmegamenu'

const megamenu = opts => {
  const $menu = byIDSuffix('menu')
  assert.ok($menu, 'element with id suffix menu is required on page')
  $menu.dcMegaMenu(opts)
}
export default megamenu
