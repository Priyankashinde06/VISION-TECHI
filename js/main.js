"use strict";

// Spinner
function spinner() {
    setTimeout(function () {
        const spinnerElement = document.getElementById("spinner");
        if (spinnerElement) {
            spinnerElement.classList.remove("show");
        }
    }, 1);
}
spinner();

// Initiate WOW.js
if (typeof WOW !== "undefined") {
    new WOW().init();
}

// Sticky Navbar
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 45) {
        navbar.classList.add("sticky-top", "shadow-sm");
    } else {
        navbar.classList.remove("sticky-top", "shadow-sm");
    }
});

// Hero Header Carousel
document.addEventListener("DOMContentLoaded", function () {
    if (typeof OwlCarousel !== "undefined") {
        $(".header-carousel").owlCarousel({
            animateOut: "slideOutDown",
            items: 1,
            autoplay: true,
            smartSpeed: 1000,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-arrow-left"></i>',
                '<i class="bi bi-arrow-right"></i>'
            ],
        });
    }
});

// Testimonial Carousel
document.addEventListener("DOMContentLoaded", function () {
    if (typeof OwlCarousel !== "undefined") {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            center: true,
            dots: true,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-arrow-left"></i>',
                '<i class="bi bi-arrow-right"></i>'
            ],
        });
    }
});

// Modal Video
document.addEventListener("DOMContentLoaded", function () {
    let videoSrc;
    document.querySelectorAll(".btn-play").forEach(button => {
        button.addEventListener("click", function () {
            videoSrc = this.getAttribute("data-src");
        });
    });

    const videoModal = document.getElementById("videoModal");
    if (videoModal) {
        videoModal.addEventListener("shown.bs.modal", function () {
            document.getElementById("video").src = videoSrc + "?autoplay=1&modestbranding=1&showinfo=0";
        });

        videoModal.addEventListener("hide.bs.modal", function () {
            document.getElementById("video").src = videoSrc;
        });
    }
});

//services redirection
document.addEventListener("DOMContentLoaded", function () {
    const servicesLink = document.querySelector("#servicesDropdown");

    servicesLink.addEventListener("click", function (event) {
        let isMobile = window.innerWidth <= 991; // Mobile view breakpoint

        if (isMobile) {
            // On mobile, prevent default on first click and redirect on second click
            if (!this.dataset.clicked) {
                event.preventDefault(); // Stop redirection on first click
                this.dataset.clicked = "true"; // Mark as clicked
            } else {
                window.location.href = this.href; // Redirect on second click
            }
        } else {
            // On desktop, redirect immediately
            window.location.href = this.href;
        }
    });

    // Reset click status when clicking outside
    document.addEventListener("click", function (event) {
        if (!servicesLink.contains(event.target)) {
            servicesLink.removeAttribute("data-clicked");
        }
    });
});


// Animation function
function myMove() {
    let pos = 0;
    const elem = document.getElementById("animate");
    if (!elem) return;

    clearInterval(elem.animationId);
    elem.animationId = setInterval(frame, 5);

    function frame() {
        if (pos === 350) {
            clearInterval(elem.animationId);
        } else {
            pos++;
            elem.style.top = pos + "px";
            elem.style.left = pos + "px";
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    var dropdownSubmenus = document.querySelectorAll(".dropdown-submenu .dropdown-toggle");

    dropdownSubmenus.forEach(function (dropdown) {
        dropdown.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default link behavior
            e.stopPropagation(); // Stop propagation to parent elements

            let submenu = this.nextElementSibling;

            // Close all open submenus before opening a new one
            document.querySelectorAll(".dropdown-menu-option").forEach(function (el) {
                if (el !== submenu) el.classList.remove("show");
            });

            // Toggle submenu visibility
            submenu.classList.toggle("show");
        });
    });

    // Close submenu when clicking anywhere else
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown-submenu")) {
            document.querySelectorAll(".dropdown-menu-option").forEach(function (el) {
                el.classList.remove("show");
            });
        }
    });
});

// Back to top button
$(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
        $(".back-to-top").fadeIn();
    } else {
        $(".back-to-top").fadeOut();
    }
});

$(".back-to-top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "smooth");
});

