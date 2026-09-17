document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. MOBILE HAMBURGER MENU
    // ==========================================
    const menuButton = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".content");

    if (menuButton && menu) {
        menuButton.addEventListener("click", () => {
            menu.classList.toggle("mobile-open");
            const isOpen = menu.classList.contains("mobile-open");

            if (isOpen) {
                // Change to 'X' icon when open
                menuButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                menuButton.setAttribute("aria-expanded", "true");
            } else {
                // Change back to hamburger icon when closed
                menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
                menuButton.setAttribute("aria-expanded", "false");
            }
        });

        // Close menu automatically when a navigation link is clicked
        document.querySelectorAll(".content a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("mobile-open");
                menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ==========================================
    // 2. SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            // Ignore empty links
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // ==========================================
    // 3. NAVBAR SCROLL EFFECT
    // ==========================================
    const navigation = document.querySelector(".navigation");
    
    if (navigation) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 30) {
                navigation.classList.add("scrolled");
            } else {
                navigation.classList.remove("scrolled");
            }
        });
    }

    // ==========================================
    // 4. BLOG MODAL INTERACTIONS
    // ==========================================
    const cardContainers = document.querySelectorAll(".card-container");
    const modal = document.querySelector(".card-modal");

    if (modal && cardContainers.length > 0) {
        const modalTitle = document.getElementById("modal-title");
        const modalDescription = document.getElementById("modal-description");
        const modalClose = document.querySelector(".modal-close");

        // Open modal with specific blog card data
        cardContainers.forEach(container => {
            container.addEventListener("click", () => {
                const title = container.getAttribute("data-title");
                const description = container.getAttribute("data-description");
                
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modal.setAttribute("aria-hidden", "false");
                modal.classList.add("active");
            });
        });

        // Close modal function
        const closeModal = () => {
            modal.setAttribute("aria-hidden", "true");
            modal.classList.remove("active");
        };

        if (modalClose) modalClose.addEventListener("click", closeModal);
        
        // Close modal if user clicks on the dark background overlay
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // ==========================================
    // 5. SCROLL REVEAL ANIMATION
    // ==========================================
    const revealElements = document.querySelectorAll(
        ".about, .book, .blog, .card-container, .trait, .contact-card-container"
    );

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show-on-scroll");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            element.classList.add("before-scroll");
            revealObserver.observe(element);
        });
    }

    // ==========================================
    // 6. BACK TO TOP BUTTON
    // ==========================================
    const topButton = document.createElement("button");
    topButton.className = "back-to-top";
    topButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    topButton.setAttribute("aria-label", "Back to top");
    document.body.appendChild(topButton);

    // Show button after scrolling down 500px
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            topButton.classList.add("visible");
        } else {
            topButton.classList.remove("visible");
        }
    });

    // Scroll to top when clicked
    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // ==========================================
    // 7. UPDATE ACTIVE NAVIGATION LINK
    // ==========================================
    const sections = document.querySelectorAll(
        "#home, #about, #book, #blog, #contact-page, #services, #resources"
    );
    const navLinks = document.querySelectorAll(".content a");

    if (sections.length > 0) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Remove active class from all links
                        navLinks.forEach(link => link.classList.remove("active"));

                        // Add active class to current section
                        const activeLink = document.querySelector(
                            `.content a[href="#${entry.target.id}"], .content a[href="index.html#${entry.target.id}"]`
                        );
                        if (activeLink) activeLink.classList.add("active");
                    }
                });
            },
            { threshold: 0.4 }
        );

        sections.forEach(section => sectionObserver.observe(section));
    }

    // ==========================================
    // 8. CONTACT FORM SUBMISSION HANDLING
    // ==========================================
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevents the page from refreshing on submit

            const submitBtn = contactForm.querySelector(".submit-btn");
            const originalText = submitBtn.textContent;

            // Change button state to give user feedback
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            // Simulate form submission delay
            setTimeout(() => {
                alert("Thank you! Your message has been sent successfully.");
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1000);
        });
    }

});