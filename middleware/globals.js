module.exports = {
    globalUser: (req, res, next) => {
        res.locals.user = req.user || null
        next()
    }
}