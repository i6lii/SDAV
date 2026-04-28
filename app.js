/* ============================================================
   DefenseX — منصة عرض قدرات وزارة الدفاع
   Main JavaScript File
   ============================================================ */

'use strict';

// ══════════════════════════════════════════
//   DATA — Equipment Database
// ══════════════════════════════════════════

const equipmentData = [
  // ── الجوية ──
  {
    id: 1, type: 'air', typeLabel: 'القوات الجوية',
    name: 'F-15 Eagle', name_en: 'F-15 Eagle',
    category: 'طائرة مقاتلة',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/F-15C_Eagle_in_flight_%281%29.jpg/1280px-F-15C_Eagle_in_flight_%281%29.jpg',
    desc: 'مقاتلة جوية متعددة المهام ذات أداء استثنائي، تُستخدم في مهام السيطرة الجوية والاعتراض.',
    usage: 'التفوق الجوي، الاعتراض، دعم القوات البرية',
    specs: { 'أقصى سرعة': 'ماخ 2.5', 'المدى': '4,600 كم', 'السقف': '20,000 م', 'الأسلحة': 'صواريخ جو-جو + مدفع' },
    bars: { 'السرعة': 92, 'المدى': 78, 'القدرة الهجومية': 88, 'الحماية': 70 }
  },
  {
    id: 2, type: 'air', typeLabel: 'القوات الجوية',
    name: 'C-130 هيركوليز', name_en: 'C-130 Hercules',
    category: 'طائرة نقل',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/412th_Test_Wing_C-130_Hercules.jpg/1280px-412th_Test_Wing_C-130_Hercules.jpg',
    desc: 'طائرة نقل عسكري ثقيل، من أكثر طائرات الشحن العسكرية استخداماً في العالم.',
    usage: 'نقل الجنود والمعدات، الإسقاط الجوي، الإخلاء الطبي',
    specs: { 'الحمولة': '20 طن', 'المدى': '7,000 كم', 'السرعة': '643 كم/س', 'الطاقم': '5 أفراد' },
    bars: { 'الحمولة': 85, 'المدى': 80, 'الموثوقية': 95, 'الدفاع': 35 }
  },
  {
    id: 3, type: 'air', typeLabel: 'القوات الجوية',
    name: 'باتريوت PAC-3', name_en: 'Patriot PAC-3',
    category: 'دفاع جوي',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Patriot_missile_battery_p1.jpg/1280px-Patriot_missile_battery_p1.jpg',
    desc: 'منظومة دفاع جوي متكاملة تعترض الصواريخ الباليستية والطائرات على مدى واسع.',
    usage: 'اعتراض الصواريخ، حماية المنشآت الحيوية',
    specs: { 'المدى': '160 كم', 'الارتفاع': '24 كم', 'وقت الرد': '3.5 ثانية', 'الطاقم': '90 فرداً' },
    bars: { 'الدقة': 96, 'المدى': 82, 'الموثوقية': 90, 'وقت الاستعداد': 78 }
  },

  // ── البرية ──
  {
    id: 4, type: 'land', typeLabel: 'القوات البرية',
    name: 'M1A2 أبرامز', name_en: 'M1A2 Abrams',
    category: 'دبابة قتال رئيسية',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/M1A2_Abrams_at_the_US_Army_Museum_of_Hawaii.jpg/1280px-M1A2_Abrams_at_the_US_Army_Museum_of_Hawaii.jpg',
    desc: 'دبابة قتال رئيسية من الجيل الثالث، تجمع بين قوة النيران والحماية والحركية الفائقة.',
    usage: 'القتال المدرع، اختراق الدفاعات، دعم المشاة',
    specs: { 'الوزن': '63 طناً', 'مدفع': '120 مم', 'السرعة': '67 كم/س', 'المدى': '425 كم' },
    bars: { 'قوة النيران': 95, 'الحماية': 92, 'الحركية': 72, 'الاتصالات': 80 }
  },
  {
    id: 5, type: 'land', typeLabel: 'القوات البرية',
    name: 'M2 برادلي', name_en: 'M2 Bradley',
    category: 'مركبة مشاة مدرعة',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Bradley_IFV_1.jpg/1280px-Bradley_IFV_1.jpg',
    desc: 'ناقلة جند مدرعة توفر قدرة نقل وقتالية عالية لدعم وحدات المشاة الميكانيكية.',
    usage: 'نقل المشاة، القتال المشترك، الاستطلاع',
    specs: { 'الوزن': '27 طناً', 'مدفع': '25 مم', 'السرعة': '66 كم/س', 'الطاقم': '3 + 7' },
    bars: { 'قوة النيران': 72, 'الحماية': 68, 'الحركية': 82, 'قدرة النقل': 85 }
  },
  {
    id: 6, type: 'land', typeLabel: 'القوات البرية',
    name: 'M109 بالادين', name_en: 'M109 Paladin',
    category: 'مدفعية ذاتية الحركة',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/M109A6_Paladin.jpg/1280px-M109A6_Paladin.jpg',
    desc: 'مدفعية هاوتزر ذاتية الحركة بعيارة 155مم توفر دعماً نيرانياً فعالاً على مسافات بعيدة.',
    usage: 'القصف غير المباشر، الدعم الناري للقوات',
    specs: { 'العيار': '155 مم', 'المدى': '30 كم', 'معدل الإطلاق': '4 طلقات/دقيقة', 'الطاقم': '4 أفراد' },
    bars: { 'قوة النيران': 90, 'المدى': 88, 'الدقة': 82, 'الحركية': 60 }
  },

  // ── البحرية ──
  {
    id: 7, type: 'naval', typeLabel: 'القوات البحرية',
    name: 'فرقاطة F-200', name_en: 'Frigate F-200',
    category: 'سفينة حربية',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/USS_Freedom_%28LCS_1%29_underway_in_the_Pacific_Ocean_in_August_2012.jpg/1280px-USS_Freedom_%28LCS_1%29_underway_in_the_Pacific_Ocean_in_August_2012.jpg',
    desc: 'فرقاطة متعددة المهام مجهزة بأحدث أنظمة الرادار والأسلحة البحرية للدفاع والهجوم.',
    usage: 'حماية الأسطول، مكافحة الغواصات، الدفاع الجوي البحري',
    specs: { 'الإزاحة': '4,500 طن', 'السرعة': '29 عقدة', 'المدى': '4,500 كم', 'الطاقم': '200 بحار' },
    bars: { 'قوة النيران': 82, 'الدفاع الجوي': 78, 'مكافحة الغواصات': 85, 'الحركية': 80 }
  },
  {
    id: 8, type: 'naval', typeLabel: 'القوات البحرية',
    name: 'زورق الدورية السريع', name_en: 'Fast Patrol Boat',
    category: 'زورق دورية',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/US_Navy_050614-N-6074Y-005_A_patrol_boat_crew_from_Assault_Craft_Unit_Five_%28ACU-5%29_transports_Marines_ashore.jpg/1280px-US_Navy_050614-N-6074Y-005_A_patrol_boat_crew_from_Assault_Craft_Unit_Five_%28ACU-5%29_transports_Marines_ashore.jpg',
    desc: 'زورق سريع للدوريات البحرية الساحلية، مزود بأسلحة خفيفة وأنظمة متابعة متطورة.',
    usage: 'حراسة المياه الإقليمية، مكافحة التهريب، الإنقاذ',
    specs: { 'الطول': '32 م', 'السرعة': '45 عقدة', 'التسليح': 'رشاش 12.7 مم', 'الطاقم': '12 بحاراً' },
    bars: { 'السرعة': 95, 'الرشاقة': 92, 'قوة النيران': 45, 'المدى': 55 }
  },
  {
    id: 9, type: 'naval', typeLabel: 'القوات البحرية',
    name: 'غواصة الهجوم', name_en: 'Attack Submarine',
    category: 'غواصة',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/USS_Virginia_%28SSN-774%29_2.jpg/1280px-USS_Virginia_%28SSN-774%29_2.jpg',
    desc: 'غواصة هجومية نووية الدفع تعمل في عمق المحيطات لمهام الردع والاستطلاع والهجوم.',
    usage: 'الردع الاستراتيجي، الاستطلاع، هجمات الغواصات',
    specs: { 'الإزاحة': '7,800 طن', 'العمق': '500 م', 'السرعة': '25 عقدة', 'الطاقم': '135 بحاراً' },
    bars: { 'الخفاء': 98, 'قوة الضرب': 90, 'العمق': 94, 'الاستقلالية': 96 }
  }
];

