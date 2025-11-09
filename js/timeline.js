/* ===================================
   Interactive Timeline
   Technofeminisms in Practice
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.getElementById('feministTimeline');

    if (!timeline) return; // Exit if timeline doesn't exist on page

    const prevBtn = document.getElementById('timelinePrev');
    const nextBtn = document.getElementById('timelineNext');
    const counter = document.getElementById('timelineCounter');
    const items = document.querySelectorAll('.timeline-item');

    let currentIndex = 0;
    const totalItems = items.length;

    function updateTimeline() {
        // Hide all items
        items.forEach(item => item.classList.remove('active'));

        // Show current item
        items[currentIndex].classList.add('active');

        // Update counter
        counter.textContent = `${currentIndex + 1} / ${totalItems}`;

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalItems - 1;
    }

    function goToPrevious() {
        if (currentIndex > 0) {
            currentIndex--;
            updateTimeline();
        }
    }

    function goToNext() {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            updateTimeline();
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', goToPrevious);
    nextBtn.addEventListener('click', goToNext);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!timeline) return;

        if (e.key === 'ArrowLeft') {
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });

    // Initialize
    updateTimeline();
});
