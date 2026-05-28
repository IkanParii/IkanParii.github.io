class Particle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * this.width;
    this.y = initial ? Math.random() * this.height : this.height + 10;
    this.radius = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = -(Math.random() * 0.35 + 0.1);
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.6 ? "#14b8a6" : "#06b6d4";
  }

  update(width) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y < -5) {
      this.reset(false);
    }

    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }
  }
}

export function initParticles(canvas) {
  if (!canvas) return () => {};

  const ctx = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = 0;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  const init = () => {
    const count = reducedMotion ? 24 : width < 768 ? 40 : 80;
    particles = Array.from({ length: count }, () => new Particle(width, height));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 1;

    for (const particle of particles) {
      particle.update(width);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
    }

    if (!reducedMotion) {
      rafId = window.requestAnimationFrame(draw);
    }
  };

  const handleResize = () => {
    resize();
    init();
  };

  resize();
  init();

  if (!reducedMotion) {
    rafId = window.requestAnimationFrame(draw);
  }

  window.addEventListener("resize", handleResize);

  return () => {
    window.cancelAnimationFrame(rafId);
    window.removeEventListener("resize", handleResize);
  };
}
