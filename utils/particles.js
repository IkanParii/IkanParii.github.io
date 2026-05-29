class Bubble {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.reset(true);
  }

  reset(initial = false) {
    this.radius = 2 + Math.random() * 7.5;
    this.depth = Math.random();
    this.x = Math.random() * this.width;
    this.y = initial ? Math.random() * this.height : this.height + this.radius * 2;
    this.baseX = this.x;
    this.speed = 0.35 + Math.random() * 1.05;
    this.floatSpeed = this.speed * (0.45 + this.depth * 0.95);
    this.wobble = 0.012 + Math.random() * 0.03;
    this.phase = Math.random() * Math.PI * 2;
    this.opacity = 0.08 + Math.random() * 0.26;
    this.glow = Math.random() > 0.65;
  }

  update(width) {
    this.phase += this.wobble;
    this.y -= this.floatSpeed;
    this.x = this.baseX + Math.sin(this.phase) * (3 + this.radius * 0.5);

    if (this.x < -24) this.baseX = width + 24;
    if (this.x > width + 24) this.baseX = -24;

    if (this.y < -this.radius * 4) {
      this.reset(false);
      this.baseX = Math.random() * width;
    }
  }
}

class Fish {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.reset(true);
  }

  reset(initial = false) {
    this.size = 7 + Math.random() * 12;
    this.depth = Math.random();
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.speed = 0.22 + Math.random() * 0.65;
    this.x = initial
      ? Math.random() * this.width
      : this.direction > 0
        ? -this.size * 5
        : this.width + this.size * 5;
    this.y = Math.random() * this.height * 0.22 + this.height * 0.03;
    this.baseY = this.y;
    this.wobble = 0.01 + Math.random() * 0.016;
    this.phase = Math.random() * Math.PI * 2;
    this.bodyColor = Math.random() > 0.5 ? [20, 184, 166] : [6, 182, 212];
    this.alpha = 0.04 + Math.random() * 0.1;
  }

  update(width) {
    this.phase += this.wobble;
    this.x += this.speed * this.direction;
    this.y = this.baseY + Math.sin(this.phase) * (2 + this.size * 0.06);

    if (this.direction > 0 && this.x > width + this.size * 6) {
      this.reset(false);
    } else if (this.direction < 0 && this.x < -this.size * 6) {
      this.reset(false);
    }
  }
}

function drawBubble(ctx, bubble) {
  const size = bubble.radius;
  const alpha = bubble.opacity * (0.72 + (1 - bubble.depth) * 0.28);

  ctx.save();
  ctx.translate(bubble.x, bubble.y);

  const gradient = ctx.createRadialGradient(
    -size * 0.35,
    -size * 0.45,
    0,
    0,
    0,
    size
  );

  gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.82})`);
  gradient.addColorStop(0.52, `rgba(125, 211, 252, ${alpha * 0.34})`);
  gradient.addColorStop(1, `rgba(6, 182, 212, ${alpha * 0.14})`);

  ctx.beginPath();
  ctx.arc(0, 0, size, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.lineWidth = Math.max(0.55, size * 0.14);
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.72})`;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(-size * 0.28, -size * 0.3, Math.max(0.7, size * 0.18), 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
  ctx.fill();

  if (bubble.glow) {
    ctx.beginPath();
    ctx.arc(0, 0, size * 1.6, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(125, 211, 252, ${alpha * 0.14})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.restore();
}

function drawFish(ctx, fish) {
  const size = fish.size;
  const alpha = fish.alpha * (0.78 + (1 - fish.depth) * 0.22);
  const [r, g, b] = fish.bodyColor;

  ctx.save();
  ctx.translate(fish.x, fish.y);
  ctx.scale(fish.direction, 1);

  const bodyGrad = ctx.createLinearGradient(-size * 1.8, 0, size * 1.8, 0);
  bodyGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
  bodyGrad.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
  bodyGrad.addColorStop(0.58, `rgba(255, 255, 255, ${alpha * 0.6})`);
  bodyGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${alpha * 0.28})`);

  ctx.beginPath();
  ctx.ellipse(0, 0, size * 1.3, size * 0.74, 0, 0, Math.PI * 2);
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-size * 1.45, 0);
  ctx.lineTo(-size * 2.2, -size * 0.68);
  ctx.lineTo(-size * 2.05, 0);
  ctx.lineTo(-size * 2.2, size * 0.68);
  ctx.closePath();
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.42})`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(size * 0.68, -size * 0.08, Math.max(0.5, size * 0.08), 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.82})`;
  ctx.fill();

  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.1})`;
  ctx.lineWidth = Math.max(0.4, size * 0.045);
  ctx.beginPath();
  ctx.moveTo(-size * 1.05, 0);
  ctx.lineTo(size * 0.92, 0);
  ctx.stroke();

  ctx.restore();
}

export function initParticles(canvas) {
  if (!canvas) return () => {};

  const ctx = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let bubbles = [];
  let fish = [];
  let rafId = 0;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  const init = () => {
    const bubbleCount = reducedMotion ? 22 : width < 768 ? 40 : 68;
    const fishCount = reducedMotion ? 2 : width < 768 ? 4 : 7;

    bubbles = Array.from({ length: bubbleCount }, () => new Bubble(width, height));
    fish = Array.from({ length: fishCount }, () => new Fish(width, height));

    bubbles.forEach((item) => {
      item.x = Math.random() * width;
      item.y = Math.random() * height;
      item.baseX = item.x;
      item.radius = 2.2 + Math.random() * 7.5;
      item.opacity = 0.1 + Math.random() * 0.2;
    });

    fish.forEach((item, index) => {
      item.x = Math.random() * width;
      item.y = height * (0.04 + Math.random() * 0.16);
      item.baseY = item.y;
      item.speed = 0.12 + Math.random() * 0.35;
      item.size = 6 + Math.random() * 10;
      item.alpha = 0.04 + Math.random() * 0.09;
      item.bodyColor = index % 2 === 0 ? [6, 182, 212] : [20, 184, 166];
    });
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    [...bubbles]
      .sort((a, b) => a.depth - b.depth)
      .forEach((item) => {
        item.update(width);
        drawBubble(ctx, item);
      });

    // Fish stay near the top only.
    [...fish]
      .sort((a, b) => a.depth - b.depth)
      .forEach((item) => {
        if (item.y > height * 0.24) {
          item.y = height * (0.04 + Math.random() * 0.16);
          item.baseY = item.y;
        }
        item.update(width);
        drawFish(ctx, item);
      });

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
