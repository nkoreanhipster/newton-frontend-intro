const listeners = {}

const scrollAction = function (target) {
    target.scrollIntoView({
        behavior: 'smooth'
    })
}
const redirectAction = function (url) {
    window.location = url
}

const initListeners = function () {
    var scrollers = [...document.querySelectorAll('*[data-type="scrollto"]')],
        redirecters = [...document.querySelectorAll('*[data-type="redirectto"]')]

    // Window scrollers
    scrollers.map(a => a.addEventListener('click', (ev) => {
        const targetElement = document.querySelector(ev.target.getAttribute('data-target'))
        if (targetElement !== null)
            scrollAction(targetElement)
    }))

    // URL redirect
    redirecters.map(a => a.addEventListener('click', (ev) => {
        const targetElement = ev.target.getAttribute('data-target')
        if (targetElement !== null)
            redirectAction(targetElement)
    }))
}

/*READYSTATE*/
function Rr(f) { /in/.test(document.readyState) ? setTimeout('Rr(' + f + ')', 9) : f() }
Rr(function () {
    initListeners();
})