// ══════════════════════════════════════════
//   STATE — App State
// ══════════════════════════════════════════

const state = {
  bookings: JSON.parse(localStorage.getItem('defensex_bookings') || '[]'),
  favorites: JSON.parse(localStorage.getItem('defensex_favorites') || '[]'),
  darkMode: JSON.parse(localStorage.getItem('defensex_dark') || 'false'),
  currentFilter: 'all',
  searchQuery: '',
  editingBookingId: null,
  currentPage: detectPage()
};

function detectPage() {
  const path = window.location.pathname;
  if (path.includes('booking'))  return 'booking';
  if (path.includes('bookings')) return 'bookings';
  if (path.includes('detail'))   return 'detail';
  return 'home';
}

// ══════════════════════════════════════════
//   UTILS — Helpers
// ══════════════════════════════════════════

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function saveBookings()  { localStorage.setItem('defensex_bookings',  JSON.stringify(state.bookings)); }
function saveFavorites() { localStorage.setItem('defensex_favorites', JSON.stringify(state.favorites)); }
function saveDarkMode()  { localStorage.setItem('defensex_dark',      JSON.stringify(state.darkMode)); }

function getEquipmentById(id) { return equipmentData.find(e => e.id === Number(id)); }

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatTime(timeStr) {
  if (!timeStr) return '—';
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h);
  const period = hour < 12 ? 'صباحاً' : 'مساءً';
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${period}`;
}

// ══════════════════════════════════════════
//   TOAST — Notification System
// ══════════════════════════════════════════

function showToast(message, type = 'success', duration = 3200) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✔', error: '✖', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || '•'}</span><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ══════════════════════════════════════════
//   DARK MODE
// ══════════════════════════════════════════

function initDarkMode() {
  if (state.darkMode) document.body.classList.add('dark-mode');
  const btn = document.getElementById('darkModeBtn');
  if (btn) {
    btn.textContent = state.darkMode ? '☀' : '🌙';
    btn.addEventListener('click', toggleDarkMode);
  }
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  document.body.classList.toggle('dark-mode', state.darkMode);
  saveDarkMode();
  const btn = document.getElementById('darkModeBtn');
  if (btn) btn.textContent = state.darkMode ? '☀' : '🌙';
}

// ══════════════════════════════════════════
//   NAVBAR — Scroll & Active
// ══════════════════════════════════════════

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Active link
  const links = navbar.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }
}

// ══════════════════════════════════════════
//   HOME PAGE — Cards & Filter & Search
// ══════════════════════════════════════════

function initHome() {
  if (!document.getElementById('cardsGrid')) return;

  renderBranchCounts();
  renderCards(equipmentData);

  // Filter pills
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.currentFilter = pill.dataset.type || 'all';
      applyFilters();
    });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      state.searchQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    }, 280));
  }
}

function applyFilters() {
  let data = [...equipmentData];

  if (state.currentFilter !== 'all') {
    data = data.filter(e => e.type === state.currentFilter);
  }

  if (state.searchQuery) {
    data = data.filter(e =>
      e.name.toLowerCase().includes(state.searchQuery) ||
      e.category.toLowerCase().includes(state.searchQuery) ||
      e.desc.toLowerCase().includes(state.searchQuery)
    );
  }

  renderCards(data);
}

function renderCards(data) {
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;

  if (data.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">🔍</div>
        <h3>لا توجد نتائج</h3>
        <p class="text-muted" style="margin-top:8px">جرب تغيير كلمة البحث أو الفلتر</p>
      </div>`;
    return;
  }

  const typeIconMap = { air: '✈️', land: '🚛', naval: '🚢' };
  const badgeClass  = { air: 'badge-air', land: 'badge-land', naval: 'badge-naval' };

  grid.innerHTML = data.map((eq, i) => `
    <div class="card animate-fade-up animate-delay-${Math.min(i % 4 + 1, 4)}"
         data-id="${eq.id}" onclick="goToDetail(${eq.id})">
      <div class="card-img-wrap">
        ${eq.img
          ? `<img src="${eq.img}" alt="${eq.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''
        }
        <div class="card-img-placeholder" style="display:${eq.img ? 'none' : 'flex'}">${typeIconMap[eq.type]}</div>
        <span class="card-type-badge ${badgeClass[eq.type]}">${eq.typeLabel}</span>
        <button class="fav-btn ${state.favorites.includes(eq.id) ? 'active' : ''}"
                onclick="toggleFavorite(event, ${eq.id})"
                title="إضافة للمفضلة">♥</button>
      </div>
      <div class="card-body">
        <h3 class="card-title">${eq.name}</h3>
        <p class="card-desc">${eq.desc}</p>
        <div class="card-specs">
          <span class="spec-chip">📁 ${eq.category}</span>
          ${Object.entries(eq.specs).slice(0, 2).map(([k, v]) =>
            `<span class="spec-chip">📌 ${k}: ${v}</span>`
          ).join('')}
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-sm"
                  onclick="event.stopPropagation(); goToBooking(${eq.id})">
            📅 احجز موعد
          </button>
          <span style="font-size:0.78rem; color:var(--olive-muted)">التفاصيل ←</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderBranchCounts() {
  const counts = {
    air:   equipmentData.filter(e => e.type === 'air').length,
    land:  equipmentData.filter(e => e.type === 'land').length,
    naval: equipmentData.filter(e => e.type === 'naval').length
  };
  ['air', 'land', 'naval'].forEach(t => {
    const el = document.getElementById(`count_${t}`);
    if (el) el.textContent = `${counts[t]} معدّة`;
  });
}

