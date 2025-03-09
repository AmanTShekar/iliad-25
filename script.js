document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded");

    /* ================================= */
    /* 🔹 NAVIGATION MENU TOGGLE */
    /* ================================= */
    const burger = document.querySelector(".burger");
    const navMenu = document.querySelector(".nav-menu");

    function toggleMenu() {
        navMenu.classList.toggle("active");
        burger.classList.toggle("active");
    }

    burger.addEventListener("click", toggleMenu);

    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && !burger.contains(event.target)) {
            navMenu.classList.remove("active");
            burger.classList.remove("active");
        }
    });

    /* ================================= */
    /* 🔹 SCROLL REVEAL EFFECT */
    /* ================================= */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll(".creativity-section").forEach(el => observer.observe(el));

    /* ================================= */
    /* 🔹 GSAP ANIMATIONS */
    /* ================================= */
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".creativity-title", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".creativity-section",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
        }
    });

    /* ================================= */
    /* 🔹 FADE-IN FOR "ILIAD 25" + "COMING SOON" */
    /* ================================= */

    
/* 🔹 FADE-IN FOR IMAGE, THEN TEXT */
const iliadText = document.querySelector(".iliad"); // "ILIAD 25"
const septemberText = document.querySelector(".september"); // "September"
const bgImage = document.querySelector(".selected-image-bg"); // Background Image

// Ensure both texts are completely hidden initially
gsap.set([iliadText, septemberText], { opacity: 0, display: "none", visibility: "hidden" });

// Background image fade-in
gsap.to(bgImage, {
    opacity: 1,
    duration: 2.5, // Smooth fade-in duration
    ease: "power2.inOut",
    onComplete: () => {
        // Make both "ILIAD 25" and "September" visible at the same time
        gsap.set([iliadText, septemberText], { display: "block", visibility: "visible" });

        gsap.to([iliadText, septemberText], {
            opacity: 1,
            duration: 2,
            ease: "power2.out"
        });
    }
});






    /* ================================= */
    /* 🔹 ARTISTIC FREEDOM ANIMATIONS */
    /* ================================= */
    gsap.to(".artistic-freedom-title", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".artistic-freedom-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
        }
    });

    /* ================================= */
    /* 🔹 CREATIVITY SECTION REVEAL */
    /* ================================= */
    const creativitySection = document.querySelector(".creativity-section");
    const creativityBg = document.querySelector(".creativity-bg");

    function revealOnScroll() {
        const sectionPosition = creativitySection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionPosition < windowHeight * 0.8) {
            creativitySection.classList.add("show");

            setTimeout(() => {
                creativityBg.style.opacity = "1";
            }, 800);
        }
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Scroll to top on refresh
    window.scrollTo(0, 0);

/* ================================= */
/* 🔹 IMAGE SELECTION ANIMATION (COMING SOON SECTION ONLY) */
/* ================================= */
const images = [
    { src: "bg/1.png", desc: "Starry Night Sky" },
    { src: "bg/2.webp", desc: "Mountain Peaks" },
    { src: "bg/3.webp", desc: "Neon Cyberpunk City" },
    { src: "bg/4.webp", desc: "Serene Ocean View" },
    { src: "bg/5.webp", desc: "Mystical Forest" },
    { src: "bg/6.webp", desc: "Golden Sunset" },
    { src: "bg/7.webp", desc: "Deep Space Nebula" },
    { src: "bg/8.webp", desc: "Abstract Art" },
    { src: "bg/9.webp", desc: "Snowy Mountain Pass" },
    { src: "bg/10.webp", desc: "Futuristic Cityscape" },
    { src: "bg/11.webp", desc: "Desert Dunes" },
    { src: "bg/12.webp", desc: "Lush Green Hills" },
    { src: "bg/13.webp", desc: "Dark Stormy Clouds" },
    { src: "bg/14.webp", desc: "Crystal Clear Waterfall" },
    { src: "bg/15.webp", desc: "Colorful Autumn Forest" }
];

const numImages = images.length;
const selectedImage = images[Math.floor(Math.random() * numImages)];

