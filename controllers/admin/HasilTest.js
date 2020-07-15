const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const {
    Console
} = require('console')
const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.get('/', (req, res) => {
    var sess = req.session;
    if (sess.user == null) {
        res.redirect('/login')
    } else {
        var hour = 3600000
        sess.cookie.expires = new Date(Date.now() + hour)
        sess.cookie.maxAge = 100 * hour
        res.render('admin/template/default', {
            title: 'Hasil Test',
            content: '../hasilTest',
            email: sess.email,
            level: sess.level,
            nama: sess.nama,
            id: sess.id
        })
    }
});

module.exports = router;