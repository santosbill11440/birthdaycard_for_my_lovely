/* ============ EDIT DI SINI ============ */
const CONFIG = {
  password: "191009",              // 19-10-09
  name: "Nabiila",
  lockCaption: "19 Oktober 🎂",
  lockPhoto: "foto/utama.jpg",                   // contoh: "foto/utama.jpg"
  music: "musik.mp3",                       // contoh: "musik.mp3"
  photos: [                        // src diisi path foto, cap = tulisan di bawah foto
    { src: "foto/1.jpg", cap: "Awal cerita kita" },
    { src: "foto/2.jpg", cap: "Senyum favoritku" },
    { src: "foto/3.jpg", cap: "Selalu kamu" }
  ],
  title: "Untuk Nabiila,\nalasan di balik senyumku",
  letter: `Nabiila,

Hari ini bumi dapat hadiah terbaiknya: kamu. Aku bukan ahli astronomi, tapi aku yakin semesta butuh waktu lama merapikan bintang-bintangnya sampai akhirnya bisa menciptakan seseorang sepertimu.

Kata orang, jatuh cinta bikin lupa banyak hal. Anehnya, sejak ada kamu aku justru ingat terus: caramu tertawa, caramu cemberut yang sebenarnya bikin gemas, dan betapa tenangnya dunia kalau kamu ada di dekatku.

Kamu tahu bedanya kamu dan kopi? Kopi bikin aku melek semalaman. Kalau kamu, bikin aku betah bermimpi walau mataku terbuka.

Di umur barumu, aku nggak minta banyak dari semesta. Cukup jaga kamu supaya tetap sehat dan bahagia, lalu izinkan aku jadi orang yang selalu ada di sampingmu, di hari biasa maupun di hari ulang tahun.

Selamat ulang tahun, cintaku. Semoga tahun ini lebih indah dari yang kamu bayangkan, dan semoga aku masih jadi bagian dari semua rencanamu.`,
  sign: "Selalu milikmu,\nPutra",
  wishDone: "Semoga semua permintaanmu terkabul, Nabiila 💖"
};
/* ====================================== */

const $ = s => document.querySelector(s);
const show = id => {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));
  $('#' + id).classList.add('on');
};
const img = (src, fb = '❤') => src ? `<img src="${src}" alt="">` : fb;

// isi konten
$('#lockCap').textContent = CONFIG.lockCaption;
$('#lockPhoto').innerHTML = img(CONFIG.lockPhoto, '🎂');
$('#introName').textContent = CONFIG.name;
$('#cardName').textContent = CONFIG.name;
$('#lTitle').textContent = CONFIG.title;
$('#lSign').textContent = CONFIG.sign;
$('#gal').innerHTML = CONFIG.photos.map(p =>
  `<figure class="pol sm"><div class="ph">${img(p.src)}</div><figcaption class="cap hand">${p.cap}</figcaption></figure>`).join('');

// hati melayang
for (let i = 0; i < 24; i++) {
  const s = document.createElement('span');
  s.textContent = ['❤', '♥', '✦'][i % 3];
  s.style.cssText = `left:${Math.random() * 100}%;font-size:${10 + Math.random() * 22}px;color:rgba(255,200,210,.6);animation-duration:${9 + Math.random() * 10}s;animation-delay:${Math.random() * 12}s`;
  $('#bg').appendChild(s);
}

// musik
const bgm = $('#bgm'), mBtn = $('#musicBtn');
if (CONFIG.music) { bgm.src = CONFIG.music; mBtn.hidden = false; }
mBtn.onclick = () => { bgm.paused ? bgm.play() : bgm.pause(); mBtn.classList.toggle('off', bgm.paused); };

