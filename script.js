document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
       1. Navbar Scroll Effect
       ========================================================================== */
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ==========================================================================
       2. Intersection Observer for Scroll Animations
       ========================================================================== */
  const revealElements = document.querySelectorAll(".reveal");

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("active");
        // Optional: Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  /* ==========================================================================
       3. Animated Number Counters
       ========================================================================== */
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // The lower the slower

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;

            // Dynamic increment
            const inc = target / speed;

            // Check if target is reached and increment
            if (count < target) {
              // Math.ceil to round up
              counter.innerText = Math.ceil(count + inc);
              // Call function every ms
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target;
            }
          };

          updateCount();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  /* ==========================================================================
       4. Parallax Effect for Floating Items (Hero Section)
       ========================================================================== */
  const heroSection = document.querySelector(".hero");
  const floatingItems = document.querySelectorAll(".floating-item");

  if (heroSection && floatingItems.length > 0) {
    heroSection.addEventListener("mousemove", (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

      floatingItems[0].style.transform = `translate(${xAxis}px, ${yAxis}px) rotateX(5deg) rotateY(-5deg)`;
      floatingItems[1].style.transform = `translate(${xAxis * -0.8}px, ${yAxis * -0.8}px) rotateX(10deg) rotateY(0deg)`;
      floatingItems[2].style.transform = `translate(${xAxis * 1.2}px, ${yAxis * 1.2}px) rotateX(5deg) rotateY(-5deg)`;
    });

    heroSection.addEventListener("mouseleave", () => {
      floatingItems.forEach((item) => {
        // Let the CSS animation take back over smoothly
        item.style.transform = "";
      });
    });
  }

  /* ==========================================================================
       5. Google Apps Script AJAX Implementation
       ========================================================================== */
  const ajaxForms = document.querySelectorAll(
    'form[action^="https://script.google.com"]',
  );

  ajaxForms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      // Set Loading UI State
      submitBtn.innerHTML =
        '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...';
      submitBtn.disabled = true;

      const formData = new FormData(form);

      try {
        // Send via AJAX with no-cors to bypass cross-origin browser blocking
        await fetch(form.action, {
          method: "POST",
          body: formData,
          mode: "no-cors",
        });

        // We assume success here because no-cors returns an opaque response,
        // making response.ok always false
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Joined';
        submitBtn.style.backgroundColor = "#10b981"; // Green color
        submitBtn.style.color = "#fff";
        submitBtn.style.borderColor = "#10b981";
        form.reset(); // Clear the form
      } catch (error) {
        // Error UI Feedback
        console.error("Form submission error:", error);
        submitBtn.innerHTML =
          '<i class="fa-solid fa-xmark"></i> Failed. Try again.';
        submitBtn.style.backgroundColor = "#ef4444"; // Red color
        submitBtn.style.color = "#fff";
        submitBtn.style.borderColor = "#ef4444";
      } finally {
        // Revert styling after a delay
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = "";
          submitBtn.style.color = "";
          submitBtn.style.borderColor = "";
          submitBtn.disabled = false;
        }, 3500);
      }
    });
  });

  /* ==========================================================================
       6. Smooth Scrolling for Navigation Links
       ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
