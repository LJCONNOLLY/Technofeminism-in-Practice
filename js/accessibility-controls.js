/**
 * Accessibility Controls
 * Technofeminisms in Practice
 *
 * Manages theme switching, font sizing, and other accessibility features
 */

(function() {
    'use strict';

    // State management
    const state = {
        theme: localStorage.getItem('theme') || 'dark',
        fontSize: localStorage.getItem('fontSize') || 'normal',
        highContrast: localStorage.getItem('highContrast') === 'true'
    };

    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', function() {
        initializeAccessibilityControls();
        applyStoredPreferences();
        detectSystemPreferences();
    });

    /**
     * Initialize all accessibility control event listeners
     */
    function initializeAccessibilityControls() {
        const toggleBtn = document.getElementById('toggle-accessibility');
        const optionsPanel = document.getElementById('accessibility-options');
        const themeBtn = document.getElementById('toggle-theme');
        const increaseFontBtn = document.getElementById('increase-font');
        const decreaseFontBtn = document.getElementById('decrease-font');
        const contrastBtn = document.getElementById('toggle-contrast');

        // Toggle accessibility panel
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                optionsPanel.classList.toggle('hidden');
                const isExpanded = !optionsPanel.classList.contains('hidden');
                toggleBtn.setAttribute('aria-expanded', isExpanded);
            });
        }

        // Theme toggle
        if (themeBtn) {
            themeBtn.addEventListener('click', toggleTheme);
        }

        // Font size controls
        if (increaseFontBtn) {
            increaseFontBtn.addEventListener('click', increaseFont);
        }
        if (decreaseFontBtn) {
            decreaseFontBtn.addEventListener('click', decreaseFont);
        }

        // High contrast toggle
        if (contrastBtn) {
            contrastBtn.addEventListener('click', toggleHighContrast);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);

        // Close panel when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.accessibility-controls')) {
                optionsPanel.classList.add('hidden');
                if (toggleBtn) {
                    toggleBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    /**
     * Toggle between light and dark mode
     */
    function toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        applyTheme();
        announceToScreenReader(`${state.theme} mode activated`);
    }

    /**
     * Apply the current theme
     */
    function applyTheme() {
        if (state.theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    /**
     * Increase font size
     */
    function increaseFont() {
        const sizes = ['normal', 'large', 'xlarge'];
        const currentIndex = sizes.indexOf(state.fontSize);

        if (currentIndex < sizes.length - 1) {
            state.fontSize = sizes[currentIndex + 1];
            localStorage.setItem('fontSize', state.fontSize);
            applyFontSize();
            announceToScreenReader('Font size increased');
        } else {
            announceToScreenReader('Maximum font size reached');
        }
    }

    /**
     * Decrease font size
     */
    function decreaseFont() {
        const sizes = ['normal', 'large', 'xlarge'];
        const currentIndex = sizes.indexOf(state.fontSize);

        if (currentIndex > 0) {
            state.fontSize = sizes[currentIndex - 1];
            localStorage.setItem('fontSize', state.fontSize);
            applyFontSize();
            announceToScreenReader('Font size decreased');
        } else {
            announceToScreenReader('Minimum font size reached');
        }
    }

    /**
     * Apply font size class to body
     */
    function applyFontSize() {
        document.body.classList.remove('large-text', 'xlarge-text');
        if (state.fontSize === 'large') {
            document.body.classList.add('large-text');
        } else if (state.fontSize === 'xlarge') {
            document.body.classList.add('xlarge-text');
        }
    }

    /**
     * Toggle high contrast mode
     */
    function toggleHighContrast() {
        state.highContrast = !state.highContrast;
        localStorage.setItem('highContrast', state.highContrast);
        applyHighContrast();
        announceToScreenReader(`High contrast ${state.highContrast ? 'enabled' : 'disabled'}`);
    }

    /**
     * Apply high contrast mode
     */
    function applyHighContrast() {
        if (state.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }

    /**
     * Apply all stored preferences
     */
    function applyStoredPreferences() {
        applyTheme();
        applyFontSize();
        applyHighContrast();
    }

    /**
     * Detect system preferences
     */
    function detectSystemPreferences() {
        // Detect system light mode preference if no user preference set
        // Note: Our default is dark, so we only need to check if user prefers light
        if (!localStorage.getItem('theme')) {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            if (prefersLight) {
                state.theme = 'light';
                applyTheme();
            }
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                state.theme = e.matches ? 'light' : 'dark';
                applyTheme();
            }
        });

        // Detect reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.body.classList.add('reduced-motion');
        }
    }

    /**
     * Keyboard shortcuts for accessibility features
     */
    function handleKeyboardShortcuts(e) {
        // Alt + T: Toggle theme
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }

        // Alt + +: Increase font size
        if (e.altKey && (e.key === '+' || e.key === '=')) {
            e.preventDefault();
            increaseFont();
        }

        // Alt + -: Decrease font size
        if (e.altKey && e.key === '-') {
            e.preventDefault();
            decreaseFont();
        }

        // Alt + C: Toggle high contrast
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            toggleHighContrast();
        }

        // Escape: Close accessibility panel
        if (e.key === 'Escape') {
            const optionsPanel = document.getElementById('accessibility-options');
            const toggleBtn = document.getElementById('toggle-accessibility');
            if (optionsPanel && !optionsPanel.classList.contains('hidden')) {
                optionsPanel.classList.add('hidden');
                if (toggleBtn) {
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    toggleBtn.focus();
                }
            }
        }
    }

    /**
     * Announce messages to screen readers
     */
    function announceToScreenReader(message) {
        let announcer = document.getElementById('sr-announcer');

        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'sr-announcer';
            announcer.className = 'sr-only';
            announcer.setAttribute('role', 'status');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            document.body.appendChild(announcer);
        }

        announcer.textContent = message;

        // Clear after announcement
        setTimeout(function() {
            announcer.textContent = '';
        }, 1000);
    }

    // Expose functions for external use if needed
    window.accessibilityControls = {
        toggleTheme,
        increaseFont,
        decreaseFont,
        toggleHighContrast
    };

})();
