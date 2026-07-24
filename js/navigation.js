/**
 * Navigation System
 * Technofeminisms in Practice
 *
 * Manages smooth in-page scrolling, keyboard shortcuts, and back-to-top button
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initializeSmoothScrolling();
        initializeKeyboardNavigation();
    });

    /**
     * Initialize smooth scrolling for in-page anchor links
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

                    window.scrollTo({
                        top: target.offsetTop - 20,
                        behavior: 'smooth'
                    });

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
     * Initialize keyboard navigation enhancements
     */
    function initializeKeyboardNavigation() {
        // Navigate the weekly schedule list with arrow keys
        const scheduleLinks = Array.from(document.querySelectorAll('.schedule-item a'));

        scheduleLinks.forEach((link, index) => {
            link.addEventListener('keydown', function(e) {
                let targetIndex;

                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        targetIndex = index + 1;
                        if (targetIndex < scheduleLinks.length) {
                            scheduleLinks[targetIndex].focus();
                        }
                        break;

                    case 'ArrowUp':
                        e.preventDefault();
                        targetIndex = index - 1;
                        if (targetIndex >= 0) {
                            scheduleLinks[targetIndex].focus();
                        }
                        break;

                    case 'Home':
                        e.preventDefault();
                        scheduleLinks[0].focus();
                        break;

                    case 'End':
                        e.preventDefault();
                        scheduleLinks[scheduleLinks.length - 1].focus();
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

            // Alt + M: Jump to the weekly schedule page
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                const scheduleUrl = document.body.getAttribute('data-schedule-url');
                if (scheduleUrl) {
                    window.location.href = scheduleUrl;
                }
            }
        });
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
