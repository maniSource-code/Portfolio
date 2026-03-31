
/* =========================
   TYPING ANIMATION
========================= */
/* ===== SMOOTH WORD SWITCH ===== */
/* ===== CONTINUOUS LETTER ITERATION (NO BLINK) ===== */

const words = [
    "Linux Enthusiast",
    "DevOps Engineer",
    "Cloud Learner",
    "Automation Specialist"
];

const typingElement = document.querySelector(".typing");

let wordIndex = 0;
let letterIndex = 0;

function typeLetters() {
    const currentWord = words[wordIndex];

    if (letterIndex < currentWord.length) {
        typingElement.textContent += currentWord.charAt(letterIndex);
        letterIndex++;
        setTimeout(typeLetters, 80);
    } else {
        // move to next word without clearing to blank
        setTimeout(() => {
            wordIndex = (wordIndex + 1) % words.length;
            typingElement.textContent = "";
            letterIndex = 0;
            typeLetters();
        }, 1500);
    }
}

// start animation
typingElement.textContent = "";
typeLetters();


/* =========================
   SKILL TOGGLE PROGRESS
========================= */

document.querySelectorAll(".skill-btn").forEach(button => {
    button.addEventListener("click", function () {

        const skillItem = this.parentElement;
        const progressContainer = skillItem.querySelector(".skill-progress");
        const progressBar = skillItem.querySelector(".progress-bar");
        const progressText = skillItem.querySelector(".progress-text");

        const progressValue = skillItem.getAttribute("data-progress");

        if (progressContainer.style.display === "block") {
            progressContainer.style.display = "none";
            progressBar.style.width = "0";
            return;
        }

        progressContainer.style.display = "block";
        progressBar.style.width = progressValue + "%";

        let status = "";

        if (progressValue < 60) {
            status = "In Progress 🚀";
        } else if (progressValue < 80) {
            status = "Near Proficiency 🔥";
        } else {
            status = "Advanced Level 💎";
        }

        progressText.innerText = progressValue + "% - " + status;
    });
});


/* =========================
   HOBBIES SECTION (TABS + DETAILS)
========================= */
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".hobby-content");

tabs.forEach(tab=>{
tab.addEventListener("click",()=>{

tabs.forEach(t=>t.classList.remove("active"));
contents.forEach(c=>c.classList.remove("active"));

tab.classList.add("active");
document.getElementById(tab.dataset.tab).classList.add("active");

});
});


document.querySelectorAll(".slider").forEach(slider => {

const track = slider.querySelector(".slider-track");
const cards = slider.querySelectorAll(".card");
const left = slider.querySelector(".left");
const right = slider.querySelector(".right");

const visibleCards = 6;
const cardSpace = 210; // 180 card + 30 gap
const moveAmount = visibleCards * cardSpace;

let position = 0;
const totalCards = cards.length;

/* maximum scroll allowed */

const maxScroll = Math.max(0,(totalCards - visibleCards) * cardSpace);


/* RIGHT BUTTON */

right.onclick = () => {

position += moveAmount;

if(position > maxScroll){
position = maxScroll;
}

track.style.transform = `translateX(-${position}px)`;

};


/* LEFT BUTTON */

left.onclick = () => {

position -= moveAmount;

if(position < 0){
position = 0;
}

track.style.transform = `translateX(-${position}px)`;

};

});



/* ================= SUGGESTION BOX================= */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDG-BefYUO0YMTa9CWjm7U6_Eziu_TTzo1LMj60maEenYOvEfoWZ3UWU231a5h28T5/exec";

document.querySelectorAll(".suggestion-form").forEach(form => {

form.addEventListener("submit", function(e){

e.preventDefault();

const button = this.querySelector("button");
const statusText = this.querySelector(".suggest-status");

button.disabled = true;
button.textContent = "Submitting...";

const name = this.querySelector(".suggest-name").value;
const suggestion = this.querySelector(".suggest-input").value;

const activeTab = document.querySelector(".tab.active");
const category = activeTab ? activeTab.dataset.category : "unknown";

const formData = new URLSearchParams();

formData.append("name", name);
formData.append("category", category);
formData.append("suggestion", suggestion);

fetch(SCRIPT_URL, {
method: "POST",
body: formData
})
.then(() => {

statusText.textContent = "Suggestion sent successfully!";
statusText.style.color = "#00ffcc";
button.disabled = false;
button.textContent = "Submit";
form.reset();

})
.catch(() => {

statusText.textContent = "Error sending suggestion.";
statusText.style.color = "red";
  button.disabled = false;
   button.textContent = "Submit";

});

});

});

/* ================= PROJECTS SLIDER ================= */

/* ===== FINAL PROJECT SLIDER ===== */

const track = document.querySelector(".projects-track");
const pages = document.querySelectorAll(".projects-page");
const leftBtn = document.querySelector(".project-scroll.left");
const rightBtn = document.querySelector(".project-scroll.right");

let index = 0;
const totalPages = pages.length;

rightBtn.addEventListener("click", () => {
    if (index < totalPages - 1) {
        index++;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
});

leftBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
});

// ===== NAV SCROLL SPY =====

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });

});





