const express    = require('express')
// const session = require('express-session')
const bodyParser = require('body-parser')
const router     = express.Router()

// router.use(session({
//     secret: 'secret',
//     cookie: {
//         maxAge: 6000
//     }
// }))

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.render('admin/login');
});

module.exports = router;