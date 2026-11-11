import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  fill: string;
}

// Purple/blue palette, alpha applied per particle (15–25%)
const COLORS: [number, number, number][] = [
  [138, 43, 226],
  [75, 0, 130],
  [72, 61, 139],
  [123, 104, 238],
  [106, 90, 205],
];

/**
 * Decorative rising bubbles behind the hero.
 * Perf: capped particle count, precomputed colors, starts after the page is idle,
 * pauses when the hero is off-screen or the tab is hidden, and is skipped entirely
 * for users who prefer reduced motion.
 */
const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isSmall = window.innerWidth < 768;
    const MAX = isSmall ? 18 : 36;
    const SPAWN = isSmall ? 0.06 : 0.1;

    const particles: Particle[] = [];
    let animationId = 0;
    let running = false;
    let visible = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticle = (anywhere = false) => {
      const [r, g, b] = COLORS[(Math.random() * COLORS.length) | 0];
      const alpha = Math.random() * 0.1 + 0.15;
      particles.push({
        x: Math.random() * canvas.width,
        y: anywhere ? Math.random() * canvas.height : canvas.height + Math.random() * 50,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.8 + 0.3),
        size: Math.random() * 22 + 8,
        fill: `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`,
      });
    };

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (particles.length < MAX && Math.random() < SPAWN) createParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -p.size || p.x < -p.size || p.x > canvas.width + p.size) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.fill;
        ctx.fill();
      }
      animationId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      animationId = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animationId);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const onVisibility = () => (document.hidden ? stop() : start());

    // Don't compete with first render: begin once the browser is idle.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const begin = () => {
      resize();
      for (let i = 0; i < Math.min(10, MAX); i++) createParticle(true);
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", onVisibility);
      observer.observe(canvas);
      start();
    };
    const idleHandle = w.requestIdleCallback ? w.requestIdleCallback(begin, { timeout: 2500 }) : window.setTimeout(begin, 1200);

    return () => {
      stop();
      if (w.requestIdleCallback && "cancelIdleCallback" in window) {
        (window as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(idleHandle);
      } else {
        clearTimeout(idleHandle);
      }
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticlesBackground;
