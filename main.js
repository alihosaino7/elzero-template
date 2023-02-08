
if (localStorage.getItem('color_option') !== null) {

    document.documentElement.style.setProperty('--main-color', localStorage.getItem('color_option'))
    document.querySelectorAll('.settings-box ul li').forEach(li => {
        li.classList.remove('active')
    })

    document.querySelector(`[data-color='${localStorage.getItem('color_option')}']`).classList.add('active')
}

if (localStorage.getItem('color_alt_option') !== null) 
    document.documentElement.style.setProperty('--main-color-alt', localStorage.getItem('color_alt_option'))


const settingsBoxColors = document.querySelectorAll('.settings-box ul li')
const settingsBoxGear = document.querySelector('.settings-box .gear-icon')

settingsBoxGear.addEventListener('click', e => {
    settingsBoxGear.firstElementChild.classList.toggle('fa-spin')
    document.querySelector('.settings-box').classList.toggle('opened')
})

settingsBoxColors.forEach(colorChoice => {
    colorChoice.style.backgroundColor = colorChoice.dataset.color
    colorChoice.addEventListener('click', e => {
       hundleActiveClass(settingsBoxColors, e)
       localStorage.setItem('color_option', e.target.dataset.color)
       localStorage.setItem('color_alt_option', e.target.dataset.colorAlt)
       document.documentElement.style.setProperty('--main-color', localStorage.getItem('color_option'))
       document.documentElement.style.setProperty('--main-color-alt', localStorage.getItem('color_alt_option'))
    })
}) 

// remove active class from all the elements and add it to the clicke element
function hundleActiveClass(elements, event) {

    elements.forEach(el => {
        el.classList.remove('active')
    })

    event.target.classList.add('active')
}

const mainLinks = document.querySelectorAll('.nav li')
const megaMenuLinks = document.querySelectorAll('.mega-menu li')

const scrollToTarget = (elements) => {
    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

scrollToTarget(mainLinks)
scrollToTarget(megaMenuLinks)

const toggleMenu = document.querySelector('.toggle-mega-menu')
const megaMenu = document.querySelector('.mega-menu')

toggleMenu.onclick = function(e) {
    e.stopPropagation()
    e.preventDefault()
    megaMenu.classList.toggle('open')
}

megaMenu.onclick = (e) => e.stopPropagation()

document.addEventListener('click', (e) => {
    if (e.target !== megaMenu && e.target !== toggleMenu) {
        if (megaMenu.classList.contains('open')) megaMenu.classList.toggle('open')
    }   
})


// =============== on scrollbutton clicking

const scrollTopBtn = document.querySelector('.go-up')

scrollTopBtn.addEventListener('click', function(e) {
    window.scrollTo({
        top: 0,
        top: 0,
        behavior: 'smooth',
    })
})

// =============== on scrollbutton clicking //

// =============== effect while scrolling

function startCount(el) {
    let goal = el.dataset.goal
    let counter = setInterval(() => {
        el.textContent++
        if (el.textContent === goal) {
            clearInterval(counter)
        }
    }, 1000 / goal)
}

const ourSkills = document.querySelector('.our-skills')
const spansProgress = document.querySelectorAll('.skill .progress > span')
const skillsNums = document.querySelectorAll('.skill-num span')
const stats = document.querySelector('.stats')
const infoSpans = document.querySelectorAll('.stats .box .info .number')
let statsStarted = false // function started ? no
let skillsStarted = false

function effects() {
    window.onscroll = function() {
        if (window.scrollY >= 850) {
            scrollTopBtn.style.opacity = '1'
        } else {
            scrollTopBtn.style.opacity = '0'
        }
        if (window.scrollY >= ourSkills.offsetTop - 300) {
            if (!skillsStarted) {
                spansProgress.forEach(span => {
                    span.style.width = span.dataset.progress
                })
                // increase the skill numbers synchronously with progress spans
                skillsNums.forEach(num => startCount(num))
            }
            skillsStarted = true
        }
        if (window.scrollY >= stats.offsetTop - 300) {
            if (!statsStarted) {
                infoSpans.forEach(span => startCount(span))
            }
            statsStarted = true
        }
    }
}

// =============== effect while scrolling
effects()

function countDown() {

    const duration = 1000

    let target = new Date('2024-1-1').getTime()
    let days, hours, minutes, seconds

    let counter = setInterval(() => {

        let current = new Date().getTime()    
        let diff = target - current

        days = Math.floor(diff / (1000 * 60 * 60 * 24))
        hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        seconds = Math.floor((diff % (1000 * 60)) / 1000)

        minutes < 10 ? `0${minutes}`: minutes
        seconds < 10 ? `0${seconds}`: seconds

        document.querySelector('.days').innerHTML = days
        document.querySelector('.hours').innerHTML = hours
        document.querySelector('.minutes').innerHTML = minutes
        document.querySelector('.seconds').innerHTML = seconds

        if (diff < 0) clearInterval(counter)

    }, duration)
    
}

document.querySelector('.years').innerHTML = new Date().getFullYear() + 1

countDown()