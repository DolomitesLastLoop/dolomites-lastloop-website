/**
 * Cinematic scroll animations — GSAP + ScrollTrigger + Lenis.
 *
 * Central orchestration: components carry only markup + data attributes,
 * all triggers are created here in page order (top → bottom).
 *
 * Guards:
 *  - Admin pages: no smooth scroll, no animations.
 *  - prefers-reduced-motion: nothing runs, content stays fully visible
 *    (components must never hide content via CSS — GSAP `from()` only).
 *  - Mobile (<900px): simple fade-ins only, no parallax/scrub/particles.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

const isAdmin = window.location.pathname.startsWith("/admin");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!isAdmin && !reduceMotion) {
  init();
}

function init() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // ── Lenis smooth scroll, driven by GSAP's ticker ──
  const lenis = new Lenis({ autoRaf: false, anchors: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;

  const mm = gsap.matchMedia();
  mm.add("(min-width: 900px)", () => {
    heroIntro(true);
    heroScroll();
    fullBleedParallax();
    storyReveal(true);
    loopCircles();
  });
  mm.add("(max-width: 899px)", () => {
    heroIntro(false);
    storyReveal(false);
  });

  marquee();
}

/* ── 1. Hero: title rises in (desktop with blur) ── */
function heroIntro(withBlur: boolean) {
  const title = document.querySelector<HTMLElement>("[data-hero-title]");
  if (!title) return;
  gsap.from(title, {
    autoAlpha: 0,
    y: withBlur ? 60 : 24,
    filter: withBlur ? "blur(14px)" : "none",
    duration: 1.3,
    ease: "power3.out",
    delay: 0.15,
    clearProps: "all",
  });
}

/* ── 1b. Hero: slow zoom-out + dissolving overlay while scrolling away ── */
function heroScroll() {
  const hero = document.querySelector<HTMLElement>(".hero");
  const stage = hero?.querySelector<HTMLElement>(".hero-stage");
  if (!hero || !stage) return;

  const st = {
    trigger: hero,
    start: "top top",
    end: "bottom top",
    scrub: true,
  };
  gsap.fromTo(stage, { scale: 1.15 }, { scale: 1, yPercent: 12, ease: "none", scrollTrigger: st });
  gsap.to(hero.querySelector(".hero-overlay"), { opacity: 0.3, ease: "none", scrollTrigger: st });
}

/* ── 2. Full-bleed images: depth parallax ── */
function fullBleedParallax() {
  gsap.utils.toArray<HTMLElement>("[data-fb-parallax]").forEach((stage) => {
    gsap.fromTo(
      stage,
      { yPercent: 10 },
      {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: stage.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}

/* ── 3. StorySplit: lines slide in from the left, photo zooms out ── */
function storyReveal(desktop: boolean) {
  const story = document.querySelector<HTMLElement>(".story");
  if (!story) return;

  const heading = story.querySelector<HTMLElement>("h2");
  const lead = story.querySelector<HTMLElement>(".story-lead");
  const facts = gsap.utils.toArray<HTMLElement>(story.querySelectorAll(".fact"));
  const photo = story.querySelector<HTMLElement>(".story-photo img");

  if (!desktop) {
    [heading, lead, ...facts].forEach((el) => {
      if (!el) return;
      gsap.from(el, {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
    return;
  }

  // Line splitting needs final glyph metrics — wait for webfonts.
  document.fonts.ready.then(() => {
    const targets = [heading, lead].filter(Boolean) as HTMLElement[];
    targets.forEach((el) => {
      const split = SplitText.create(el, { type: "lines" });
      gsap.from(split.lines, {
        autoAlpha: 0,
        x: -48,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    });
    gsap.from(facts, {
      autoAlpha: 0,
      x: -32,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: { trigger: facts[0], start: "top 85%", once: true },
    });
    ScrollTrigger.refresh();
  });

  if (photo) {
    gsap.fromTo(
      photo,
      { scale: 1.12 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: story, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }
}

/* ── 5. Loop circle: draws itself while scrolling through ── */
function loopCircles() {
  gsap.utils.toArray<SVGCircleElement>("[data-loop-draw]").forEach((circle) => {
    // pathLength="1" → dashoffset 1 = unsichtbar, 0 = voll gezeichnet.
    // Als Attribut animieren: CSS stroke-dashoffset interpoliert hier nicht zuverlässig.
    gsap.fromTo(
      circle,
      { attr: { "stroke-dashoffset": 1 } },
      {
        attr: { "stroke-dashoffset": 0 },
        ease: "none",
        scrollTrigger: {
          trigger: circle.closest("[data-loop-circle]"),
          start: "top 90%",
          end: "center center",
          scrub: 0.5,
        },
      },
    );
  });
}

/* ── 6. Marquee: GSAP-driven loop, speeds up with scroll velocity ── */
function marquee() {
  const tracks = gsap.utils.toArray<HTMLElement>(".marquee .track");
  if (!tracks.length) return;

  const tweens = tracks.map((track) => {
    const reverse = track.classList.contains("track-reverse");
    return gsap.fromTo(
      track,
      { xPercent: reverse ? -25 : 0 },
      { xPercent: reverse ? 0 : -25, duration: reverse ? 38 : 32, ease: "none", repeat: -1 },
    );
  });

  let speed = 1;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      speed = Math.max(speed, gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 500));
    },
  });
  gsap.ticker.add(() => {
    speed += (1 - speed) * 0.04; // ease back to normal speed
    tweens.forEach((t) => t.timeScale(speed));
  });
}