// ══════════════════════════════════════════
//   FAVORITES
// ══════════════════════════════════════════

function toggleFavorite(e, id) {
  e.stopPropagation();
  const idx = state.favorites.indexOf(id);
  if (idx === -1) {
    state.favorites.push(id);
    showToast('تمت الإضافة للمفضلة ♥', 'success');
  } else {
    state.favorites.splice(idx, 1);
    showToast('تمت الإزالة من المفضلة', 'info');
  }
  saveFavorites();

  // Update button visually
  const btn = document.querySelector(`[data-id="${id}"] .fav-btn`);
  if (btn) btn.classList.toggle('active', state.favorites.includes(id));
}

// ══════════════════════════════════════════
//   DETAIL PAGE
// ══════════════════════════════════════════

function initDetail() {
  const container = document.getElementById('detailContainer');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  const eq     = getEquipmentById(id);

  if (!eq) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">❌</div><h3>المعدّة غير موجودة</h3></div>`;
    return;
  }

  // Hero
  const hero = document.getElementById('detailHero');
  if (hero && eq.img) {
    hero.querySelector('img').src = eq.img;
    hero.querySelector('img').alt = eq.name;
  }

  document.getElementById('detailName')?.insertAdjacentText('afterbegin', eq.name);
  document.getElementById('detailCategory')?.insertAdjacentText('afterbegin', `📁 ${eq.category} • ${eq.typeLabel}`);

  // Specs table
  const table = document.getElementById('specsTable');
  if (table) {
    table.innerHTML = Object.entries(eq.specs).map(([k, v]) =>
      `<tr><td>${k}</td><td>${v}</td></tr>`
    ).join('');
  }

  // Spec bars
  const barsContainer = document.getElementById('specBars');
  if (barsContainer) {
    barsContainer.innerHTML = Object.entries(eq.bars).map(([label, val]) => `
      <div class="spec-bar-item">
        <div class="spec-bar-label">
          <span>${label}</span>
          <span>${val}%</span>
        </div>
        <div class="spec-bar-track">
          <div class="spec-bar-fill" style="width:0%" data-width="${val}%"></div>
        </div>
      </div>
    `).join('');

    // Animate bars on scroll
    setTimeout(() => {
      document.querySelectorAll('.spec-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 300);
  }

  // Usage
  const usageEl = document.getElementById('equipUsage');
  if (usageEl) usageEl.textContent = eq.usage;

  // Booking button
  const bookBtn = document.getElementById('detailBookBtn');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => goToBooking(eq.id));
  }

  // Favorite button
  const favBtn = document.getElementById('detailFavBtn');
  if (favBtn) {
    favBtn.classList.toggle('active', state.favorites.includes(eq.id));
    favBtn.addEventListener('click', () => {
      toggleFavorite({ stopPropagation: () => {} }, eq.id);
      favBtn.classList.toggle('active', state.favorites.includes(eq.id));
    });
  }
}

// ══════════════════════════════════════════
//   DETAILS PAGE — Equipment DB & Modal
// ══════════════════════════════════════════

let activeId = '';

