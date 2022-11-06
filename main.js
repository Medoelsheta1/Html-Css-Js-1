


dataout = new Date("Dec 31, 2022 23:59:59").getTime()

// console.log(dataout)
let count = setInterval(()=>{
    let datanow = Date.now()
    let diff = dataout - datanow
    // console.log(diff / 1000 / 60 / 60 / 24 )
    let days = Math.floor(diff / 1000 / 60 / 60 / 24)
    document.querySelector(".events  .info .info-count .counter .days").innerHTML = days
    // console.log(days)
    let hours = Math.floor(diff % (1000 * 60 * 60 * 24) / 1000 / 60 / 60 )  
    document.querySelector(".events  .info .info-count .counter .hours").innerHTML = hours < 10 ? `0${hours}` : hours
    let minets = Math.floor(diff % (1000 * 60 * 60 ) / 1000 / 60 )
    document.querySelector(".events  .info .info-count .counter .minets").innerHTML = minets < 10 ? `0${minets}` : minets
    let seconds = Math.floor(diff % (1000 * 60) / 1000 )
    document.querySelector(".events  .info .info-count .counter .seconds").innerHTML = seconds < 10 ? `0${seconds}` : seconds
    if (diff == 0 ) {
        clearInterval(count)
    }
}, 1000) 


let progSpans = document.querySelectorAll(".skills .container .skills-content .skill .progress span")
let section2 = document.querySelector(".skills")

let nums = document.querySelectorAll(".stats .container .box span")
let section = document.querySelector(".stats")
let started = false;

window.onscroll = function() {
    if (scrollY > section.offsetTop - 500) {
        if (!started) {
            nums.forEach((num)=>{
                numCount(num)
        })
        started = true;
        }
        }
    if (scrollY > section2.offsetTop - 500) {
            progSpans.forEach((span)=>{
                span.style.width = span.dataset.progres
            })
        }
    
}

function numCount(num) {
    let goal = num.dataset.number
        let cont = setInterval(()=>{
            num.innerHTML++
            if (num.innerHTML == goal) {
                clearInterval(cont)
            }
        },1000 / goal)
}

let imgs = document.querySelectorAll(".footer .footer-content .box img")
let overlay = document.querySelector(".footer .footer-content .box .overlay")
imgs.forEach((img)=>{
    img.onclick = function(e) {
        overlay.style.display = 'block'
        let maindiv = document.createElement("div")
        let Image = document.createElement("img")
        maindiv.className = "image-container";
        Image.src = e.currentTarget.src
        Image.className = "Image"
        let exit = document.createElement("span")
        exit.appendChild(document.createTextNode("X"))
        exit.className = "exit"

        maindiv.appendChild(exit)
        maindiv.appendChild(Image)
        overlay.appendChild(maindiv)
        exit.onclick = function () {
            overlay.style.display = "none"
        }
    }
})

// setting color 
let colors = document.querySelectorAll(".setting-info .box .colors span")
colors.forEach((color)=>{
    color.style.backgroundColor = color.dataset.color
    color.onclick = function (e) {
        document.documentElement.style.setProperty("--main-color" , `${e.currentTarget.dataset.color}`)
        window.localStorage.setItem("color" , e.currentTarget.dataset.color)
        colors.forEach((e)=>{
            e.classList.remove("active")
        })
        e.currentTarget.classList.add("active")
        
    }
})

if (window.localStorage.getItem("color")) {
    document.documentElement.style.setProperty("--main-color" , `${window.localStorage.getItem("color")}`)
    colors.forEach((e)=>{
        e.classList.remove("active")
        if (e.getAttribute("data-color") == window.localStorage.getItem("color")) {
            e.classList.add("active")
        }    
    })

}

let settingInfo= document.querySelector(".setting-info")
let settingIcon= document.querySelector(".setting-info i")
settingIcon.onclick = function () {
    settingInfo.classList.toggle("active")
}

// bullet settings 
let bullets = document.querySelectorAll(".bullets .bullet")
let bulletsContainer = document.querySelector(".bullets")
bullets.forEach((bullet)=>{
    bullet.onclick = function (e) {
        document.querySelector(e.currentTarget.dataset.section).scrollIntoView({
            behavior: "smooth",
        })
    }
})

let bulletButtons = document.querySelectorAll(".setting-info .box .choose span")
bulletButtons.forEach((buton)=>{
    buton.onclick = function (e) {
        bulletButtons.forEach((e)=>{
            e.classList.remove("active")
        })
        e.currentTarget.classList.add("active")
        if (e.currentTarget.dataset.bullet === "Yes") {
            bulletsContainer.style.display = "block"
        }else {
            bulletsContainer.style.display = "none"
        }
        window.localStorage.setItem("bullet-state" , e.currentTarget.dataset.bullet)
    }
})
if (window.localStorage.getItem("bullet-state")) {
    bulletButtons.forEach((button)=>{
        if (button.dataset.bullet == window.localStorage.getItem("bullet-state")){
            button.classList.add("active")
        }
        if (window.localStorage.getItem("bullet-state") === "Yes"){
            bulletsContainer.style.display = "block"
        }else {
            bulletsContainer.style.display = "none"
        }
    })
}

let clearButton = document.querySelector(".setting-info .clear")
clearButton.onclick = function () {
    window.localStorage.clear()
    window.location.reload() 
}
