/*=========================================
PORTFOLIO SCRIPT
Thomas Joseph Portfolio
Part 4A
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================
      MOBILE MENU
    =========================*/

    const menuBtn = document.querySelector(".menu-btn");

    const navMenu = document.querySelector(".navbar ul");

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

    document.querySelectorAll(".navbar a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

    /*=========================
      SMOOTH SCROLL
    =========================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /*=========================
      ACTIVE NAV LINK
    =========================*/

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".navbar ul li a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /*=========================
      FETCH GITHUB PROJECTS
    =========================*/

    const username = "thomasjoseph18";

    const container = document.getElementById("projects-container");

    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)

        .then(response => response.json())

        .then(repositories => {

            container.innerHTML = "";

            repositories.forEach(repo => {

                if (repo.fork) return;

                const card = document.createElement("div");

                card.className = "project-card";

                card.innerHTML = `

                <h3>${repo.name}</h3>

                <p>${repo.description || "No description available."}</p>

                <div class="tags">

                <span>${repo.language || "Code"}</span>

                <span>⭐ ${repo.stargazers_count}</span>

                </div>

                <a href="${repo.html_url}"

                target="_blank">

                View Project

                </a>

                `;

                container.appendChild(card);

            });

        })

        .catch(() => {

            container.innerHTML =

                "<p>Unable to load GitHub repositories.</p>";

        });

    /*=========================
      GSAP INTRO
    =========================*/

    gsap.from(".hero h1", {

        opacity: 0,

        y: 60,

        duration: 1,

        ease: "power4.out"

    });

    gsap.from(".hero h2", {

        opacity: 0,

        y: 50,

        delay: .3,

        duration: 1

    });

    gsap.from(".hero-text", {

        opacity: 0,

        y: 50,

        delay: .5,

        duration: 1

    });

    gsap.from(".buttons", {

        opacity: 0,

        y: 40,

        delay: .8,

        duration: 1

    });

    gsap.from(".socials a", {

        opacity: 0,

        y: 20,

        stagger: .1,

        delay: 1,

        duration: .8

    });

    gsap.from(".image-box", {

        opacity: 0,

        scale: .7,

        duration: 1.3,

        ease: "back.out(1.7)"

    });

    /*=========================
      REVEAL ON SCROLL
    =========================*/

    const revealItems = document.querySelectorAll(

        ".glass-card,.skill,.project-card"

    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    revealItems.forEach(item => {

        item.classList.add("fade-up");

        observer.observe(item);

    });

});
/*=============================
TYPEWRITER EFFECT
=============================*/

const typingElement = document.querySelector(".hero h2");

const words = [
    "AI & Data Science Student",
    "Python Developer",
    "Machine Learning Enthusiast",
    "Web Developer",
    "Open Source Learner"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {

    const current = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            current.substring(0, letterIndex++);

        if (letterIndex > current.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            current.substring(0, letterIndex--);

        if (letterIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length)
                wordIndex = 0;

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();

/*=============================
SCROLL PROGRESS BAR
=============================*/

const progress = document.createElement("div");

progress.style.position = "fixed";
progress.style.left = "0";
progress.style.top = "0";
progress.style.height = "4px";
progress.style.width = "0";
progress.style.zIndex = "99999";
progress.style.background =
"linear-gradient(90deg,#8b5cf6,#22d3ee)";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const total =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percent =
        window.scrollY / total * 100;

    progress.style.width = percent + "%";

});

/*=============================
SCROLL TO TOP
=============================*/

const topBtn = document.createElement("button");

topBtn.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';

topBtn.className = "top-btn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "30px";
topBtn.style.right = "30px";
topBtn.style.width = "55px";
topBtn.style.height = "55px";
topBtn.style.borderRadius = "50%";
topBtn.style.border = "none";
topBtn.style.cursor = "pointer";
topBtn.style.background =
"linear-gradient(135deg,#8b5cf6,#2563eb)";
topBtn.style.color = "#fff";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 500)
        topBtn.style.display = "block";
    else
        topBtn.style.display = "none";

});

topBtn.onclick = () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/*=============================
PARALLAX IMAGE
=============================*/

const image =
document.querySelector(".image-box");

document.addEventListener("mousemove", e=>{

    const x =
    (window.innerWidth/2-e.clientX)/40;

    const y =
    (window.innerHeight/2-e.clientY)/40;

    image.style.transform =
    `translate(${x}px,${y}px)`;

});

/*=============================
AURORA PARALLAX
=============================*/

const blobs =
document.querySelectorAll(".aurora span");

document.addEventListener("mousemove",e=>{

    blobs.forEach((blob,index)=>{

        const speed=(index+1)*10;

        blob.style.transform=
        `translate(${e.clientX/speed}px,
        ${e.clientY/speed}px)`;

    });

});

/*=============================
SKILL HOVER GLOW
=============================*/

document.querySelectorAll(".skill")
.forEach(card=>{

card.addEventListener("mousemove",e=>{

const rect=
card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.background=
`radial-gradient(circle at ${x}px ${y}px,
rgba(139,92,246,.5),
rgba(255,255,255,.08))`;

});

card.addEventListener("mouseleave",()=>{

card.style.background=
"rgba(255,255,255,.08)";

});

});

/*=============================
CUSTOM CURSOR
=============================*/

const cursor =
document.createElement("div");

cursor.style.width="18px";
cursor.style.height="18px";
cursor.style.borderRadius="50%";
cursor.style.position="fixed";
cursor.style.pointerEvents="none";
cursor.style.background="#22d3ee";
cursor.style.boxShadow=
"0 0 20px #22d3ee";
cursor.style.zIndex="999999";

document.body.appendChild(cursor);

window.addEventListener("mousemove",e=>{

cursor.style.left=e.clientX-9+"px";

cursor.style.top=e.clientY-9+"px";

});

/*=============================
FLOATING EFFECT
=============================*/

gsap.to(".image-box",{

y:-18,

duration:3,

repeat:-1,

yoyo:true,

ease:"power1.inOut"

});

/*=============================
ROTATING SKILLS
=============================*/

gsap.utils.toArray(".skill").forEach(skill=>{

gsap.from(skill,{

opacity:0,

y:40,

duration:1,

scrollTrigger:{

trigger:skill,

start:"top 85%"

}

});

});

/*=============================
CONSOLE MESSAGE
=============================*/

console.log(
"%cPortfolio designed by Thomas Joseph",
"color:#8b5cf6;font-size:18px;font-weight:bold;"
);