const db = {
    'f15':       { ar: { n:'F-15 إيجل',         f:'القوات الجوية',  s:'2655 كم/س', r:'4630 كم',  c:'30500 م', t:'مقاتلة',         y:'1976', d:'مقاتلة تفوق جوي متطورة تُستخدم في مهام السيطرة الجوية والاعتراض.' },
                   en: { n:'F-15 Eagle',          f:'Air Force',      s:'2655 km/h', r:'4630 km',  c:'30500 m', t:'Fighter',         y:'1976', d:'Advanced air superiority fighter used for air control and interception missions.' } },
    'habob':     { ar: { n:'طائرة هبوب',          f:'القوات الجوية',  s:'250 كم/س',  r:'1500 كم',  c:'MALE',    t:'درون قتالي',     y:'2023', d:'طائرة مسيرة قتالية سعودية الصنع بالكامل، تمثل قفزة في التصنيع العسكري الوطني.' },
                   en: { n:'Habob Drone',          f:'Air Force',      s:'250 km/h',  r:'1500 km',  c:'MALE',    t:'Combat UAV',      y:'2023', d:'Fully Saudi-made combat drone, representing a leap in national military manufacturing.' } },
    'c130':      { ar: { n:'C-130 هيركوليز',      f:'القوات الجوية',  s:'592 كم/س',  r:'3800 كم',  c:'10000 م', t:'نقل عسكري',      y:'1956', d:'طائرة نقل استراتيجي ثقيل، من أكثر طائرات الشحن العسكرية استخداماً في العالم.' },
                   en: { n:'C-130 Hercules',       f:'Air Force',      s:'592 km/h',  r:'3800 km',  c:'10000 m', t:'Transport',       y:'1956', d:'Heavy strategic transport aircraft, one of the most widely used military cargo planes in the world.' } },
    'patriot':   { ar: { n:'باتريوت PAC-3',        f:'القوات الجوية',  s:'Mach 5',    r:'160 كم',   c:'24000 م', t:'دفاع جوي',       y:'1981', d:'منظومة دفاع جوي متكاملة تعترض الصواريخ الباليستية والطائرات على مدى واسع.' },
                   en: { n:'Patriot PAC-3',         f:'Air Force',      s:'Mach 5',    r:'160 km',   c:'24000 m', t:'Air Defense',     y:'1981', d:'Integrated air defense system that intercepts ballistic missiles and aircraft over a wide range.' } },
    'heet':      { ar: { n:'عربة هيت',             f:'القوات البرية',  s:'110 كم/س',  r:'600 كم',   c:'-',       t:'مدرعة 4x4',      y:'2024', d:'مركبة مدرعة سعودية الصنع بالكامل، مُصممة للعمليات البرية متعددة المهام.' },
                   en: { n:'HEET Vehicle',          f:'Army',           s:'110 km/h',  r:'600 km',   c:'-',       t:'Armored 4x4',     y:'2024', d:'Fully Saudi-made armored vehicle designed for multi-mission land operations.' } },
    'abrams':    { ar: { n:'M1A2 أبرامز',          f:'القوات البرية',  s:'67 كم/س',   r:'426 كم',   c:'-',       t:'دبابة قتال',     y:'1980', d:'دبابة قتال رئيسية من الجيل الثالث، تجمع بين قوة النيران والحماية والحركية الفائقة.' },
                   en: { n:'M1A2 Abrams',           f:'Army',           s:'67 km/h',   r:'426 km',   c:'-',       t:'Main Battle Tank',y:'1980', d:'Third-generation main battle tank combining firepower, protection, and superior mobility.' } },
    'bradley':   { ar: { n:'M2 برادلي',            f:'القوات البرية',  s:'66 كم/س',   r:'480 كم',   c:'-',       t:'مدرعة مشاة',     y:'1981', d:'ناقلة جند مدرعة توفر قدرة نقل وقتالية عالية لدعم وحدات المشاة الميكانيكية.' },
                   en: { n:'M2 Bradley',            f:'Army',           s:'66 km/h',   r:'480 km',   c:'-',       t:'IFV',             y:'1981', d:'Armored personnel carrier providing high transport and combat capability for mechanized infantry.' } },
    'paladin':   { ar: { n:'M109 بالادين',         f:'القوات البرية',  s:'56 كم/س',   r:'30 كم',    c:'-',       t:'مدفعية',         y:'1963', d:'مدفعية هاوتزر ذاتية الحركة بعيار 155مم توفر دعماً نيرانياً على مسافات بعيدة.' },
                   en: { n:'M109 Paladin',          f:'Army',           s:'56 km/h',   r:'30 km',    c:'-',       t:'Artillery',       y:'1963', d:'Self-propelled 155mm howitzer providing fire support at long distances.' } },
    'hsi32':     { ar: { n:'HSI-32',               f:'القوات البحرية', s:'48 عقدة',   r:'1200 ميل', c:'-',       t:'زورق اعتراض',    y:'2021', d:'زوارق اعتراض سريعة مصنعة محلياً، تُستخدم لحراسة السواحل ومكافحة التهريب.' },
                   en: { n:'HSI-32 Boat',           f:'Navy',           s:'48 Knots',  r:'1200 miles',c:'-',      t:'Interceptor',     y:'2021', d:'Locally manufactured fast interceptor boats used for coast guarding and anti-smuggling.' } },
    'frigate':   { ar: { n:'فرقاطة F-2000',        f:'القوات البحرية', s:'25 عقدة',   r:'7000 ميل', c:'-',       t:'فرقاطة',         y:'1985', d:'سفينة حربية متعددة المهام مجهزة بأحدث أنظمة الرادار والأسلحة البحرية.' },
                   en: { n:'Frigate F-2000',        f:'Navy',           s:'25 Knots',  r:'7000 miles',c:'-',      t:'Frigate',         y:'1985', d:'Multi-mission warship equipped with the latest radar systems and naval weapons.' } },
    'patrol':    { ar: { n:'زوارق اعتراض',         f:'القوات البحرية', s:'43 عقدة',   r:'800 ميل',  c:'-',       t:'زوارق سريعة',    y:'2020', d:'زوارق حماية السواحل السريعة، مزودة بأسلحة خفيفة وأنظمة متابعة متطورة.' },
                   en: { n:'Patrol Boat',           f:'Navy',           s:'43 Knots',  r:'800 miles', c:'-',      t:'Fast Patrol',     y:'2020', d:'Fast coastal protection boats equipped with light weapons and advanced tracking systems.' } },
    'submarine': { ar: { n:'غواصة هجومية',         f:'القوات البحرية', s:'20 عقدة',   r:'500 ميل',  c:'400 م',   t:'غواصة',          y:'2005', d:'غواصة صامتة متطورة تعمل في عمق المحيطات لمهام الردع والاستطلاع والهجوم.' },
                   en: { n:'Attack Submarine',      f:'Navy',           s:'20 Knots',  r:'500 miles', c:'400 m',  t:'Submarine',       y:'2005', d:'Advanced silent submarine operating in deep oceans for deterrence, reconnaissance, and attack.' } }
};

