# Micro Lab: Interactive Microeconomics (BMIS 235 HTML-4, Path 3)

**Live site:** [https://bmis235-html-4.arivas-oregelflore.workers.dev](https://bmis235-html-4.arivas-oregelflore.workers.dev)

**Author:** Arnie Rivas (`arivas-oregelflore`)

## Project overview
This site began as a Florence Day Trips project and was transformed into an interactive learning tool for microeconomics. It teaches supply and demand and compares perfect competition, monopoly and oligopoly using clickable diagrams.

## Path 3 documentation

### Learning goal
Understand how demand and supply determine price and output in different market structures, and see where every part of a graph comes from.

### Designed for how I learn
I learn best from visual diagrams. Each graph is interactive: a slider changes an input (demand shift, price, marginal cost), and clicking any curve, point or shaded area opens a step-by-step explanation of how it is calculated, using the current numbers.

### Pages
| File | Topic | Interactive parts |
|---|---|---|
| `index.html` | Supply and demand | Demand, supply, equilibrium, consumer and producer surplus |
| `pisa.html` | Perfect competition | P = MR, MC, ATC, profit-maximizing point, profit/loss, break-even |
| `siena.html` | Monopoly | Demand, MR, MC, monopoly point, profit, deadweight loss, competitive benchmark |
| `cinqueterre.html` | Oligopoly (Cournot duopoly) | Reaction curves, Nash equilibrium, cartel line and cartel point |

The original Florence file names were kept so links and deployment keep working.

### How it works
`script.js` contains one shared graph engine. Each page passes a `build(sliderValue)` function that returns the curves, points and areas plus the explanation text. The engine draws them as SVG, redraws when the slider moves, and shows the explanation of whichever part is selected. Everything works with the keyboard (Tab, Enter or Space).

### Models used
- Supply and demand: D: P = 100 + a &minus; Q, S: P = 20 + Q
- Perfect competition: TC = 100 + 10Q + 0.25Q^2, so MC = 10 + 0.5Q
- Monopoly: P = 100 &minus; Q, MR = 100 &minus; 2Q, constant MC
- Oligopoly: Cournot duopoly with P = 100 &minus; (q1 + q2) and equal constant MC

### Requirements checklist
- Plain HTML, CSS and vanilla JavaScript only (no frameworks or libraries)
- Working multi-page navigation menu on every page
- Author info in an HTML comment, `<meta name="author" content="Arnie Rivas">`, and the footer on every page
- Responsive layout, light and dark mode, keyboard-accessible graphs

## Files
`index.html`, `pisa.html`, `siena.html`, `cinqueterre.html`, `styles.css`, `script.js`, `README.md`

## Run locally
Open `index.html` in a browser. No build step is needed.

## Deployment
Hosted on Cloudflare Workers at the live link above.
