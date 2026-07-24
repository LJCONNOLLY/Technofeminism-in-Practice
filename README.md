# Technofeminisms in Practice: Interactive Syllabus

An interactive, accessible, web-based syllabus for a graduate seminar on technofeminism. This project demonstrates how course materials can be designed with feminist principles: accessible, non-hierarchical, collaborative, and transparent.

## 🌟 Features

- **15-Week Interactive Curriculum** covering feminist STS, algorithmic bias, embodied interaction, data colonialism, and design justice
- **Two-Track Signature Project** (Critical Platform Audit or Feminist Platform Design with Claude Code)
- **Accessibility-First Design** with WCAG 2.1 AA compliance, dark/light modes, keyboard navigation, and screen reader support
- **Progress Tracking** using localStorage to monitor student completion
- **Collaborative Learning Spaces** with embedded tools (Padlet, Google Docs, Miro, Google Forms)
- **Responsive Design** works on desktop, tablet, and mobile devices
- **Open Source** under Creative Commons BY-NC-SA 4.0

## 📁 Project Structure

```
/
├── index.html              # Home page (course description, objectives, AI policy)
├── schedule.html           # Weekly Schedule page (ordered list of all 15 weeks)
├── requirements.html       # Course Requirements & Grading page
├── weeks/                  # 15 unit (week) pages
│   ├── week01.html
│   ├── week02.html
│   └── ...
├── css/
│   ├── main.css           # Core styles: sidebar-nav + column layout, typography
│   ├── accessibility.css   # Accessibility features
│   └── modules.css        # Reusable content components
├── js/
│   ├── navigation.js       # Smooth scrolling, keyboard shortcuts, back-to-top
│   ├── pagination.js       # Left/Right arrow key navigation between weeks
│   ├── progress-tracker.js # LocalStorage-based progress
│   └── accessibility-controls.js # Theme, font size, contrast
├── resources/
│   ├── glossary.html      # Key terms and concepts
│   ├── readings.html      # Complete reading list
│   └── collaboration.html # Collaboration tools guide
├── assets/
│   ├── images/
│   ├── data/
│   └── embeds/
├── CLAUDE.md              # Development guidance
└── README.md              # This file
```