function updateView(cat) {
    document.querySelectorAll('.force-info-card').forEach(el => el.style.display = 'none');
    if (cat !== 'all') document.getElementById(cat + '-info').style.display = 'block';
    document.querySelectorAll('.card').forEach(c =>
        c.style.display = (cat === 'all' || c.classList.contains(cat)) ? 'block' : 'none'
    );
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
}

function openModal(id) {
    activeId = id;
    const lang = localStorage.getItem('sdav_lang') || 'ar';
    const data = db[id][lang === 'ar' ? 'ar' : 'en'];
    document.getElementById('m-title').innerText   = data.n;
    document.getElementById('m-speed').innerText   = data.s;
    document.getElementById('m-range').innerText   = data.r;
    document.getElementById('m-ceiling').innerText = data.c;
    document.getElementById('m-cat').innerText     = data.t;
    document.getElementById('m-year').innerText    = data.y;
    document.getElementById('m-desc').innerText    = data.d;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// ══════════════════════════════════════════
//   BOOKING FORM
// ══════════════════════════════════════════

function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  // Pre-fill equipment from URL param
  const params    = new URLSearchParams(window.location.search);
  const equipId   = params.get('equip');
  const editId    = params.get('edit');

  // Populate equipment select
  const equipSelect = document.getElementById('equipmentSelect');
  if (equipSelect) {
    const groups = {
      air:   { label: '✈️ القوات الجوية',   items: equipmentData.filter(e => e.type === 'air') },
      land:  { label: '🚛 القوات البرية',    items: equipmentData.filter(e => e.type === 'land') },
      naval: { label: '🚢 القوات البحرية',   items: equipmentData.filter(e => e.type === 'naval') }
    };
    equipSelect.innerHTML = '<option value="">— اختر المعدّة —</option>';
    Object.values(groups).forEach(g => {
      const group = document.createElement('optgroup');
      group.label = g.label;
      g.items.forEach(eq => {
        const opt = document.createElement('option');
        opt.value = eq.id;
        opt.textContent = `${eq.name} (${eq.category})`;
        if (equipId && Number(equipId) === eq.id) opt.selected = true;
        group.appendChild(opt);
      });
      equipSelect.appendChild(group);
    });
  }

  // Fill form for editing
  if (editId) {
    const booking = state.bookings.find(b => b.id === editId);
    if (booking) {
      state.editingBookingId = editId;
      document.getElementById('pageTitle').textContent = 'تعديل الحجز';
      document.getElementById('submitBtn').textContent  = '💾 حفظ التعديلات';
      fillForm(booking);
    }
  }

  // Set min date to today
  const dateInput = document.getElementById('visitDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Form submission
  form.addEventListener('submit', handleBookingSubmit);

  // Real-time validation
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });
}

function fillForm(booking) {
  const fields = {
    'visitorName':    booking.name,
    'phoneNumber':    booking.phone,
    'equipmentSelect': booking.equipId,
    'visitDate':      booking.date,
    'visitTime':      booking.time,
    'visitNotes':     booking.notes || ''
  };
  Object.entries(fields).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });
}

function validateField(input) {
  const id  = input.id;
  const val = input.value.trim();
  let error = '';

  if (id === 'visitorName') {
    if (!val) error = 'الاسم مطلوب';
    else if (val.length < 3) error = 'الاسم يجب أن يكون 3 أحرف على الأقل';
  }
  if (id === 'phoneNumber') {
    if (!val) error = 'رقم الجوال مطلوب';
    else if (!/^(05\d{8}|009665\d{8}|\+9665\d{8})$/.test(val.replace(/\s/g, '')))
      error = 'رقم الجوال غير صحيح (مثال: 0512345678)';
  }
  if (id === 'equipmentSelect' && !val) error = 'يرجى اختيار المعدّة';
  if (id === 'visitDate' && !val) error = 'التاريخ مطلوب';
  if (id === 'visitTime' && !val) error = 'الوقت مطلوب';

  showFieldError(input, error);
  return !error;
}

