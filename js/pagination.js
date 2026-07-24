/**
 * Unit Pagination
 * Technofeminisms in Practice
 *
 * Enables Left/Right arrow key navigation between week pages,
 * driven by data-prev-url / data-next-url attributes on <body>.
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const prevUrl = document.body.getAttribute('data-prev-url');
        const nextUrl = document.body.getAttribute('data-next-url');

        document.addEventListener('keydown', function(e) {
            // Ignore when focus is in a form control to avoid hijacking typing
            const tag = document.activeElement ? document.activeElement.tagName : '';
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

            if (e.key === 'ArrowLeft' && prevUrl) {
                window.location.href = prevUrl;
            }
            if (e.key === 'ArrowRight' && nextUrl) {
                window.location.href = nextUrl;
            }
        });
    });

})();
