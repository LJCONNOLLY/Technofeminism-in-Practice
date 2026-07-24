# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Technofeminisms in Practice** is an interactive, web-based syllabus for a graduate seminar exploring the intersection of feminist theory and technology practice. The project is built with HTML, CSS, and vanilla JavaScript, designed to be deployed on GitHub Pages.

**Key Principle**: This is not just a syllabus about technofeminism—it IS technofeminist in its design. Every technical decision embodies principles of accessibility, inclusivity, transparency, and collaboration.

## Technology Stack

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Custom properties, Grid, Flexbox, responsive design
- **Vanilla JavaScript**: No frameworks/libraries for simplicity and accessibility
- **LocalStorage**: Client-side progress tracking (no backend needed)
- **GitHub Pages**: Static site hosting

**No build process required** — all files can be edited directly and deployed immediately.

## Architecture

### File Structure

```
/
├── index.html                    # Home page (course description, objectives, AI policy)
├── schedule.html                 # Weekly Schedule page (ordered list of all 15 weeks + progress tracker)
├── requirements.html             # Course Requirements & Grading page (rubric, late policy, grading scale)
├── weeks/                        # 15 unit (week) pages
│   ├── week01.html through week15.html
├── css/
│   ├── main.css                  # Core styles, color system, sidebar-nav/column layout, typography
│   ├── accessibility.css         # Accessibility features (themes, contrast)
│   └── modules.css              # Reusable content components (readings, glossary terms, callouts)
├── js/
│   ├── navigation.js             # Smooth scroll, keyboard shortcuts, back-to-top
│   ├── pagination.js             # Left/Right arrow key navigation between week pages
│   ├── progress-tracker.js       # LocalStorage-based progress tracking (schedule.html)
│   └── accessibility-controls.js # Theme toggle, font size, high contrast
├── resources/
│   ├── glossary.html            # Technofeminist terminology
│   ├── readings.html            # Complete reading list
│   └── collaboration.html       # Collaboration tools guide
├── assets/                      # Images, data, embeds (placeholders)
├── README.md                    # Project documentation
└── CLAUDE.md                    # This file
```