function showFieldError(input, message) {
  input.classList.toggle('error', !!message);
  const errEl = document.getElementById(`${input.id}Error`);
  if (errEl) {
    errEl.textContent = message;
    errEl.classList.toggle('show', !!message);
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();

  const fields  = ['visitorName', 'phoneNumber', 'equipmentSelect', 'visitDate', 'visitTime'];
  const isValid = fields.every(id => {
    const el = document.getElementById(id);
    return el ? validateField(el) : true;
  });

  if (!isValid) {
    showToast('يرجى تصحيح الأخطاء في النموذج', 'error');
    return;
  }

  const booking = {
    id:      state.editingBookingId || generateId(),
    name:    document.getElementById('visitorName').value.trim(),
    phone:   document.getElementById('phoneNumber').value.trim(),
    equipId: Number(document.getElementById('equipmentSelect').value),
    date:    document.getElementById('visitDate').value,
    time:    document.getElementById('visitTime').value,
    notes:   document.getElementById('visitNotes')?.value.trim() || '',
    status:  'pending',
    created: new Date().toISOString()
  };

  if (state.editingBookingId) {
    const idx = state.bookings.findIndex(b => b.id === state.editingBookingId);
    if (idx !== -1) {
      booking.status  = state.bookings[idx].status;
      booking.created = state.bookings[idx].created;
      state.bookings[idx] = booking;
    }
    showToast('✅ تم تعديل الحجز بنجاح', 'success');
  } else {
    booking.status = 'confirmed';
    state.bookings.push(booking);
    showToast('🎉 تم تسجيل حجزك بنجاح!', 'success');
  }

  saveBookings();
  setTimeout(() => { window.location.href = 'bookings.html'; }, 1400);
}

// ══════════════════════════════════════════
//   BOOKINGS TABLE PAGE
// ══════════════════════════════════════════

function initBookingsPage() {
  const tableBody = document.getElementById('bookingsTableBody');
  if (!tableBody) return;

  renderBookingsTable();
  updateBookingStats();
}

function renderBookingsTable() {
  const tableBody = document.getElementById('bookingsTableBody');
  if (!tableBody) return;

  if (state.bookings.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">
            <div class="empty-icon">📋</div>
            <h3>لا توجد حجوزات بعد</h3>
            <p class="text-muted" style="margin-top:8px">قم بحجز موعد لزيارة أحد المعروضات</p>
          </div>
        </td>
      </tr>`;
    return;
  }

  const statusLabels = { confirmed: 'مؤكد', pending: 'قيد الانتظار', cancelled: 'ملغى' };
  const statusClass  = { confirmed: 'status-confirmed', pending: 'status-pending', cancelled: 'status-cancelled' };
  const statusIcon   = { confirmed: '✔', pending: '⏳', cancelled: '✖' };

  tableBody.innerHTML = [...state.bookings].reverse().map(b => {
    const eq = getEquipmentById(b.equipId);
    return `
      <tr>
        <td><strong>${escapeHtml(b.name)}</strong></td>
        <td>${eq ? eq.name : '—'}</td>
        <td class="muted">${formatDate(b.date)}</td>
        <td class="muted">${formatTime(b.time)}</td>
        <td>
          <span class="status-badge ${statusClass[b.status] || 'status-pending'}">
            ${statusIcon[b.status] || '•'} ${statusLabels[b.status] || b.status}
          </span>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn btn-ghost btn-sm btn-icon" title="تعديل"
                    onclick="editBooking('${b.id}')">✏️</button>
            <button class="btn btn-danger btn-sm btn-icon" title="إلغاء"
                    onclick="confirmCancelBooking('${b.id}')">🗑</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function updateBookingStats() {
  const total     = state.bookings.length;
  const confirmed = state.bookings.filter(b => b.status === 'confirmed').length;
  const cancelled = state.bookings.filter(b => b.status === 'cancelled').length;

  const els = {
    'statsTotal':     total,
    'statsConfirmed': confirmed,
    'statsCancelled': cancelled
  };
  Object.entries(els).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
}

function editBooking(id) {
  window.location.href = `booking.html?edit=${id}`;
}

function confirmCancelBooking(id) {
  openModal('confirmModal');
  const confirmBtn = document.getElementById('confirmCancelBtn');
  if (confirmBtn) {
    confirmBtn.onclick = () => cancelBooking(id);
  }
}

function cancelBooking(id) {
  const idx = state.bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    state.bookings[idx].status = 'cancelled';
    saveBookings();
    closeModal('confirmModal');
    renderBookingsTable();
    updateBookingStats();
    showToast('تم إلغاء الحجز', 'info');
  }
}

function deleteBooking(id) {
  state.bookings = state.bookings.filter(b => b.id !== id);
  saveBookings();
  renderBookingsTable();
  updateBookingStats();
  showToast('تم حذف الحجز نهائياً', 'info');
}

// ══════════════════════════════════════════
//   MODAL SYSTEM
// ══════════════════════════════════════════

function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal(e.target.id);
  }
});

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active')
      .forEach(m => closeModal(m.id));
  }
});

// ══════════════════════════════════════════
//   NAVIGATION HELPERS
// ══════════════════════════════════════════

function goToDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

function goToBooking(equipId) {
  window.location.href = equipId
    ? `booking.html?equip=${equipId}`
    : `booking.html`;
}

// ══════════════════════════════════════════
//   SECURITY — XSS Escape
// ══════════════════════════════════════════

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}

// ══════════════════════════════════════════
//   PERFORMANCE — Debounce
// ══════════════════════════════════════════

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ══════════════════════════════════════════
//   SCROLL ANIMATIONS — Intersection Observer
// ══════════════════════════════════════════

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-fade-up').forEach(el => {
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });
}

// ══════════════════════════════════════════
//   COUNTER ANIMATION — Stats
// ══════════════════════════════════════════

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let count    = 0;
    const step   = Math.ceil(target / 50);
    const timer  = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(timer);
    }, 30);
  });
}

// ══════════════════════════════════════════
//   INIT — Entry Point
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNavbar();
  initHome();
  initDetail();
  initBookingForm();
  initBookingsPage();
  initScrollAnimations();
  initLang();

  // Animate counters if present
  setTimeout(animateCounters, 600);

  // Mobile nav close on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navLinks')?.classList.remove('mobile-open');
    });
  });

  console.log('%cDefenseX Platform 🛡️', 'color:#4e6b35; font-size:16px; font-weight:bold');
});

// ══════════════════════════════════════════
//   UNIFIED LANGUAGE SYSTEM — Works on all pages
// ══════════════════════════════════════════

