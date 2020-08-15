const moment = require('moment')

module.exports = {
    formatDate: (date, format) => {
        return moment(date).format(format)
    },
    truncate: (str, len) => {
        if (str.length > 0 && str.length > len) {
            let new_str = str.substr(0, len)
            new_str = new_str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },
    removeTags: (str) => {
        return str.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: (storyUser, loggedUser, storyId) => {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit fa-lg"></i></a>`
        }
    },
    select: (selected, options) => {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"'
            )
            .replace(
                new RegExp('>' + selected + '</option>'),
                ' selected="selected"$&'
            )
    },
    deleteForm: (storyUser, loggedUser, storyId) => {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            return ` <a href="#" class="submit"><i class="fas fa-trash fa-lg right"></i></a>
                <form class="delete_form" action="stories/${storyId}/delete" method="post">
                    <input type="hidden" name="_method" value="DELETE">
                </form>`
        }
    }

}