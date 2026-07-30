// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Typing Effect

const text = [
    "Web Developer",
    "Frontend Developer",
    "UI Designer",
    "Programmer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type(){

    if(count===text.length){
        count=0;
    }

    currentText=text[count];

    letter=currentText.slice(0,++index);

    document.querySelector(".typing").textContent=letter;

    if(letter.length===currentText.length){

        count++;
        index=0;

        setTimeout(type,1000);

    }else{

        setTimeout(type,120);

    }

})();

// Scroll Animation

const observer = new IntersectionObserver(entries => {

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section").forEach(sec=>{

sec.classList.add("hidden");

observer.observe(sec);

});

// Active Navigation

const sections=document.querySelectorAll("section");
const nav=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-150;

if(pageYOffset>=sectionTop){

current=section.getAttribute("id");

}

});

nav.forEach(a=>{

a.classList.remove("active");

if(a.getAttribute("href")==="#"+current){

a.classList.add("active");

}

});

});