The layout (subtitle bar, left sidebar nav, single content column, unit pages with prev/next pagination) is adapted from the [gh-syllabus](https://github.com/jan-martinek/gh-syllabus) template structure, recolored with this project's purple/pink/black/white palette.

## 🚀 Getting Started

### Viewing the Site

1. Clone this repository
2. Open `index.html` in a web browser
3. Navigate using the sidebar nav (Home, Weekly Schedule, Course Requirements, Readings, Glossary, Collaborate)

### For Instructors: Customizing the Syllabus

1. **Update Readings**: Edit reading lists in each `weeks/weekXX.html` file
2. **Add Collaboration Tools**:
   - Create Padlet boards, Google Docs, Miro boards
   - Replace placeholder links in week pages and `resources/collaboration.html`
3. **Modify Content**: All content is in standard HTML files—edit directly
4. **Add Resources**: Expand `resources/glossary.html` and `resources/readings.html`
5. **Configure Uploads**: Set up Google Forms with file upload for multimodal reflections

### Deploying to GitHub Pages

1. Push repository to GitHub
2. Go to Settings > Pages
3. Select branch (usually `main`) and root directory
4. Site will be published at `https://[username].github.io/[repository-name]/`

## 🎨 Design Principles

This syllabus embodies technofeminist design principles:

### Accessibility
- **WCAG 2.1 AA compliant** with proper heading hierarchy, ARIA labels, alt text
- **Dark/light mode** toggle respects system preferences
- **Adjustable font sizes** (normal, large, x-large)
- **High contrast mode** for visual accessibility
- **Keyboard navigation** throughout, including arrow key navigation for modules
- **Screen reader friendly** with proper semantic HTML and announcements
- **Reduced motion** support for users with vestibular disorders

### Inclusivity
- **Multiple format options** for all assignments (text, audio, video, visual)
- **Non-stereotyped color palette** avoiding gendered color associations
- **Colorblind-friendly** with patterns/shapes in addition to color
- **Mobile-responsive** acknowledges diverse device access

### Non-Hierarchical
- **Non-linear navigation** allows students to explore in their own order
- **Multiple entry points** to content
- **Peer collaboration** emphasized over instructor-centrism

### Transparency
- **Open source code** visible on GitHub
- **Clear data practices** (what's stored in localStorage)
- **Visible labor** with credits and acknowledgments
- **No tracking** beyond local progress storage

## 🛠️ Technology Stack

- **HTML5** semantic markup
- **CSS3** with CSS Grid, custom properties, and responsive design
- **Vanilla JavaScript** (no frameworks) for maximum compatibility
- **LocalStorage** for client-side progress tracking
- **No build process** simple, direct deployment

## 📚 Course Content

### Week-by-Week Overview

1. **Week 1**: Introductions & Foundations (light)
2. **Week 2**: Haraway's Cyborgs & Situated Knowledges
3. **Week 3**: Standpoint Theory & Intersectionality
4. **Week 4**: Embodied Interaction & Interface Design
5. **Week 5**: Algorithms of Oppression
6. **Week 6**: Automating Inequality & Race After Technology
7. **Week 7**: Gender Shades
8. **Week 8**: Design Justice (in-class design/audit workshop)
9. **Week 9**: Glitch Feminism & Programmed Inequality
10. **Week 10**: Platform Capitalism & Gendered Labor
11. **Week 11**: Data Colonialism & Surveillance (Signature Project Proposal due)
12. **Week 12**: AI Ethics & Accountability (branching scenario activity)
13. **Week 13**: One-on-One Conferences
14. **Week 14**: Presenting Findings (Presentation & Peer Feedback due)
15. **Week 15**: Building Technofeminist Futures (light; Final Signature Project & Reflection due)

### Signature Project

A single semester-long project with two tracks: **Critical Platform Audit** (a theoretical audit of an existing platform or algorithm) or **Feminist Platform Design** (a working prototype built with Claude Code).

### Key Theorists

Donna Haraway • Safiya Noble • Ruha Benjamin • Virginia Eubanks • Joy Buolamwini • Sasha Costanza-Chock • Legacy Russell • Mar Hicks

## 🔧 Customization Guide

### Changing Colors

Edit CSS custom properties in `/css/main.css`:

```css
:root {
    --color-primary: #B54FD1;
    --color-secondary: #E0487F;
    --color-accent: #F2A6D0;
    /* ... */
}
```

### Adding New Weeks

1. Copy an existing week HTML file (e.g., `week02.html`)
2. Update week number, title, and content
3. Add link to `index.html` modules grid
4. Update navigation links in adjacent weeks

### Embedding Collaboration Tools

Replace placeholder links with actual URLs:
- **Padlet**: Create boards at padlet.com
- **Google Docs**: Share with "Anyone with link can edit"
- **Miro**: Generate shareable board link
- **Google Forms**: Create form with file upload enabled

## 🤝 Contributing

This is an educational resource designed to be adapted and improved. Suggestions for:
- Additional readings or resources
- Accessibility improvements
- Interactive elements
- Case studies
- Bug fixes

...are welcome! Please open an issue or submit a pull request.

## 📄 License

This work is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

You are free to:
- **Share** — copy and redistribute the material
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — give appropriate credit
- **NonCommercial** — not for commercial purposes
- **ShareAlike** — distribute under same license

## 🙏 Acknowledgments

This syllabus builds on the intellectual labor of feminist scholars, activists, and practitioners who have shaped technofeminist thought and practice. Deep gratitude to the theorists, organizers, and communities whose work makes this possible.

## 📞 Contact

For questions about using or adapting this syllabus, please open an issue on GitHub.

---

**Built with feminist principles: accessible, inclusive, collaborative, and transparent.**