**Site structure**: the layout (subtitle bar + left sidebar nav + single content column, with unit pages using bottom prev/next pagination) is adapted from the [gh-syllabus](https://github.com/jan-martinek/gh-syllabus) template structure, recolored with this project's purple/pink/black/white palette. Site navigation lives in `.sidebar-nav` on every page (Home, Weekly Schedule, Course Requirements, Readings, Glossary, Collaborate) — there is no single-page landing grid anymore; each top-level page is its own file.

### Design System

**Color Palette** (defined in `css/main.css` CSS custom properties):
- `--color-primary`: #6B4E9C (deep purple)
- `--color-secondary`: #D4758A (warm rose)
- `--color-accent`: #F4A261 (warm orange)
- Theme-specific colors for algorithmic bias, infrastructure, and project weeks

**Typography**:
- Primary font: Georgia (serif) for headings
- Secondary font: System font stack for body text
- Base size: 18px, adjustable via accessibility controls

**Spacing System**: Consistent spacing scale using CSS custom properties
(`--spacing-xs` through `--spacing-xl`)

### Key Features

1. **Accessibility-First**:
   - WCAG 2.1 AA compliant
   - Keyboard navigation (Tab, Arrow keys, Escape, Alt shortcuts)
   - Screen reader friendly (ARIA labels, semantic HTML, live regions)
   - Dark/light mode with system preference detection
   - Adjustable font sizes (normal/large/xlarge)
   - High contrast mode
   - Reduced motion support

2. **Progress Tracking**:
   - Tracks completed weeks via LocalStorage
   - Visual progress bar on homepage
   - Completion checkboxes on week cards
   - Export/reset functionality

3. **Non-Linear Navigation**:
   - Students can access any week
   - Multiple pathways through content
   - Back-to-top button for long pages

4. **Responsive Design**:
   - Mobile-first approach
   - Breakpoints at 768px and 480px
   - Touch-friendly button sizes on mobile

## Common Development Tasks

### Adding a New Week

1. Copy an existing week file: `cp weeks/week14.html weeks/week16.html`
2. Update the week number, date, title, and content in the new file (including `data-prev-url`/`data-next-url` on `<body>`)
3. Add the week to the ordered list in `schedule.html`
4. Update previous/next pagination links in adjacent week files
5. Update `TOTAL_WEEKS` in `js/progress-tracker.js` and the week count text in `schedule.html`

### Modifying the Color Scheme

Edit CSS custom properties in `/css/main.css` starting around line 20:
```css
:root {
    --color-primary: #6B4E9C;
    --color-secondary: #D4758A;
    /* etc. */
}
```

Dark mode overrides are in `body.dark-mode` block (line ~55).

### Embedding Collaboration Tools

Collaboration tool links are placeholders (anchor tags with `href="#"`). To activate:

1. Create actual tools (Padlet, Google Docs, Miro, Google Forms)
2. Replace `href="#"` with actual URLs in:
   - `index.html` (collaboration section, ~line 245)
   - Individual week pages (in discussion/activity sections)
   - `resources/collaboration.html`

**Example**:
```html
<!-- Before -->
<a href="#" class="btn btn-primary">Access Padlet</a>

<!-- After -->
<a href="https://padlet.com/username/week1-reflections" class="btn btn-primary">Access Padlet</a>
```

### Adding Interactive Elements

Interactive elements (timelines, data visualizations, branching narratives) are currently placeholders marked with:
```html
<div class="embed-placeholder">
    [Description of interactive element]
</div>
```

To add actual interactives:
1. Create HTML/JS visualization or use embed code
2. Replace placeholder `<div>` with actual content
3. If using external tool (e.g., Flourish, Timeline JS), use iframe embed
4. Ensure embedded content is accessible (keyboard navigable, screen reader compatible)

### Testing Accessibility

**Manual Testing Checklist**:
- [ ] Keyboard navigation (Tab through all interactive elements)
- [ ] Screen reader (test with NVDA/JAWS/VoiceOver)
- [ ] Dark mode toggle works
- [ ] Font size controls work
- [ ] High contrast mode works
- [ ] Mobile responsive at 768px and 480px widths
- [ ] Focus indicators visible
- [ ] Color contrast ratios meet WCAG AA (4.5:1 for text)

**Automated Tools**:
- Lighthouse accessibility audit (in Chrome DevTools)
- WAVE browser extension
- axe DevTools

### Deploying to GitHub Pages

1. Ensure all files are committed
2. Push to GitHub: `git push origin main`
3. In GitHub repo: Settings > Pages
4. Source: Deploy from branch `main`, directory `/` (root)
5. Site will be live at `https://[username].github.io/[repo-name]/`

**Note**: First deployment may take a few minutes. Subsequent updates are faster.

## JavaScript Architecture

### navigation.js
- **Smooth scrolling** for anchor links
- **Active nav states** based on scroll position (throttled for performance)
- **Keyboard shortcuts**: Alt+S (skip to content), Alt+M (jump to modules)
- **Arrow key navigation** for module cards
- **Back-to-top button** (appears after scrolling 500px)

### progress-tracker.js
- **LocalStorage schema**: `techfem-progress` key stores JSON:
  ```json
  {
    "completedWeeks": [1, 2, 5],
    "lastVisited": 5,
    "startDate": "2025-01-01T00:00:00.000Z"
  }
  ```
- **Completion tracking**: Checkboxes on module cards
- **Progress bar**: Dynamically updated on homepage
- **Export/reset functions**: Available via `window.progressTracker` API

### accessibility-controls.js
- **Theme persistence**: Stores in LocalStorage, respects `prefers-color-scheme`
- **Font size**: Three levels (normal, large, xlarge) stored per session
- **High contrast**: Adds CSS class to body
- **Keyboard shortcuts**: Alt+T (theme), Alt+Plus (larger), Alt+Minus (smaller), Alt+C (contrast)
- **Screen reader announcements**: Uses ARIA live region

## Content Guidelines

### Course Content Philosophy

- **Max 3 readings per week** (per user requirements)
- **Prioritize podcasts/audiobooks** for accessibility
- **Multimodal assignment options** (text, audio, video, zine)
- **Graduate level** assumes background in feminism and intersectionality
- **Weeks 1 and 15 are "light"** for semester rhythm

### Reading Citations

Use consistent citation format:
```
Author, Name (Year). "Article Title." Journal/Book, Volume(Issue), Pages.
```

### Assignment Design

All assignments should offer multiple format options:
- Written (with page count)
- Audio (with time length)
- Video (with time length)
- Visual/creative (with description)

### Inclusive Language

- Use "students" not "users"
- Avoid gendered language ("they" not "he/she")
- Center marginalized perspectives in examples
- Acknowledge land/labor in footer

## Troubleshooting

### Progress Not Saving
- Check browser LocalStorage is enabled
- Look for JavaScript errors in console
- Verify `progress-tracker.js` is loaded

### Styles Not Applying
- Ensure CSS files are linked in correct order:
  1. `main.css`
  2. `accessibility.css`
  3. `modules.css` (for week pages)
- Check browser cache (hard refresh: Ctrl+Shift+R)

### Mobile Layout Issues
- Test at exact breakpoints: 768px, 480px
- Check for hardcoded widths that override responsive grid
- Verify viewport meta tag in `<head>`

### JavaScript Not Running
- Check browser console for errors
- Ensure scripts are loaded at end of `<body>`, in order:
  1. `navigation.js`
  2. `progress-tracker.js`
  3. `accessibility-controls.js`

## Future Enhancements

Potential additions (not currently implemented):
- Actual interactive data visualizations (e.g., D3.js charts for Gender Shades data)
- Branching narrative for Week 10 (could use Twine or custom JS)
- Timeline visualization for Week 2 (could use Timeline JS)
- Student project gallery page
- Instructor dashboard for viewing aggregated (anonymized) progress

## Credits & Attribution

This syllabus design credits feminist scholars whose work forms the foundation:
- Donna Haraway
- Safiya Umoja Noble
- Ruha Benjamin
- Virginia Eubanks
- Joy Buolamwini
- Sasha Costanza-Chock
- Legacy Russell
- Mar Hicks
- And many others

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

## Notes for Future Development

When extending this project:
- Maintain WCAG AA accessibility
- Test with actual students for usability
- Keep no-build-process approach for accessibility
- Document any new dependencies
- Update this file with new patterns/conventions
