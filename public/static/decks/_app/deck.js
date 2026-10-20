/* 讲解动画 · 渲染器（零依赖） */
(function () {
  "use strict";
  const DATA = JSON.parse(document.getElementById("deck-data").textContent);
  const slides = DATA.slides;
  const deck = document.getElementById("deck");
  const progress = document.querySelector("#progress i");
  const counter = document.getElementById("counter");
  const overview = document.getElementById("overview");
  let cur = 0;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 背景 canvas：确定性生成 ---------- */
  const bg = document.getElementById("bg");
  const ctx = bg.getContext("2d");
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hexToRgb(h) {
    const n = parseInt(h.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  let blobs = [];
  function initBg() {
    const rand = mulberry32(DATA.seed);
    const [r, g, b] = hexToRgb(DATA.accent);
    blobs = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const jitter = (rand() - 0.5) * 60;
      blobs.push({
        x: rand(), y: rand(),
        r: 0.18 + rand() * 0.3,
        hue: [r + jitter, g + jitter, b + jitter],
        a: 0.05 + rand() * 0.06,
        dx: (rand() - 0.5) * 0.00006,
        dy: (rand() - 0.5) * 0.00006,
        ph: rand() * Math.PI * 2,
      });
    }
  }
  function drawBg(t) {
    const w = (bg.width = innerWidth), h = (bg.height = innerHeight);
    const style = getComputedStyle(document.documentElement);
    ctx.fillStyle = style.getPropertyValue("--bg").trim() || "#f6f3ec";
    ctx.fillRect(0, 0, w, h);
    for (const b of blobs) {
      const x = (b.x + Math.sin(t * b.dx * 1000 + b.ph) * 0.08) * w;
      const y = (b.y + Math.cos(t * b.dy * 1000 + b.ph) * 0.08) * h;
      const rad = b.r * Math.min(w, h) * 1.6;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, rad);
      const [r, g, bl] = b.hue.map((v) => Math.max(0, Math.min(255, v)));
      grad.addColorStop(0, `rgba(${r | 0},${g | 0},${bl | 0},${b.a})`);
      grad.addColorStop(1, `rgba(${r | 0},${g | 0},${bl | 0},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }
    // 细点阵
    ctx.fillStyle = style.getPropertyValue("--line").trim() || "rgba(0,0,0,.08)";
    const gap = 56;
    for (let x = gap / 2; x < w; x += gap)
      for (let y = gap / 2; y < h; y += gap) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 7);
        ctx.fill();
      }
  }
  initBg();
  if (!reduceMotion) {
    let last = 0;
    (function loop(t) {
      if (!document.hidden && t - last > 66) { drawBg(t / 1000); last = t; }
      requestAnimationFrame(loop);
    })(0);
  } else drawBg(0);
  addEventListener("resize", () => drawBg(performance.now() / 1000));

  /* ---------- 幻灯片渲染 ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function homeHref() {
    // 构建期算好的相对路径：优先直达原文页
    return DATA.article || DATA.home + "index.html";
  }
  function render(slide, i) {
    const rev = (html, i0 = 0) => `<div class="rev" style="--i:${i0}">${html}</div>`;
    let inner = "";
    if (slide.type === "cover") {
      inner = `
        <div class="kicker rev" style="--i:0">${esc(slide.category)} · 讲解动画</div>
        <h1 class="rev" style="--i:1">${esc(slide.title)}</h1>
        <div class="rule"></div>
        <div class="meta rev" style="--i:2">${esc(slide.meta)}</div>
        <div class="hint">← → 翻页 · 点目录直达章节 · Esc 返回原文</div>`;
    } else if (slide.type === "toc") {
      const items = slide.items
        .map((t, j) => {
          const target = (slide.targets || [])[j]
          return `<button class="toc-item rev" style="--i:${j + 1}" data-target="${target ?? 1}"><span class="no">${String(j + 1).padStart(2, "0")}</span><span class="t">${esc(t)}</span><span class="go" aria-hidden="true">→</span></button>`
        })
        .join("");
      inner = `<div class="cap rev" style="--i:0">本篇脉络 · 点击章节直达</div><div class="toc-grid">${items}</div>${
        slide.more ? `<div class="toc-more rev" style="--i:${slide.items.length + 1}">…还有 ${slide.more} 节</div>` : ""}`;
    } else if (slide.type === "points") {
      const off = slide.kicker ? 2 : 1;
      const pts = slide.points
        .map((p, j) => `<div class="point rev" style="--i:${j + off}"><span class="dot"></span><span class="txt">${esc(p)}</span></div>`)
        .join("");
      inner = `${slide.kicker ? `<div class="kicker rev" style="--i:0">${esc(slide.kicker)}</div>` : ""}
        <h2 class="rev" style="--i:${slide.kicker ? 1 : 0}">${esc(slide.title)}</h2>
        <div class="points-list">${pts}</div>`;
    } else if (slide.type === "table") {
      const head = slide.headers.map((h) => `<th>${esc(h)}</th>`).join("");
      const rows = slide.rows
        .map((r, j) => `<tr class="rev" style="--i:${j + 1}">${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
        .join("");
      inner = `${slide.kicker ? `<div class="kicker rev" style="--i:0">${esc(slide.kicker)}</div>` : ""}
        <h2 class="rev" style="--i:0">${esc(slide.title)}</h2>
        <table class="tbl"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
    } else if (slide.type === "quote") {
      inner = `<blockquote class="rev" style="--i:0">${esc(slide.text)}</blockquote>`;
    } else if (slide.type === "note") {
      inner = `${slide.kicker ? `<div class="kicker rev" style="--i:0">${esc(slide.kicker)}</div>` : ""}
        <h2 class="rev" style="--i:0">${esc(slide.title)}</h2>
        <div class="points-list"><div class="point rev" style="--i:1"><span class="dot"></span><span class="txt">${esc(slide.text)}</span></div></div>`;
    } else if (slide.type === "close") {
      const takes = (slide.takeaways || [])
        .map((t, j) => `<div class="takeaway rev" style="--i:${j + 1}"><span class="no">${String(j + 1).padStart(2, "0")}</span><span class="t">${esc(t)}</span></div>`)
        .join("");
      inner = `<div class="cap rev" style="--i:0">读完这篇，记住三件事</div>
        <h2 class="rev" style="--i:0">${esc(slide.title)}</h2>
        <div class="takeaways">${takes || '<div class="takeaway rev" style="--i:1"><span class="t">详见原文</span></div>'}</div>
        <a class="cta rev" style="--i:${(slide.takeaways || []).length + 1}" href="${homeHref()}">回到站点阅读原文 →</a>`;
    }
    return `<section class="slide ${slide.type}${slide.fit || ""}" data-i="${i}"><div class="slide-inner">${inner}</div></section>`;
  }

  deck.innerHTML = slides.map(render).join("");
  const nodes = [...deck.children];

  function fit(node) {
    node.classList.remove("fit-1", "fit-2", "fit-3");
    let step = 0;
    while (node.scrollHeight > node.clientHeight + 4 && step < 3) {
      step++;
      node.classList.add("fit-" + step);
    }
  }
  function show(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    const prev = cur;
    cur = i;
    nodes.forEach((n, j) => {
      n.classList.toggle("active", j === i);
      n.classList.toggle("leaving", j === prev && j !== i);
    });
    if (reduceMotion) nodes[prev] && nodes[prev].classList.remove("leaving");
    progress.style.width = ((i + 1) / slides.length) * 100 + "%";
    counter.textContent = `${i + 1} / ${slides.length}`;
    history.replaceState(null, "", "#" + (i + 1));
    requestAnimationFrame(() => fit(nodes[i]));
    [...overview.querySelectorAll(".ov-item")].forEach((b, j) =>
      b.classList.toggle("current", j === i));
  }

  /* ---------- 概览 ---------- */
  overview.innerHTML = `<h3>全部页面 · ${slides.length}</h3><div class="ov-grid">${
    slides.map((s, j) => {
      const label = s.type === "cover" ? "封面" : s.type === "toc" ? "脉络" : s.type === "close" ? "收束" : (s.title || s.type);
      return `<button class="ov-item" data-j="${j}"><span class="n">${String(j + 1).padStart(2, "0")}</span><span>${esc(label)}</span></button>`;
    }).join("")}</div>`;
  overview.addEventListener("click", (e) => {
    const b = e.target.closest(".ov-item");
    if (b) { show(+b.dataset.j); overview.hidden = true; }
  });
  function toggleOverview() { overview.hidden = !overview.hidden; }

  /* ---------- 交互 ---------- */
  const next = () => show(cur + 1), prev = () => show(cur - 1);
  addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); prev(); }
    else if (e.key === "Home") show(0);
    else if (e.key === "End") show(slides.length - 1);
    else if (e.key === "o" || e.key === "O") toggleOverview();
    else if (e.key === "f" || e.key === "F") document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    else if (e.key === "Escape") {
      if (!overview.hidden) overview.hidden = true;
      else location.href = DATA.article || DATA.home + "index.html";
    }
  });
  deck.addEventListener("click", (e) => {
    // 目录条目：章节直达
    const item = e.target.closest(".toc-item");
    if (item && item.dataset.target !== undefined) {
      show(+item.dataset.target);
      return;
    }
    const x = e.clientX / innerWidth;
    if (x > 0.72) next(); else if (x < 0.28) prev();
  });
  // HUD：返回上级 / 概览 / 翻页 / 全屏
  document.getElementById("btn-back").addEventListener("click", (e) => {
    e.stopPropagation();
    location.href = DATA.article || DATA.home + "index.html";
  });
  document.getElementById("btn-overview").addEventListener("click", (e) => { e.stopPropagation(); toggleOverview(); });
  document.getElementById("btn-prev").addEventListener("click", (e) => { e.stopPropagation(); prev(); });
  document.getElementById("btn-next").addEventListener("click", (e) => { e.stopPropagation(); next(); });
  document.getElementById("btn-full").addEventListener("click", (e) => {
    e.stopPropagation();
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  });
  let tx = null;
  addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
  addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 48) (dx < 0 ? next : prev)();
    tx = null;
  }, { passive: true });
  let wheelLock = 0;
  addEventListener("wheel", (e) => {
    const now = Date.now();
    if (Math.abs(e.deltaY) < 24 || now - wheelLock < 650) return;
    wheelLock = now;
    (e.deltaY > 0 ? next : prev)();
  }, { passive: true });

  const h = parseInt(location.hash.slice(1), 10);
  show(isNaN(h) ? 0 : h - 1);
})();
