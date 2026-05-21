# Amusy Entertainment Website

## IMPORTANT — How to run correctly

### Step 1: Stop any running server
Press `Ctrl+C` in your terminal to stop the old server.

### Step 2: Delete old build cache (critical!)
```bash
rm -rf .next
```

### Step 3: Install dependencies
```bash
npm install
```

### Step 4: Start development server
```bash
npm run dev
```

### Step 5: Open in browser
- Main site:    http://localhost:3000
- Register:     http://localhost:3000/register
- About Us:     http://localhost:3000/about
- Privacy:      http://localhost:3000/privacy
- Terms:        http://localhost:3000/terms

---

## Pages included
- `/`          — Main homepage
- `/register`  — Partner With Us / Register Store form
- `/about`     — About Amusy Entertainment
- `/privacy`   — Privacy Policy
- `/terms`     — Terms of Service

## What's new in this version (v14)
- Navbar: bigger height, blur backdrop, "Contact Us" ghost button, "Register Store →" pink CTA
- "Contact" removed from nav links — replaced by dedicated buttons
- Video carousel: no white gradient, consistent stacked rotations
- 4 new pages: Register, About, Privacy, Terms
- Dark brown text palette
- Brush highlight SVG animations on headings
- Scribble deco above section headings
