const listeners = {}

const scrollAction = function (target) {
    console.log({target:target})
    target.scrollIntoView({
        behavior: 'smooth'
    })
}
const redirectAction = function (url) {
    window.location = url
 }

const initListeners = function () {
    var scrollers = [...document.querySelectorAll('*[data-type="scrollto"]')]
    var redirecters = [...document.querySelectorAll('*[data-type="redirectto"]')]

    console.log({scrollers:scrollers})

    scrollers.map(a => a.addEventListener('click',(ev)=>{
        console.log('scrollto',{el:ev.target,attr:ev.target.getAttribute('data-target')})
        var targetElement = document.querySelector(ev.target.getAttribute('data-target'))
        if(targetElement === null){
            console.error('element is null')
            return
        }
        scrollAction(targetElement)
    }))
    redirecters.map(a => a.addEventListener('click',(ev)=>{
        var url = ev.target.getAttribute('data-target')
        if(url === null){
            console.error('url is null')
            return
        }
        redirectAction(url)
    }))
}

/*READYSTATE*/
function Rr(f) { /in/.test(document.readyState) ? setTimeout('Rr(' + f + ')', 9) : f() }
Rr(function () {
    initListeners();
})