// keypad
let entry = '';
const dots = [...document.querySelectorAll('#dots i')];
[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].forEach(k => {
  const b = document.createElement('button');
  if (k === '') b.style.visibility = 'hidden';
  else { b.textContent = k; if (k === '⌫') b.className = 'ghost'; b.onclick = () => press(String(k)); }
  $('#keys').appendChild(b);
});
const render = () => dots.forEach((d, i) => d.classList.toggle('f', i < entry.length));
function press(k) {
  if (k === '⌫') { entry = entry.slice(0, -1); render(); return; }
  if (entry.length >= CONFIG.password.length) return;
  entry += k; render();
  if (entry.length === CONFIG.password.length) setTimeout(check, 200);
}
function check() {
  if (entry === CONFIG.password) {
    if (CONFIG.music) bgm.play().catch(() => {});
    show('intro');
    setTimeout(() => show('env'), 3200);
  } else {
    $('#dots').classList.add('shake');
    $('#hint').textContent = 'Kodenya belum tepat. Petunjuk: tanggal spesial kita 😉';
    setTimeout(() => { $('#dots').classList.remove('shake'); entry = ''; render(); }, 500);
  }
}
document.addEventListener('keydown', e => {
  if (!$('#lock').classList.contains('on')) return;
  if (/^\d$/.test(e.key)) press(e.key);
  else if (e.key === 'Backspace') press('⌫');
});

// amplop
$('#envwrap').onclick = () => {
  $('#envwrap').classList.add('open');
  $('#tap').hidden = true;
  setTimeout(() => $('#toLetter').hidden = false, 1700);
};
$('#toLetter').onclick = () => { show('letter'); typeLetter(); };

// surat (efek mengetik, ketuk untuk langsung selesai)
let timer, typed = false;
function endLetter() {
  typed = true; clearInterval(timer);
  $('#lBody').textContent = CONFIG.letter;
  $('#lSign').classList.add('on');
  $('#gal').classList.add('on');
  $('#toWish').hidden = false;
}
function typeLetter() {
  let i = 0; $('#lBody').textContent = '';
  timer = setInterval(() => {
    $('#lBody').textContent += CONFIG.letter[i++];
    if (i >= CONFIG.letter.length) endLetter();
  }, 22);
}
$('.paper').onclick = () => { if (!typed) endLetter(); };
$('#toWish').onclick = () => show('wish');

// konfeti
const cv = $('#cf'), cx = cv.getContext('2d');
let parts = [];
const fit = () => { cv.width = innerWidth; cv.height = innerHeight; };
fit(); addEventListener('resize', fit);
function confetti() {
  const cols = ['#f0c36a', '#fbf3e6', '#e8546a', '#ffa62b', '#9ad7c4'];
  for (let i = 0; i < 180; i++) parts.push({
    x: Math.random() * cv.width, y: -20 - Math.random() * 400, w: 6 + Math.random() * 6, h: 10 + Math.random() * 8,
    vy: 2 + Math.random() * 3, vx: -1 + Math.random() * 2, r: Math.random() * 6, vr: -.2 + Math.random() * .4, c: cols[i % 5]
  });
  loop();
}
function loop() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.r += p.vr;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c; cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore();
  });
  parts = parts.filter(p => p.y < cv.height + 20);
  if (parts.length) requestAnimationFrame(loop);
}

// tiup lilin (mikrofon, dengan cadangan ketuk)
let blown = false;
function blowOut() {
  if (blown) return; blown = true;
  $('#cake').classList.add('out');
  $('#blow').hidden = true; $('#blowHint').hidden = true;
  setTimeout(() => {
    $('#wish').classList.add('done');
    $('#wishTitle').textContent = 'Happy Birthday! 🎉';
    $('#final').style.display = 'block';
    $('#final').textContent = CONFIG.wishDone;
    confetti();
  }, 1300);
}
async function listen() {
  try {
    const st = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ac = new AudioContext(), an = ac.createAnalyser();
    an.fftSize = 256; ac.createMediaStreamSource(st).connect(an);
    const d = new Uint8Array(an.frequencyBinCount);
    $('#blowHint').textContent = 'Tiup ke mikrofon sekarang...';
    (function tick() {
      an.getByteFrequencyData(d);
      if (d.reduce((a, b) => a + b) / d.length > 45) { st.getTracks().forEach(t => t.stop()); blowOut(); return; }
      requestAnimationFrame(tick);
    })();
  } catch (e) { blowOut(); }
}
$('#blow').onclick = listen;
$('#cake').onclick = blowOut;