const comingSoonSection = document.querySelector(".coming-soon");

if (!comingSoonSection) {
    console.warn("No '.coming-soon' section found!");
    return;
}

// Create wrapper for images
const imageWrapper = document.createElement("div");
imageWrapper.classList.add("image-selection-container");
comingSoonSection.appendChild(imageWrapper);

function createImageGrid() {
    const displayedImages = images.slice(0, 15);
    displayedImages.forEach(({ src }) => {
        let img = document.createElement("img");
        img.src = src;
        img.classList.add("flowing-img");
        imageWrapper.appendChild(img);
    });
}

createImageGrid();

const allImages = document.querySelectorAll(".flowing-img");

// Initial animation: Smooth fade-in
gsap.set(allImages, { opacity: 0 });

gsap.to(allImages, {
    opacity: 1,
    duration: 1.2,
    stagger: 0.1,
    ease: "power2.out"
});

// Create full-screen selected image background (for "Coming Soon" section only)
const selectedImgElement = document.createElement("div");
selectedImgElement.classList.add("selected-image-bg");
selectedImgElement.style.backgroundImage = `url('${selectedImage.src}')`;
selectedImgElement.style.opacity = "0"; // Start hidden
comingSoonSection.appendChild(selectedImgElement);

// Create description text
const descElement = document.createElement("div");
descElement.classList.add("image-description");
descElement.textContent = selectedImage.desc;
descElement.style.opacity = "0"; // Start hidden
comingSoonSection.appendChild(descElement);

