document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });

            // Highlight active section in navbar
            document.querySelectorAll("nav ul li a").forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Update active section on scroll
    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;
        document.querySelectorAll("section").forEach(section => {
            if (scrollPosition >= section.offsetTop - 100) {
                document.querySelectorAll("nav ul li a").forEach(link => link.classList.remove("active"));
                document.querySelector(`nav ul li a[href="#${section.id}"]`).classList.add("active");
            }
        });
    });

    // Scroll Reveal Animations
    ScrollReveal().reveal("section", {
        origin: "bottom",
        distance: "50px",
        duration: 800,
        delay: 200,
        easing: "ease-in-out",
        reset: true
    });

    // Tab Functionality
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Hide all content sections
            tabContents.forEach(content => content.classList.remove("active"));

            // Show the corresponding content
            const target = this.getAttribute("data-target");
            document.getElementById(target).classList.add("active");
        });
    });

    // Set "Skills" as default active tab
    document.querySelector(".tab-btn").classList.add("active");
    document.querySelector(".tab-content").classList.add("active");

    // Image Enlargement and Next Image Functionality
    const modal = document.querySelector(".modal");
    const modalImg = document.getElementById("enlarged-image");
    const closeBtn = document.querySelector(".close");
    const nextIcon = document.querySelector(".next-icon");

    let currentGallery = null;
    let currentIndex = 0;

    // Function to show the next image
    function showNextImage() {
        if (currentGallery) {
            const images = currentGallery.querySelectorAll("img");
            images[currentIndex].classList.remove("active");
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add("active");
            modalImg.src = images[currentIndex].src;
        }
    }

    // Click event to enlarge image
    document.querySelectorAll(".gallery-slider img").forEach(image => {
        image.addEventListener("click", function () {
            modal.style.display = "block";
            currentGallery = this.parentElement; // Set the current gallery
            const images = currentGallery.querySelectorAll("img");
            currentIndex = 0; // Always start with the first image
            modalImg.src = images[currentIndex].src; // Show the first image
        });
    });

    // Click event for next icon
    nextIcon.addEventListener("click", showNextImage);

    // Close modal when close button is clicked
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Project Description Modal
    const projectModal = document.querySelector(".project-modal");
    const projectTitle = document.getElementById("project-title");
    const projectDescription = document.getElementById("project-description");

    // Define descriptions for each project
    const projectDescriptions = {
        "Library Management System": "This project is a comprehensive library management system designed to streamline library operations. It includes features such as book searching, adding, and deleting books. Users must sign up before logging in, and they need to remember their password; otherwise, they will have to sign up again. The project is developed using Java as the main programming language and MySQL as the database.",
        "Chatbot": " This project is an AI-powered chatbot Application designed for real-time user interactions. It supports login/signup via email with OTP verification and securely stores chat history. The chatbot is developed using Java and integrates with the Hugging Face API to generate responses."
    };

    document.querySelectorAll(".learn-more").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const projectCard = this.closest(".project-card");
            const title = projectCard.querySelector("h3").textContent;

            // Get the description based on the project title
            const description = projectDescriptions[title] || "This is a detailed description of the project. You can add more details here.";

            projectTitle.textContent = title;
            projectDescription.textContent = description;
            projectModal.style.display = "block";
        });
    });

    // Close project modal
    document.querySelector(".project-modal .close").addEventListener("click", function () {
        projectModal.style.display = "none";
    });

    // Close project modal when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === projectModal) {
            projectModal.style.display = "none";
        }
    });

    // Contact Form Submission with Validation
    document.querySelector("form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        if (!data.name || !data.email || !data.message) {
            alert("Please fill all fields before submitting.");
            return;
        }

        try {
            const response = await fetch(this.action, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Message sent successfully!");
                this.reset();
            } else {
                alert("Error sending message.");
            }
        } catch (error) {
            alert("Network error. Try again.");
        }
    });

    // Download CV Button
    const downloadBtn = document.querySelector(".download-btn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {
            const filePath = 'assets/resume/Hariselva Vignesh_Resumeeeee.pdf';
            const link = document.createElement("a");
            link.href = filePath;
            link.download = 'Hariselva Vignesh_Resumeeeee.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Typewriter Effect
    const texts = ["App Developer", "Web Developer", "Student"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        document.querySelector('.typing-effect').textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Delay before switching to next text
        } else {
            setTimeout(type, 100);
        }
    }());
});

// Toggle Menu Functionality
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active'); // Hide the dropdown
    });
});