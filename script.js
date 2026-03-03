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

/*
HOW TO ADD NEW MOVIES / BOOKS?

👉 Just copy a .hobby-item block inside HTML.
👉 No need to edit JS.
*/

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".hobby-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        document.querySelector(".tab.active").classList.remove("active");
        tab.classList.add("active");

        contents.forEach(content => {
            content.classList.remove("active");
        });

        document.getElementById(tab.dataset.category)
            .classList.add("active");
    });
});

/* ===========================
   GOOGLE SHEET SUGGESTIONS
=========================== */

/*
IMPORTANT:
Replace YOUR_SCRIPT_URL below with your
Google Apps Script /exec URL
*/
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwaSMpw-Rcu_znUuDfDqvr93e1EW-22LRkzcMApgqE/dev";

document.querySelectorAll(".suggestion-form").forEach(form => {

    form.addEventListener("submit", async function(e) {

        e.preventDefault();

        const button = this.querySelector("button");
        const statusText = this.querySelector(".suggest-status");

        // Prevent double click
        button.disabled = true;
        button.textContent = "Submitting...";

        const name = this.querySelector(".suggest-name").value;
        const suggestion = this.querySelector(".suggest-input").value;

        const activeTab = document.querySelector(".tab.active");
        const category = activeTab.dataset.category;

        try {

            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    category: category,
                    suggestion: suggestion
                })
            });

            statusText.textContent = "Suggestion sent successfully!";
            statusText.style.color = "#00ffcc";

            this.reset();

        } catch (error) {

            statusText.textContent = "Error sending suggestion.";
            statusText.style.color = "red";
        }

        button.disabled = false;
        button.textContent = "Submit";

    });

});
/* Netflix Scroll */

document.querySelectorAll(".slider-container").forEach(container => {

    const slider = container.querySelector(".hobby-slider");
    const leftBtn = container.querySelector(".left");
    const rightBtn = container.querySelector(".right");

    const scrollAmount = 6 * 200; // 6 images at a time

    rightBtn.addEventListener("click", () => {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    leftBtn.addEventListener("click", () => {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
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

