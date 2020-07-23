const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const {
    Console
} = require('console')
const router = express.Router()

// router.use(session({
//     secret: 'secret',
//     cookie: {
//         maxAge: 6000
//     }
// }))

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.get('/', (req, res) => {
    var sess = req.session;
    if (sess.user == null) {
        res.redirect('/login')
    } else {
        res.render('admin/template/default', {
            title: 'Penguji',
            content: '../penguji',
            email: sess.email,
            level: sess.level,
            nama: sess.nama,
            id: sess.id
        })
    }
});

module.exports = router;