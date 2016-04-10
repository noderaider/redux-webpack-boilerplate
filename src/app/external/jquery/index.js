import jQuery from './jquery-git'
import jQueryMigrate from './jquery-migrate-git'
import jQueryUI from './jquery-ui'

jQueryMigrate(jQuery, window)
jQueryUI(jQuery)

module.exports = jQuery
