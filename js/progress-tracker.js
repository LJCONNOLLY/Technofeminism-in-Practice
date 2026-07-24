/**
 * Progress Tracker
 * Technofeminisms in Practice
 *
 * Tracks student progress through the 15-week course
 */

(function() {
    'use strict';

    const TOTAL_WEEKS = 15;
    const STORAGE_KEY = 'techfem-progress';

    // Progress state
    let progress = {
        completedWeeks: [],
        lastVisited: null,
        startDate: null
    };

    document.addEventListener('DOMContentLoaded', function() {
        loadProgress();
        initializeProgressTracking();
        updateProgressDisplay();
        markCurrentWeekAsVisited();
    });

    /**
     * Load progress from localStorage
     */
    function loadProgress() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                progress = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse progress data:', e);
                progress = {
                    completedWeeks: [],
                    lastVisited: null,
                    startDate: new Date().toISOString()
                };
            }
        } else {
            progress.startDate = new Date().toISOString();
        }
    }

    /**
     * Save progress to localStorage
     */
    function saveProgress() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        } catch (e) {
            console.error('Failed to save progress:', e);
        }
    }

    /**
     * Initialize progress tracking on the weekly schedule list
     */
    function initializeProgressTracking() {
        const scheduleItems = document.querySelectorAll('.schedule-item');

        scheduleItems.forEach((item, index) => {
            const weekNumber = index + 1;

            // Add completion checkbox
            const checkbox = createCompletionCheckbox(weekNumber);
            item.appendChild(checkbox);

            // Mark as visited when clicked
            item.addEventListener('click', function() {
                markWeekAsVisited(weekNumber);
            });

            // Visual indicator for completed weeks
            if (progress.completedWeeks.includes(weekNumber)) {
                item.classList.add('completed');
            }
        });
    }

    /**
     * Create completion checkbox for a week
     */
    function createCompletionCheckbox(weekNumber) {
        const container = document.createElement('div');
        container.className = 'completion-checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `week-${weekNumber}-complete`;
        checkbox.checked = progress.completedWeeks.includes(weekNumber);
        checkbox.setAttribute('aria-label', `Mark week ${weekNumber} as complete`);

        const label = document.createElement('label');
        label.htmlFor = `week-${weekNumber}-complete`;
        label.textContent = 'Complete';

        checkbox.addEventListener('change', function(e) {
            e.stopPropagation();
            toggleWeekCompletion(weekNumber, this.checked);
        });

        container.appendChild(checkbox);
        container.appendChild(label);

        return container;
    }

    /**
     * Toggle week completion status
     */
    function toggleWeekCompletion(weekNumber, isComplete) {
        if (isComplete) {
            if (!progress.completedWeeks.includes(weekNumber)) {
                progress.completedWeeks.push(weekNumber);
                progress.completedWeeks.sort((a, b) => a - b);
            }
        } else {
            progress.completedWeeks = progress.completedWeeks.filter(w => w !== weekNumber);
        }

        saveProgress();
        updateProgressDisplay();

        // Update schedule item visual state
        const item = document.querySelector(`.schedule-item:nth-child(${weekNumber})`);
        if (item) {
            if (isComplete) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
        }

        // Announce to screen readers
        const message = isComplete
            ? `Week ${weekNumber} marked as complete`
            : `Week ${weekNumber} marked as incomplete`;
        announceToScreenReader(message);
    }

    /**
     * Mark current week as visited (for tracking engagement)
     */
    function markCurrentWeekAsVisited() {
        const currentPath = window.location.pathname;
        const weekMatch = currentPath.match(/week(\d+)\.html/);

        if (weekMatch) {
            const weekNumber = parseInt(weekMatch[1], 10);
            markWeekAsVisited(weekNumber);
        }
    }

    /**
     * Mark a week as visited
     */
    function markWeekAsVisited(weekNumber) {
        progress.lastVisited = weekNumber;
        saveProgress();
    }

    /**
     * Update progress bar and stats display
     */
    function updateProgressDisplay() {
        const completedCount = progress.completedWeeks.length;
        const percentage = Math.round((completedCount / TOTAL_WEEKS) * 100);

        // Update progress bar
        const progressFill = document.getElementById('course-progress');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
            progressFill.setAttribute('aria-valuenow', percentage);
        }

        // Update completed weeks count
        const completedText = document.getElementById('completed-weeks');
        if (completedText) {
            completedText.textContent = completedCount;
        }

        // Add percentage to progress bar if > 0
        if (progressFill && percentage > 10) {
            progressFill.textContent = `${percentage}%`;
        }
    }

    /**
     * Get progress statistics
     */
    function getProgressStats() {
        return {
            completedWeeks: progress.completedWeeks.length,
            totalWeeks: TOTAL_WEEKS,
            percentage: Math.round((progress.completedWeeks.length / TOTAL_WEEKS) * 100),
            lastVisited: progress.lastVisited,
            startDate: progress.startDate,
            daysActive: progress.startDate
                ? Math.floor((new Date() - new Date(progress.startDate)) / (1000 * 60 * 60 * 24))
                : 0
        };
    }

    /**
     * Reset progress (for testing or user request)
     */
    function resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            progress = {
                completedWeeks: [],
                lastVisited: null,
                startDate: new Date().toISOString()
            };
            saveProgress();
            location.reload();
        }
    }

    /**
     * Export progress (for backup or portfolio)
     */
    function exportProgress() {
        const stats = getProgressStats();
        const exportData = {
            ...progress,
            exportDate: new Date().toISOString(),
            stats: stats
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `technofeminisms-progress-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Announce to screen readers
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

        setTimeout(function() {
            announcer.textContent = '';
        }, 1000);
    }

    // Expose functions for external use
    window.progressTracker = {
        getStats: getProgressStats,
        reset: resetProgress,
        export: exportProgress,
        markComplete: function(weekNumber) {
            toggleWeekCompletion(weekNumber, true);
        }
    };

})();
