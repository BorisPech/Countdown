const T1 = new Date("2026-03-30T17:30:00");
const T2 = new Date("2026-04-02T09:30:00");
const REF = new Date();
const TOTAL1 = Math.max(1, T1 - REF);
const TOTAL2 = Math.max(1, T2 - REF);

const pv = {};
const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

function setNum(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  if (pv[id] !== val) {
    el.classList.remove("flip");
    void el.offsetWidth;
    el.classList.add("flip");
    el.textContent = val;
    pv[id] = val;
  }
}

function run(target, total, ids, barId, pctId) {
  const diff = target - new Date();
  if (diff <= 0) {
    const isStart = target === T1;
    document.getElementById(ids[0]).closest(".timer").innerHTML = `
        <div class="done-wrap">
          <span class="done-ico">${isStart ? "✅" : "🎉"}</span>
          <div class="done-h">${isStart ? "ការប្រឡងបានចាប់ផ្ដើម!" : "ការប្រឡងបានបញ្ចប់!"}</div>
          <div class="done-s">${isStart ? "Exam has started — Good luck!" : "Exam is now complete — Congratulations!"}</div>
        </div>`;
    document.getElementById(barId).style.width = "100%";
    document.getElementById(pctId).textContent = "100%";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  setNum(ids[0], pad(d));
  setNum(ids[1], pad(h));
  setNum(ids[2], pad(m));
  setNum(ids[3], pad(s));

  const pct = Math.min(100, ((total - diff) / total) * 100);
  document.getElementById(barId).style.width = pct.toFixed(3) + "%";
  document.getElementById(pctId).textContent = pct.toFixed(1) + "%";
}

function clock() {
  const now = new Date();
  const kh = now.toLocaleDateString("km-KH", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const en = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  document.getElementById("liveClock").textContent = kh + " · " + en;
}

function tick() {
  run(T1, TOTAL1, ["d1", "h1", "m1", "s1"], "bar1", "pct1");
  run(T2, TOTAL2, ["d2", "h2", "m2", "s2"], "bar2", "pct2");
  clock();
}

tick();
setInterval(tick, 1000);