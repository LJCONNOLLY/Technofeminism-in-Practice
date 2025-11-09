/**
 * Navigation System
 * Technofeminisms in Practice
 *
 * Manages smooth scrolling, active states, and keyboard navigation
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initializeSmoothScrolling();
        initializeActiveNavStates();
        initializeKeyboardNavigation();
        initializeMobileMenu();
    });

    /**
     * Initialize smooth scrolling for anchor links
     */
    function initializeSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    // Get header height for offset
                    const header = document.querySelector('.site-header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }

                    // Focus the target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }

    /**
     * Update active navigation states based on scroll position
     */
    function initializeActiveNavStates() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

        if (sections.length === 0 || navLinks.length === 0) return;

        function updateActiveNav() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.removeAttribute('aria-current');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.setAttribute('aria-current', 'location');
                        }
                    });
                }
            });
        }

        // Throttle scroll events for performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateActiveNav();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial check
        updateActiveNav();
    }

    /**
     * Initialize keyboard navigation enhancements
     */
    function initializeKeyboardNavigation() {
        // Navigate modules with arrow keys
        const moduleCards = Array.from(document.querySelectorAll('.module-card'));

        moduleCards.forEach((card, index) => {
            card.addEventListener('keydown', function(e) {
                let targetIndex;

                switch(e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        targetIndex = index + 1;
                        if (targetIndex < moduleCards.length) {
                            moduleCards[targetIndex].focus();
                        }
                        break;

                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        targetIndex = index - 1;
                        if (targetIndex >= 0) {
                            moduleCards[targetIndex].focus();
                        }
                        break;

                    case 'Home':
                        e.preventDefault();
                        moduleCards[0].focus();
                        break;

                    case 'End':
                        e.preventDefault();
                        moduleCards[moduleCards.length - 1].focus();
                        break;
                }
            });
        });

        // Skip navigation shortcut
        document.addEventListener('keydown', function(e) {
            // Alt + S: Skip to main content
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.setAttribute('tabindex', '-1');
                    mainContent.focus();
                }
            }

            // Alt + M: Focus on modules
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                const modulesSection = document.getElementById('modules');
                if (modulesSection) {
                    modulesSection.scrollIntoView({ behavior: 'smooth' });
                    modulesSection.setAttribute('tabindex', '-1');
                    modulesSection.focus();
                }
            }
        });
    }

    /**
     * Initialize mobile menu (if needed in the future)
     */
    function initializeMobileMenu() {
        // Placeholder for mobile menu functionality
        // Can be expanded if hamburger menu is added
    }

    /**
     * Back to top button
     */
    function initializeBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.style.display = 'none';

        document.body.appendChild(backToTopBtn);

        // Show/hide based on scroll position
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (window.scrollY > 500) {
                        backToTopBtn.style.display = 'block';
                    } else {
                        backToTopBtn.style.display = 'none';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize back to top
    initializeBackToTop();

})();
