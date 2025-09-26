// Mobile menu functionality
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
  });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      document.getElementById("mobile-menu").classList.add("hidden");
    }
  });
});

// Animate skill bars when they come into view
// Star rating functionality
const starRatings = {
  htmlcss: 5,
  javascript: 4,
  react: 4,
  nodejs: 3,
};

// Initialize star ratings
function initializeStarRatings() {
  Object.keys(starRatings).forEach((skill) => {
    const stars = document.querySelectorAll(`[data-skill="${skill}"]`);
    const rating = starRatings[skill];

    stars.forEach((star) => {
      const starRating = parseInt(star.getAttribute("data-rating"));
      if (starRating <= rating) {
        star.classList.add("text-yellow-400");
        star.classList.remove("text-gray-300");
      } else {
        star.classList.add("text-gray-300");
        star.classList.remove("text-yellow-400");
      }
    });
  });
}
// Add click event listeners to stars
function setupStarInteractions() {
  document.querySelectorAll(".fa-star").forEach((star) => {
    star.addEventListener("click", function () {
      const skill = this.getAttribute("data-skill");
      const rating = parseInt(this.getAttribute("data-rating"));

      starRatings[skill] = rating;

      // Update all stars for this skill
      const stars = document.querySelectorAll(`[data-skill="${skill}"]`);
      stars.forEach((s) => {
        const starRating = parseInt(s.getAttribute("data-rating"));
        if (starRating <= rating) {
          s.classList.add("text-yellow-400");
          s.classList.remove("text-gray-300");
        } else {
          s.classList.add("text-gray-300");
          s.classList.remove("text-yellow-400");
        }
      });

      // Save to localStorage
      localStorage.setItem("skillRatings", JSON.stringify(starRatings));

      // Show feedback
      showRatingFeedback(skill, rating);
    });

    // Hover effect
    star.addEventListener("mouseenter", function () {
      const skill = this.getAttribute("data-skill");
      const rating = parseInt(this.getAttribute("data-rating"));

      const stars = document.querySelectorAll(`[data-skill="${skill}"]`);
      stars.forEach((s) => {
        const starRating = parseInt(s.getAttribute("data-rating"));
        if (starRating <= rating) {
          s.classList.add("text-yellow-300");
        }
      });
    });

    star.addEventListener("mouseleave", function () {
      const skill = this.getAttribute("data-skill");
      const currentRating = starRatings[skill];

      const stars = document.querySelectorAll(`[data-skill="${skill}"]`);
      stars.forEach((s) => {
        const starRating = parseInt(s.getAttribute("data-rating"));
        s.classList.remove("text-yellow-300");
        if (starRating <= currentRating) {
          s.classList.add("text-yellow-400");
        } else {
          s.classList.add("text-gray-300");
        }
      });
    });
  });
}
function showRatingFeedback(skill, rating) {
  const skillNames = {
    htmlcss: "HTML/CSS",
    javascript: "JavaScript",
    tailwindcss: "TailwindCSS",
    bootstrap: "Bootstrap",
    laravel: "Laravel",
  };

  // Create or update feedback element
  let feedback = document.getElementById("rating-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.id = "rating-feedback";
    feedback.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    document.body.appendChild(feedback);
  }

  feedback.textContent = `${skillNames[skill]} rating set to ${rating} stars`;

  // Remove after 3 seconds
  setTimeout(() => {
    feedback.style.opacity = "0";
    setTimeout(() => feedback.remove(), 300);
  }, 3000);
}

// Load saved ratings from localStorage
function loadSavedRatings() {
  const savedRatings = localStorage.getItem("skillRatings");
  if (savedRatings) {
    Object.assign(starRatings, JSON.parse(savedRatings));
  }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  loadSavedRatings();
  initializeStarRatings();
  setupStarInteractions();
});
// Observe skills section
const skillsSection = document.getElementById("skills");
if (skillsSection) {
  observer.observe(skillsSection);
}

// Form submission
const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Terima kasih! Pesan Anda telah dikirim.");
    this.reset();
  });
}

// Project card hover effect enhancement
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  });
});
