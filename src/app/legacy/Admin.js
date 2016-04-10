import megamenu from './extensions/megamenu'

const selectByIDSuffix = suffix => window.document.querySelector(`[id$="${suffix}"]`)

const init = () => {
  selectByIDSuffix('TixNav').style.display = 'block'
  selectByIDSuffix('TixNavTemp').style.display = 'none'
  megamenu( { rowItems: '4'
            , speed: 'fast'
            , effect: 'fade'
            })
}

const Admin = { init }
export default Admin
