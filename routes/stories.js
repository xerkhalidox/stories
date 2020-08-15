const express = require('express')
const router = express.Router()
const { isMember } = require('../middleware/auth')
const Story = require('../models/Story')
const User = require('../models/User')

let get_stories = (id, next) => {
    try {
        let stories = Story.find({ status: "public" })
            .populate('user')
            .sort({ created_at: "desc" })
            .lean()
        return stories
    } catch (err) {
        return next(err)
    }
}
router.get('/add', isMember, (req, res) => {
    res.render('stories/add')
})
router.get('/', async (req, res, next) => {
    try {
        let stories = await get_stories(req.user.id, next)
        return res.render('stories/index', { stories: stories })
    } catch (err) {
        next(err)
    }

})
router.post('/', isMember, async (req, res) => {
    try {
        req.body.user = req.user.id
        const story = await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
    }
})
router.get('/edit/:id', isMember, async (req, res) => {
    const story = await Story.findOne({ _id: req.params.id }).lean()
    if (!story) {
        res.render('errors/404')
    }
    if (story.user != req.user.id) {
        res.redirect('/stories')
    } else {
        res.render('stories/edit', { story: story })
    }
})
router.put('/:id', isMember, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id)
        if (!story) {
            return res.render('errors/404')
        }
        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })
            res.redirect('/dashboard')
        }
    } catch (err) {
        console.error(err)
        return res.render('errors/500')
    }
})
router.get('/:id', isMember, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).populate('user').lean()
        if (story) {
            res.render('stories/single_story', { story: story })
        }
    } catch (error) {
        console.log(error)
        res.redirect('errors/404')
    }
})

router.get('/user/:userId', isMember, async (req, res) => {
    try {
        let stories = await Story.find({ user: req.params.userId, status: 'public' })
            .populate('user')
            .lean()
        res.render('stories/index', { stories: stories, name: stories[0].user.display_name })
    } catch (error) {
        console.log(error)
        res.render('errors/500')
    }
})
router.delete('/:id/delete', isMember, async (req, res) => {
    try {
        const story = await Story.findByIdAndRemove(req.params.id)
        res.redirect('/dashboard')
    } catch (error) {
        res.render('errors/500')
    }
})
module.exports = { router: router, get_stories: get_stories }