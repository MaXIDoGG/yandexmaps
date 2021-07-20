const Router = require('express')
const router = new Router()
const controller = require('./authController')
const bodyParser = require('body-parser')


const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})


router.post('/registration', urlencodedParser, controller.registration)
router.post('/login', urlencodedParser, controller.login)

router.get('/', urlencodedParser, controller.main)
router.get('/map', urlencodedParser, controller.map)
router.get('/reg', urlencodedParser, controller.regPage)
router.get('/log', urlencodedParser, controller.logPage)



module.exports = router