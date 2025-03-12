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

document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 5,  // Default for large screens
      spaceBetween: 20,
      loop: true,  
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        1200: { slidesPerView: 6 }, // Large screens
        992: { slidesPerView: 4 },  // Medium screens
        768: { slidesPerView: 3 },  // Tablets
        576: { slidesPerView: 2 },  // Small screens
        320: { slidesPerView: 3 }   // Extra small screens (phones)
      },
    });
  });

  let clickTimer = null;

function handleDropdownClick(event, url) {
    event.preventDefault(); // Prevent default link behavior

    // Detect if screen size is small
    if (window.innerWidth < 992) {
        let target = event.target;

        // If submenu is already open, treat it as a double click
        if (target.parentElement.classList.contains('show')) {
            window.location.href = url;
            return;
        }

        // Otherwise, handle single and double click logic
        if (clickTimer === null) {
            clickTimer = setTimeout(() => {
                clickTimer = null;
                // Show dropdown on first click
                let parentLi = target.closest('.dropdown-submenu');
                let submenu = parentLi.querySelector('.dropdown-menu-option');
                if (submenu) {
                    submenu.classList.toggle('show');
                }
            }, 300); // Time interval to differentiate between single and double click
        } else {
            clearTimeout(clickTimer);
            clickTimer = null;
            window.location.href = url; // Redirect on double click
        }
    } else {
        // On large screens, redirect immediately
        window.location.href = url;
    }
}

// Close dropdowns when clicking outside
document.addEventListener("click", function (event) {
    let dropdowns = document.querySelectorAll(".dropdown-menu-option");
    dropdowns.forEach(menu => {
        if (!menu.contains(event.target)) {
            menu.classList.remove("show");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".partnerSwiper", {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5},
        },
    });
});

function handleServiceClick(event) {
    event.preventDefault(); // Prevent default action
}

function redirectTo(event, url) {
    event.preventDefault(); // Prevent the default anchor action
    window.open(url, '_blank'); // Open the URL in a new window/tab
}
