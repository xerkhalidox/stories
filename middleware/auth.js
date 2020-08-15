module.exports = {
    isMember: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    },
    isGuest: (req, res, next) => {
        if (req.isUnauthenticated()) {
            return next()
        } else {
            res.redirect('/dashboard')
        }
    }
}