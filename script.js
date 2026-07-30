// ===========================
// Mobile Navigation
// ===========================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// ===========================
// Typing Animation
// ===========================

const words = [
    "B.Tech Student",
    "Web Developer",
    "Frontend Developer",
    "Programmer",
    "UI Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.querySelector(".typing");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingElement.textContent = currentWord.substring(0, charIndex++);
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = deleting ? 60 : 120;

    if (!deleting && charIndex === currentWord.length + 1) {
        deleting = true;
        speed = 1500;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// ===========================
// Scroll Reveal Animation
// ===========================

const hiddenElements = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

hiddenElements.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});


// ===========================
// Active Navigation
// ===========================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// ===========================
// Sticky Navbar Shadow
// ===========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.35)";
    } else {
        header.style.boxShadow = "none";
    }

});


// ===========================
// Smooth Scroll
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


// ===========================
// Contact Form
// ===========================

const form = document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Thank you! Your message has been received.");

    form.reset();

});


// ===========================
// Image Hover Animation
// ===========================

const profile = document.querySelector(".hero-image img");

if(profile){

profile.addEventListener("mouseenter",()=>{

profile.style.transform="scale(1.05) rotate(2deg)";

});

profile.addEventListener("mouseleave",()=>{

profile.style.transform="scale(1) rotate(0deg)";

});

}


// ===========================
// Skill Card Animation
// ===========================

const skills = document.querySelectorAll(".skill-box");

skills.forEach(skill=>{

skill.addEventListener("mouseenter",()=>{

skill.style.transform="translateY(-10px)";

});

skill.addEventListener("mouseleave",()=>{

skill.style.transform="translateY(0px)";

});

});


// ===========================
// Project Card Animation
// ===========================

const cards=document.querySelectorAll(".project-card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});


// ===========================
// Footer Year
// ===========================

const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.innerHTML =
        `Designed & Developed by Thomas Joseph © ${new Date().getFullYear()}`;
}

console.log("Portfolio Loaded Successfully 🚀");
