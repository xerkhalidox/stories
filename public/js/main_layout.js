let sidenav = document.querySelector('.sidenav')
let status = document.querySelector('#status')

M.Sidenav.init(sidenav)
M.FormSelect.init(status)
CKEDITOR.replace('body', {
    plugins: 'wysiwygarea, toolbar, basicstyles',
})

