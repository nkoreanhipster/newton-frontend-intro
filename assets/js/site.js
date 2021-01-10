const listenerCallback = {
    scroll: function (ev, el) {
        el.scrollIntoView({
            behavior: 'smooth'
        })
    },
    redirect: function (ev, el) {
        window.location = el.getAttribute('href')
    },
    closemodal: function (ev, el) {
        el.classList.remove('open')
        el.classList.add('unclickable')
    },
    openmodal: function (ev, el) {
        if (el.classList.contains('open')) {
            listenerCallback.closemodal(ev, el)
            return
        }
        el.classList.add('open')
        el.classList.remove('unclickable')
    }
}

// Catcher for all event listeners
// <element data-action="type|action|target">
const initListeners = function () {
    ;[...document.querySelectorAll("*[data-action]")].map(clickedElement => {
        var [type, action = console.log, target = ""] = clickedElement.getAttribute('data-action').split('|')
        let targetElement = target === "" ? clickedElement : document.querySelector(target);
        console.log(type, targetElement)
        clickedElement.addEventListener(type, (ev) => {
            ev.preventDefault()
            try {
                if (!listenerCallback.hasOwnProperty(action))
                    return;
                listenerCallback[action](ev, targetElement)
            } catch (err) {
                console.error(err, {
                    type: type,
                    action: action,
                    target: target
                })
            }
        })
    })
    // var scrollers = [...document.querySelectorAll('*[data-type="scrollto"]')],
    //     redirecters = [...document.querySelectorAll('*[data-type="redirectto"]')]

    // // Window scrollers
    // scrollers.map(a => a.addEventListener('click', (ev) => {
    //     const targetElement = document.querySelector(ev.target.getAttribute('data-target'))
    //     if (targetElement !== null)
    //         scrollAction(targetElement)
    // }))

    // // URL redirect
    // redirecters.map(a => a.addEventListener('click', (ev) => {
    //     const targetElement = ev.target.getAttribute('data-target')
    //     if (targetElement !== null)
    //         redirectAction(targetElement)
    // }))
}

/*READYSTATE*/
function Rr(f) { /in/.test(document.readyState) ? setTimeout('Rr(' + f + ')', 9) : f() }
Rr(function () {
    initListeners();
})