// Smooth transition to fade out other images and fade in background
setTimeout(() => {
    gsap.to(allImages, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
    });

    // Fade in selected image background
    gsap.to(selectedImgElement, {
        opacity: 0.4,
        duration: 1.5,
        ease: "power2.inOut"
    });

    // Fade in description text
    gsap.to(descElement, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut",
        y: "-20px" // Slight upward motion
    });

    // Remove images after animation
    setTimeout(() => {
        imageWrapper.remove();
    }, 1600);

}, 2000);
   
    





    /* ================================= */
    /* 🔹 REGISTRATION POPUP */
    /* ================================= */
    
        // Selecting elements
        const registerBtn = document.querySelector(".creativity-btn"); // REGISTER button
        const popup = document.querySelector(".registration-popup"); // Popup container
        const closeBtn = document.querySelector(".close-btn"); // Close button
        const tabButtons = document.querySelectorAll(".tab-btn"); // Tab buttons
        const forms = document.querySelectorAll(".registration-form"); // All forms
        const teamSizeDropdown = document.getElementById("grp-members"); // Group size dropdown
        const teamMemberContainer = document.getElementById("team-member-names"); // Dynamic input area
    
        // Ensure popup is hidden initially
        popup.style.display = "none";
        popup.style.opacity = "0";
    
        // ================================
        // 🔹 POPUP FUNCTIONALITY
        // ================================
    
        // Open popup when REGISTER button is clicked
        registerBtn.addEventListener("click", function () {
            console.log("REGISTER button clicked!"); // Debugging log
            popup.style.display = "flex"; // Show popup
            document.body.classList.add("noscroll"); // Disable background scrolling
            setTimeout(() => {
                popup.style.opacity = "1"; // Smooth fade-in
            }, 10);
        });
    
        // Close popup when close button is clicked
        closeBtn.addEventListener("click", function () {
            console.log("Close button clicked!"); // Debugging log
            popup.style.opacity = "0"; // Smooth fade-out
            setTimeout(() => {
                popup.style.display = "none"; // Hide completely
                document.body.classList.remove("noscroll"); // Re-enable scrolling
            }, 300);
        });
    
        // Close popup when clicking outside content
        popup.addEventListener("click", function (e) {
            if (e.target === popup) {
                console.log("Clicked outside popup!"); // Debugging log
                popup.style.opacity = "0";
                setTimeout(() => {
                    popup.style.display = "none";
                    document.body.classList.remove("noscroll"); // Re-enable scrolling
                }, 300);
            }
        });
    
        // ================================
        // 🔹 TAB SWITCHING (Individual / Group)
        // ================================
    
        tabButtons.forEach((button) => {
            button.addEventListener("click", function () {
                console.log("Tab clicked:", this.dataset.tab); // Debugging log
    
                // Remove 'active' class from all buttons & forms
                tabButtons.forEach((btn) => btn.classList.remove("active"));
                forms.forEach((form) => form.classList.remove("active"));
    
                // Add 'active' class to selected tab & corresponding form
                this.classList.add("active");
                document.getElementById(this.dataset.tab + "-form").classList.add("active");
            });
        });
    
        // ================================
        // 🔹 DYNAMIC TEAM MEMBER INPUT FIELDS
        // ================================
    
        teamSizeDropdown.addEventListener("change", function () {
            console.log("Team size changed:", this.value); // Debugging log
    
            teamMemberContainer.innerHTML = ""; // Clear previous inputs
            let teamSize = parseInt(this.value);
    
            for (let i = 1; i <= teamSize - 1; i++) {
                let input = document.createElement("input");
                input.type = "text";
                input.placeholder = `Member ${i + 1} Name`;
                input.required = true;
                teamMemberContainer.appendChild(input);
            }
        });
    
    // ================================
    // 🔹 FORM SUBMISSION (FORMAT FOR GOOGLE FORMS)
    // ================================

    // ✅ Individual Form Submission
    document.getElementById("individual-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let email = document.getElementById("ind-email").value;
        let name = document.getElementById("ind-name").value;
        let semester = document.getElementById("ind-semester").value;
        let regNo = document.getElementById("ind-reg-no").value;
        let event = document.getElementById("ind-event").value;

        let formData = `https://docs.google.com/forms/d/e/1FAIpQLSeUseeip_fnrMfLhgvX_zymcoPQXRIZQV1djBQc32uEYPZXMw/formResponse?entry.168660119=${email}&entry.398821280=${name}&entry.971774167=${semester}&entry.1040612207=${regNo}&entry.2005226383=${event}`;
        
        console.log("Submitting Individual Form:", formData);
        window.open(formData, "_blank");

        showSuccessPopup(); // Show success message
    });

    // ✅ Group Form Submission
    document.getElementById("group-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let email = document.getElementById("grp-email").value;
        let captainName = document.getElementById("grp-captain").value;
        let semester = document.getElementById("grp-semester").value;
        let regNo = document.getElementById("grp-reg-no").value;
        let event = document.getElementById("grp-event").value;
        let memberNames = [];

        document.querySelectorAll("#team-member-names input").forEach((input) => {
            memberNames.push(input.value);
        });

        // Format team member names with newline ("%0A" is URL encoding for newline)
        let formattedMembers = memberNames.join("%0A");

        let formData = `https://docs.google.com/forms/d/e/1FAIpQLSeUseeip_fnrMfLhgvX_zymcoPQXRIZQV1djBQc32uEYPZXMw/formResponse?entry.1708180751=${email}&entry.145799555=${captainName}&entry.1674322260=${semester}&entry.2035909927=${event}&entry.1617909421=${regNo}&entry.2010438367=${formattedMembers}`;
        
        console.log("Submitting Group Form:", formData);
        window.open(formData, "_blank");

        showSuccessPopup(); // Show success message
    });

    // ================================
    // 🔹 SUCCESS POPUP
    // ================================

    function showSuccessPopup() {
        let successPopup = document.createElement("div");
        successPopup.innerText = "✔ Registration Successful!";
        successPopup.style.position = "fixed";
        successPopup.style.bottom = "20px";
        successPopup.style.right = "20px";
        successPopup.style.padding = "12px 20px";
        successPopup.style.background = "green";
        successPopup.style.color = "white";
        successPopup.style.borderRadius = "50px"; // Pill shape
        successPopup.style.fontSize = "16px";
        successPopup.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
        successPopup.style.opacity = "1";
        successPopup.style.transition = "opacity 0.5s ease-out";

        document.body.appendChild(successPopup);

        setTimeout(() => {
            successPopup.style.opacity = "0";
            setTimeout(() => document.body.removeChild(successPopup), 500);
        }, 3000);
    }
    
    

});
    