const langTexts = {
    ar: {
        // Nav (shared)
        navLogo: 'منصة الاستعراض الدفاعي',
        nav1: 'الرئيسية', nav2: 'التفاصيل', nav3: 'حجز موعد',
        langBtn: 'English',
        // Footer (shared)
        fH1: 'خريطة الموقع', fH2: 'فريق التطوير', fH3: 'SDAV Platform',
        fL1: 'الرئيسية', fL2: 'التفاصيل', fL3: 'حجز زيارة',
        copyright: '© 2026 جميع الحقوق محفوظة لمنصة SDAV - YASHA',
        // Home page
        brandName: 'منصة الاستعراض الدفاعي',
        heroTitle: 'مستقبل الطيران الدفاعي الذكي',
        heroP: 'نقدم لك واجهة متكاملة لاستعراض أحدث التقنيات الدفاعية الجوية في المملكة العربية السعودية، مع أدوات تحليل ذكية وتنسيق مباشر للمواعيد.',
        btnFleet: 'استكشف المعدات', btnVisit: 'احجز زيارة ميدانية',
        featuresTitle: 'لماذا منصة SDAV؟',
        f1t: 'تحليل ذكي', f1p: 'بيانات دقيقة ومحدثة لكل قطعة في الأسطول الدفاعي.',
        f2t: 'تغطية شاملة', f2p: 'استعراض متكامل للقوات الجوية والبرية والبحرية.',
        f3t: 'تنسيق سريع', f3p: 'نظام حجز مواعد إلكتروني يربطك بالجهات المختصة مباشرة.',
        visionT: 'نحمي وطناً يتأهب للمستقبل',
        visionP1: 'انطلاقاً من رؤية المملكة 2030، تهدف منصة SDAV إلى تعزيز الوعي بالقدرات الدفاعية الوطنية واستعراض التطور التقني الذي وصلت إليه قواتنا المسلحة.',
        visionP2: '"غايتنا الأسمى هي حفظ سيادة وأمن وطننا ووحدته وحماية مقدساته."',
        // Details page
        heroH: 'نحمي وطناً يتأهب للمستقبل',
        heroDetails: 'غايتنا الأسمى هي حفظ سيادة وأمن وطننا ووحدته وحماية مقدساته.',
        fAll: 'الكل', fAir: 'القوات الجوية', fLand: 'القوات البرية', fSea: 'القوات البحرية',
        airH2: 'القوات الجوية الملكية السعودية',
        airL: 'قائد القوات الجوية: سمو الفريق الركن تركي بن بندر',
        landH2: 'القوات البرية الملكية السعودية',
        landL: 'رئيس أركان القوات البرية: الفريق الركن فهد الجهني',
        seaH2: 'القوات البحرية الملكية السعودية',
        seaL: 'رئيس أركان القوات البحرية: الفريق الركن محمد الغريبي',
        lblSpeed: 'السرعة القصوى', lblRange: 'المدى التشغيلي',
        lblCeiling: 'سقف التحليق', lblCat: 'التصنيف',
        lblYear: 'سنة التشغيل', mBtn: '🗓️ احجز موعد',
        // Booking page
        formTitle: 'طلب حجز موعد زيارة',
        formDesc: 'يرجى تعبئة كافة الحقول المطلوبة لضمان معالجة طلبك',
        lblName: 'الاسم الكامل', lblId: 'رقم الهوية',
        lblPhone: 'رقم الجوال', lblEmail: 'البريد الإلكتروني',
        lblForce: 'الجهة المستهدفة', lblDate: 'تاريخ الزيارة',
        optAir: 'القوات الجوية الملكية السعودية',
        optLand: 'القوات البرية الملكية السعودية',
        optSea: 'القوات البحرية الملكية السعودية',
        btnSubmit: 'تأكيد طلب الحجز',
        msgTitle: 'تم الحجز بنجاح!',
        msgBody: 'يرجى الاحتفاظ بتفاصيل الموعد الموضحة أدناه:',
        tName: 'الاسم', tForce: 'الجهة', tDate: 'التاريخ', tRef: 'رقم المرجع',
        btnNew: 'حجز جديد'
    },
    en: {
        navLogo: 'Defense Exhibition Platform',
        nav1: 'Home', nav2: 'Details', nav3: 'Booking',
        langBtn: 'العربية',
        fH1: 'Sitemap', fH2: 'Development Team', fH3: 'SDAV Platform',
        fL1: 'Home', fL2: 'Details', fL3: 'Book Visit',
        copyright: '© 2026 All Rights Reserved - SDAV Platform - YASHA',
        brandName: 'Defense Exhibition Platform',
        heroTitle: 'Future of Smart Defense Aviation',
        heroP: 'An integrated interface for showcasing Saudi Arabia\'s latest aerial defense technologies with smart analytics and direct coordination.',
        btnFleet: 'Explore Equipment', btnVisit: 'Book a Field Visit',
        featuresTitle: 'Why SDAV?',
        f1t: 'Smart Analytics', f1p: 'Accurate and updated data for every piece in the defense fleet.',
        f2t: 'Full Coverage', f2p: 'Comprehensive display of Air, Land, and Sea forces.',
        f3t: 'Fast Coordination', f3p: 'An electronic booking system connecting you directly with authorities.',
        visionT: 'Protecting a Future-Ready Nation',
        visionP1: 'Inspired by Vision 2030, SDAV aims to enhance national defense awareness and showcase the technical progress of our armed forces.',
        visionP2: '"Our supreme goal is to preserve the sovereignty, security, and unity of our nation."',
        heroH: 'Protecting Our Future',
        heroDetails: 'Our goal is to preserve the sovereignty and security of our nation.',
        fAll: 'All', fAir: 'Air Force', fLand: 'Army', fSea: 'Navy',
        airH2: 'Royal Saudi Air Force',
        airL: 'Air Force Commander: HRH Lt. Gen. Turki bin Bandar',
        landH2: 'Royal Saudi Land Forces',
        landL: 'Army Chief of Staff: Lt. Gen. Fahd Al-Juhani',
        seaH2: 'Royal Saudi Naval Forces',
        seaL: 'Navy Chief of Staff: Lt. Gen. Mohammed Al-Gharibi',
        lblSpeed: 'Max Speed', lblRange: 'Operational Range',
        lblCeiling: 'Service Ceiling', lblCat: 'Category',
        lblYear: 'Service Year', mBtn: '🗓️ Book Appointment',
        formTitle: 'Book a Visit Appointment',
        formDesc: 'Please fill in all required fields to ensure your request is processed.',
        lblName: 'Full Name', lblId: 'ID Number',
        lblPhone: 'Phone Number', lblEmail: 'Email Address',
        lblForce: 'Target Force', lblDate: 'Visit Date',
        optAir: 'Royal Saudi Air Force',
        optLand: 'Royal Saudi Land Forces',
        optSea: 'Royal Saudi Naval Forces',
        btnSubmit: 'Confirm Booking',
        msgTitle: 'Booking Successful!',
        msgBody: 'Please keep the appointment details shown below:',
        tName: 'Name', tForce: 'Force', tDate: 'Date', tRef: 'Reference ID',
        btnNew: 'New Booking'
    }
};

