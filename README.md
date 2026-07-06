# dev.log — Portfolio

A terminal/console-themed portfolio for a junior frontend developer, built with plain HTML, CSS, and JS (no build step required).

## Structure
```
devlog-portfolio/
├── index.html   → page markup
├── style.css    → all styling (design tokens in :root at the top)
├── script.js    → interactivity (see "Features" below)
└── README.md    → this file
```

## Features
- **Live "props" demo** in the hero — toggle variant / size / radius and watch the button and the code snippet below it update in real time.
- **Scroll-spy navigation** — the nav bar highlights whichever section you're currently viewing.
- **Pausable skills marquee** — stops scrolling on hover so it's readable.
- **Working contact form** — submits by opening the visitor's email client (`mailto:`) pre-filled with their message. No backend needed to launch.
- **Click-to-copy** — clicking your email/GitHub/LinkedIn/Twitter row in the contact panel copies it to the clipboard.
- Respects `prefers-reduced-motion`, uses semantic HTML, and all interactive elements are keyboard-focusable.

## Before you publish — replace these placeholders
| Where | What to change |
|---|---|
| `index.html` `<title>` and meta tags | Your name / description |
| Ticker bar | `[Your City]`, `[Month Year]` |
| Hero | "Your Name" in the sub-paragraph |
| README.md section | Bio paragraphs, timezone |
| Selected work | 3 project cards — name, description, tags, metric, links |
| Contact panel | `you@email.com`, GitHub/LinkedIn/Twitter handles, résumé link |
| `script.js` | The `you@email.com` inside the `mailto:` line |
| Footer | "Your Name" |
| Favicon | Currently a placeholder emoji data-URI — swap for a real `favicon.ico` or `.svg` |

## Upgrading the contact form (optional)
Right now, submitting the form just opens the visitor's email app — reliable, but it depends on them having one configured. If you'd rather receive messages directly without that step, connect a form service instead:
- **[Formspree](https://formspree.io)** — add `action="https://formspree.io/f/yourFormId"` and `method="POST"` to the `<form>` tag, remove the JS `preventDefault` logic.
- **[EmailJS](https://www.emailjs.com)** — send straight from client-side JS with their SDK, no server needed.

## Preview locally
Open `index.html` directly in a browser, or in VS Code install the **Live Server** extension and click "Go Live" for hot reload while editing.

## Deploy
Drag this folder into **Netlify** or **Vercel**, or push it to a GitHub repo and enable **GitHub Pages** — all free for a static site like this.
# My-portfolio
