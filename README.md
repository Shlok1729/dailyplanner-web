# DailyPlanner — Your Personal Focus Assistant 🗓️✨

Hey there! Thanks for checking out **DailyPlanner**. I built this web app because I was tired of overly complicated productivity tools. I just wanted something clean, intuitive, and genuinely helpful for planning my day, blocking out distractions, and actually getting things done.

What started as a simple idea has evolved into a premium, interactive landing page showcasing an AI-powered scheduling tool. The design heavily emphasizes a **mobile-first, minimalist aesthetic** inspired by modern high-end apps—complete with buttery-smooth scrolling, smart micro-interactions, and a distraction-free environment.

---

## 🚀 What Makes It Special?

I poured a lot of love into the details here. Here's what you'll find:

- 🎨 **Premium Aesthetic:** A clean, high-fidelity UI with glassmorphism elements, sleek phone notch layouts, and smooth scroll reveals (powered by GSAP).
- 📱 **Interactive App Demo:** Instead of boring static screenshots, there's a fully functional phone mockup right on the page. On desktop, it sticks to the center of the screen while features seamlessly scroll by. On mobile, it acts as a direct, tap-and-play interactive demo.
- 💬 **Simulated AI Assistant:** I've integrated a smart chat interface that demonstrates how the AI scheduling assistant works natively in the browser without needing a live backend API.
- ⚡ **Lightning Fast:** Built entirely with vanilla HTML, CSS, and JavaScript. No heavy frameworks holding it back—just pure, highly optimized code.

---

## 🛠️ The Tech Behind It

I kept the stack intentionally simple to ensure maximum performance and easy maintainability:

- **HTML5 & CSS3** (Vanilla, with modern flexbox/CSS Grid layouts and custom properties)
- **Vanilla JavaScript** (For intersection observers, dynamic DOM manipulation, and interactive state management)
- **Lenis** (For that incredibly smooth, buttery scrolling experience)
- **GSAP** (For precise timeline animations and scroll reveals)

---

## 📂 Project Structure

```text
dailyplanner-web/
├── public/                 # Static brand assets, images, and manifest
│   ├── logo.png
│   ├── hero-bg.png
│   ├── trending-routines.jpg
│   ├── developer.jpeg
│   ├── founder.jpeg
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout, fonts, and meta tags
│   │   ├── page.tsx        # Main interactive landing page
│   │   ├── globals.css     # Design system, glassmorphism & phone mockup CSS
│   │   ├── about/          # /about route
│   │   ├── how-to-use/     # /how-to-use route
│   │   ├── blog/           # /blog and /blog/[slug] routes
│   │   ├── privacy/        # /privacy route
│   │   └── terms/          # /terms route
│   └── components/
│       ├── InteractiveDemo.tsx  # Simulated mobile app (Pomodoro, AI chat, tasks)
│       ├── Navbar.tsx           # Responsive navigation bar
│       ├── Footer.tsx           # Footer with links & branding
│       ├── CustomCursor.tsx     # Smooth lag follower cursor
│       ├── BackgroundScene.tsx  # Ambient gradient morphing
│       ├── SmoothScroll.tsx     # Lenis smooth scrolling provider
│       ├── FaqSection.tsx       # Interactive FAQ accordion
│       └── ReviewsMarquee.tsx   # Continuous review marquee
├── package.json
├── tsconfig.json
└── next.config.mjs
```

---

## 🏃‍♂️ Want to run it locally?

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open the app:** Open your browser and navigate to `http://localhost:3000`.

To create an optimized production build:
```bash
npm run build && npm start
```

## 🤝 Let's Connect

I'm always looking to improve this project and my skills. If you have any feedback, spot a bug, or just want to chat about design and code, feel free to reach out!

**Daivik Reddy**  
GitHub: [@Daivik1520](https://github.com/Daivik1520)

---

*Made with 💜 in India.*