// Helper: set text if element exists
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function applyLang(lang) {
    const t = langTexts[lang];
    const isAr = lang === 'ar';

    // Update html element direction & lang
    const htmlEl = document.documentElement;
    htmlEl.dir  = isAr ? 'rtl' : 'ltr';
    htmlEl.lang = lang;

    // ── Shared nav (all pages use these IDs) ──
    setText('nav-logo',   t.navLogo);
    setText('brand-name', t.brandName);
    setText('nav-sub',    isAr ? 'Smart Defense Aviation Viewer' : 'Smart Defense Aviation Viewer');
    setText('nav-1',  t.nav1); setText('nav-2', t.nav2); setText('nav-3', t.nav3);
    setText('nav-home', t.nav1); setText('nav-details', t.nav2); setText('nav-booking', t.nav3);
    document.querySelectorAll('.lang-btn, .lang-switch').forEach(el => el.innerText = t.langBtn);

    // ── Shared footer (all pages) ──
    setText('f-h1', t.fH1); setText('f-h2', t.fH2); setText('f-h3', t.fH3);
    setText('f-l1', t.fL1); setText('f-l2', t.fL2); setText('f-l3', t.fL3);
    setText('copy-text', t.copyright);

    // ── Home page ──
    setText('hero-title', t.heroTitle);
    setText('hero-p',     t.heroP);
    setText('btn-fleet',  t.btnFleet);
    setText('btn-visit',  t.btnVisit);
    setText('features-main-title', t.featuresTitle);
    setText('f1-t', t.f1t); setText('f1-p', t.f1p);
    setText('f2-t', t.f2t); setText('f2-p', t.f2p);
    setText('f3-t', t.f3t); setText('f3-p', t.f3p);
    setText('vision-t',  t.visionT);
    setText('vision-p1', t.visionP1);
    setText('vision-p2', t.visionP2);

    // ── Details page ──
    setText('hero-h', t.heroH);
    setText('hero-p', t.heroDetails); // overwrite if on details page
    setText('f-all',  t.fAll); setText('f-air', t.fAir);
    setText('f-land', t.fLand); setText('f-sea', t.fSea);
    setText('air-h2', t.airH2); setText('air-l',  t.airL);
    setText('land-h2',t.landH2); setText('land-l', t.landL);
    setText('sea-h2', t.seaH2);  setText('sea-l',  t.seaL);
    setText('lbl-speed',   t.lblSpeed);
    setText('lbl-range',   t.lblRange);
    setText('lbl-ceiling', t.lblCeiling);
    setText('lbl-cat',     t.lblCat);
    setText('lbl-year',    t.lblYear);
    setText('m-btn',       t.mBtn);

    // Equipment card names & forces (details page)
    if (typeof db !== 'undefined') {
        document.querySelectorAll('.eq-n').forEach(el => {
            const d = db[el.dataset.id];
            if (d) el.innerText = d[isAr ? 'ar' : 'en'].n;
        });
        document.querySelectorAll('.eq-f').forEach(el => {
            const d = db[el.dataset.id];
            if (d) el.innerText = d[isAr ? 'ar' : 'en'].f;
        });
    }

    // ── Booking page ──
    setText('form-title', t.formTitle);
    setText('form-desc',  t.formDesc);
    setText('lbl-name',   t.lblName);
    setText('lbl-id',     t.lblId);
    setText('lbl-phone',  t.lblPhone);
    setText('lbl-email',  t.lblEmail);
    setText('lbl-force',  t.lblForce);
    setText('lbl-date',   t.lblDate);
    setText('opt-air',    t.optAir);
    setText('opt-land',   t.optLand);
    setText('opt-sea',    t.optSea);
    setText('btn-submit', t.btnSubmit);
    setText('msg-title',  t.msgTitle);
    setText('msg-body',   t.msgBody);
    document.querySelectorAll('.t-lbl-name').forEach(el => el.innerText = t.tName);
    document.querySelectorAll('.t-lbl-force').forEach(el => el.innerText = t.tForce);
    document.querySelectorAll('.t-lbl-date').forEach(el => el.innerText = t.tDate);
    document.querySelectorAll('.t-lbl-ref').forEach(el => el.innerText = t.tRef);
    setText('btn-new', t.btnNew);
}

// Toggle and persist language across all pages
function toggleLang() {
    const current = localStorage.getItem('sdav_lang') || 'ar';
    const next = current === 'ar' ? 'en' : 'ar';
    localStorage.setItem('sdav_lang', next);
    applyLang(next);
    // Re-open modal with new lang if on details page
    if (typeof activeId !== 'undefined' && activeId && document.getElementById('modal') &&
        document.getElementById('modal').style.display === 'flex') {
        openModal(activeId);
    }
}

// Same function name used by home.html button
function toggleLanguage() { toggleLang(); }

// Auto-apply saved language on page load
function initLang() {
    const saved = localStorage.getItem('sdav_lang') || 'ar';
    applyLang(saved);
}

// Booking form validation
function validateAndSubmit(e) {
    e.preventDefault();
    const lang = localStorage.getItem('sdav_lang') || 'ar';
    const isAr = lang === 'ar';

    const nameVal  = document.getElementById('name').value;
    const idVal    = document.getElementById('id-num').value;
    const phoneVal = document.getElementById('phone').value;
    const forceVal = document.getElementById('force').value;
    const dateVal  = document.getElementById('date').value;

    const idRegex    = /^[12][0-9]{9}$/;
    const phoneRegex = /^05[0-9]{8}$/;

    if (!idRegex.test(idVal)) {
        alert(isAr ? 'خطأ في رقم الهوية' : 'Invalid ID Number');
        return;
    }
    if (!phoneRegex.test(phoneVal)) {
        alert(isAr ? 'خطأ في رقم الجوال' : 'Invalid Phone Number');
        return;
    }
    document.getElementById('form-content').style.display = 'none';
    document.getElementById('success-card').style.display = 'block';
    document.getElementById('res-name').innerText  = nameVal;
    document.getElementById('res-force').innerText = forceVal;
    document.getElementById('res-date').innerText  = dateVal;
    document.getElementById('res-ref').innerText   = 'SDAV-' + Math.floor(Math.random() * 90000 + 10000);
}