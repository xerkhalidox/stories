const express = require('express')
const router = express.Router()
const { isMember, isGuest } = require('../middleware/auth')
const Story = require('../models/Story')
let { get_stories } = require("./stories")

router.get('/', isGuest, (req, res) => {
    res.render('login', {
        layout: 'login_layout'
    })
})

router.get('/dashboard', isMember, async (req, res, next) => {
    let stories = await get_stories(req.user.id, next)
    const context = {
        name: req.user.first_name,
        stories: stories
    }
    res.render('dashboard', context)
})

module.exports = router