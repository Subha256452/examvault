/* ===================================================
   ExamVault – app.js
   All interactive logic, data, and rendering
   =================================================== */

// =====================================================
//  DATA
// =====================================================

const SUBJECTS = [
  { name: 'Mathematics', icon: '📐', count: 248, color: '#2563eb' },
  { name: 'Physics', icon: '⚛️', count: 196, color: '#0ea5e9' },
  { name: 'Chemistry', icon: '🧪', count: 184, color: '#10b981' },
  { name: 'Computer Science', icon: '💻', count: 162, color: '#8b5cf6' },
  { name: 'English', icon: '📖', count: 220, color: '#f59e0b' },
  { name: 'Engineering Drawing', icon: '📏', count: 230, color: '#ef4444' },
];

const SUBJECT_PROGRESS = [
  { name: 'Mathematics', pct: 72, color: '#2563eb' },
  { name: 'Physics', pct: 55, color: '#0ea5e9' },
  { name: 'Chemistry', pct: 40, color: '#10b981' },
  { name: 'Computer Science', pct: 88, color: '#8b5cf6' },
  { name: 'English', pct: 65, color: '#f59e0b' },
  { name: 'Engineering Drawing', pct: 30, color: '#ef4444' },
];

const RECENT_ACTIVITY = [
  { text: 'Solved 12 questions in Mathematics', time: '2 hours ago', color: '#2563eb' },
  { text: 'Bookmarked "Bernoulli\'s Principle" – Physics 2022', time: '5 hours ago', color: '#0ea5e9' },
  { text: 'Completed topic "Integration by Parts"', time: 'Yesterday', color: '#10b981' },
  { text: 'Read suggestion: "Focus on Thermodynamics"', time: '2 days ago', color: '#8b5cf6' },
  { text: 'Added note: "Kirchhoff\'s Laws Summary"', time: '3 days ago', color: '#f59e0b' },
];

const UPCOMING_EXAMS = [
  { day: '18', month: 'Oct', name: 'Mathematics Mid-Sem', subject: 'Unit 1–4', days: '18 days' },
  { day: '24', month: 'Oct', name: 'Physics Mid-Sem', subject: 'Unit 1–3', days: '24 days' },
  { day: '02', month: 'Nov', name: 'Chemistry End-Sem', subject: 'Unit 1–6', days: '33 days' },
];

const PYQ_DATA = [
  { id: 1, subject: 'Mathematics', year: 2024, question: 'Evaluate the definite integral ∫₀¹ x²e^x dx using integration by parts.', type: 'Long Answer', marks: '10 Marks', answer: 'Using integration by parts: let u = x², dv = e^x dx. After applying integration by parts twice: Result = e - 2 ≈ 0.718' },
  { id: 2, subject: 'Physics', year: 2023, question: 'State and prove Bernoulli\'s theorem. Mention two real-world applications.', type: 'Long Answer', marks: '10 Marks', answer: 'Bernoulli\'s theorem: P + ½ρv² + ρgh = constant. Applications: Aircraft wings, venturimeter.' },
  { id: 3, subject: 'Mathematics', year: 2023, question: 'Find the general solution of the differential equation dy/dx + y·tan(x) = sec(x).', type: 'Short Answer', marks: '5 Marks', answer: 'This is a linear first-order ODE. Integrating factor: μ = e^∫tan(x)dx = sec(x). Solution: y·sec(x) = tan(x) + C' },
  { id: 4, subject: 'Chemistry', year: 2022, question: 'Explain the mechanism of SN1 and SN2 reactions with suitable examples.', type: 'Long Answer', marks: '10 Marks', answer: 'SN1: Two-step, carbocation intermediate, first-order kinetics. SN2: One-step, backside attack, inversion of configuration, second-order kinetics.' },
  { id: 5, subject: 'Computer Science', year: 2024, question: 'What is the time complexity of Quick Sort in best, average, and worst cases? Explain with reasoning.', type: 'Short Answer', marks: '5 Marks', answer: 'Best: O(n log n), Average: O(n log n), Worst: O(n²) when pivot is always the smallest/largest element.' },
  { id: 6, subject: 'Physics', year: 2022, question: 'Derive an expression for the moment of inertia of a solid cylinder about its central axis.', type: 'Long Answer', marks: '10 Marks', answer: 'I = ½MR² for a solid cylinder rotating about its central axis, derived by integrating dm·r² over the volume.' },
  { id: 7, subject: 'Mathematics', year: 2022, question: 'Using matrix method, solve: 2x + y + z = 1, x - y + z = 0, x + y - z = 2.', type: 'Long Answer', marks: '10 Marks', answer: 'Using Cramer\'s Rule or inverse matrix: x = 3/4, y = 1/2, z = -1/4' },
  { id: 8, subject: 'Computer Science', year: 2023, question: 'Write an algorithm to perform BFS on a graph. State its time and space complexity.', type: 'Short Answer', marks: '5 Marks', answer: 'BFS uses a queue. Time: O(V+E), Space: O(V). Algorithm: enqueue start, visit neighbors level by level.' },
  { id: 9, subject: 'Chemistry', year: 2024, question: 'Define buffer solution. Calculate the pH of a buffer containing 0.1M CH₃COOH and 0.1M CH₃COONa (Ka = 1.8×10⁻⁵).', type: 'Numerical', marks: '5 Marks', answer: 'Using Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]) = 4.74 + log(1) = 4.74' },
  { id: 10, subject: 'English', year: 2021, question: 'Write a technical report on "Water Conservation Methods in Urban Areas" in approximately 400 words.', type: 'Long Answer', marks: '10 Marks', answer: 'Technical report should include: Introduction, Objectives, Methods (rainwater harvesting, recycling, smart meters), Conclusion.' },
  { id: 11, subject: 'Mathematics', year: 2021, question: 'State Rolle\'s theorem. Verify it for f(x) = x² - 5x + 6 on [2, 3].', type: 'Short Answer', marks: '5 Marks', answer: 'Rolle\'s theorem: f is continuous on [a,b], differentiable on (a,b), f(a)=f(b) ⟹ ∃c∈(a,b): f\'(c)=0. For f(x): f\'(x)=2x-5=0 at x=2.5 ∈ (2,3) ✓' },
  { id: 12, subject: 'Physics', year: 2024, question: 'Explain the photoelectric effect. Write Einstein\'s photoelectric equation and define threshold frequency.', type: 'Short Answer', marks: '5 Marks', answer: 'Einstein\'s equation: KE_max = hf - φ. Threshold frequency: f₀ = φ/h. Below f₀, no photoelectric effect regardless of intensity.' },
  { id: 13, subject: 'Computer Science', year: 2022, question: 'What is a binary search tree (BST)? Write algorithm for insertion and deletion operations.', type: 'Long Answer', marks: '10 Marks', answer: 'BST: Each node\'s left subtree < node < right subtree. Insertion: compare and traverse. Deletion: three cases (leaf, one child, two children).' },
  { id: 14, subject: 'Mathematics', year: 2020, question: 'Find the Laplace transform of f(t) = t·sin(at) from first principles.', type: 'Short Answer', marks: '5 Marks', answer: 'L{t·sin(at)} = 2as/(s²+a²)² using differentiation of transform formula.' },
];

const SUGGESTIONS_DATA = [
  { id: 1, subject: 'Mathematics', title: 'Integration is Your Golden Ticket', priority: 'high', text: 'Integration by Parts and Definite Integrals have appeared in EVERY exam for the past 9 years. If you study nothing else in Calculus, master these two. Expect a 10-mark question guaranteed.', date: '2 Oct 2026', tags: ['Unit 4', 'Calculus', 'Must Do'] },
  { id: 2, subject: 'Physics', title: 'Fluid Mechanics – Don\'t Skip It', priority: 'high', text: 'Bernoulli\'s theorem and its applications have been asked 8 out of 10 years. Also prepare equation of continuity. Together these can fetch you 15–20 marks.', date: '1 Oct 2026', tags: ['Unit 5', 'Fluids'] },
  { id: 3, subject: 'Computer Science', title: 'Graph Algorithms Are Trending', priority: 'medium', text: 'BFS, DFS, Dijkstra, and Prim\'s algorithm have seen a 60% increase in frequency over the last 4 years. Invest time here for high returns.', date: '29 Sep 2026', tags: ['Unit 3', 'Graphs', 'Trending'] },
  { id: 4, subject: 'Chemistry', title: 'Organic Reaction Mechanisms Matter', priority: 'high', text: 'SN1, SN2, and Markovnikov\'s rule are consistently tested. For SN1 vs SN2, also memorize conditions favoring each (polarity, substrate type).', date: '28 Sep 2026', tags: ['Organic', 'Unit 2'] },
  { id: 5, subject: 'General', title: 'Revise Previous 3 Years First', priority: 'medium', text: 'Studies show that 60% of exam questions come directly from or are very similar to questions asked in the last 3 years. Prioritize 2022, 2023, 2024.', date: '27 Sep 2026', tags: ['Strategy', 'Revision'] },
  { id: 6, subject: 'Mathematics', title: 'Skip Progressions (AP/GP) for Now', priority: 'low', text: 'Arithmetic and Geometric Progressions have not appeared since 2020. With limited time, deprioritize this and focus on Differential Equations and Matrices which are more frequent.', date: '26 Sep 2026', tags: ['Strategy', 'Unit 1'] },
  { id: 7, subject: 'Physics', title: 'Thermodynamics – Medium Risk, High Reward', priority: 'medium', text: 'First and Second Law of Thermodynamics along with Carnot cycle appeared 7 of 10 years. Often linked with Kinetic Theory. Study them together.', date: '25 Sep 2026', tags: ['Unit 3', 'Thermodynamics'] },
  { id: 8, subject: 'General', title: 'Attempt Strategy: 5-Mark Questions First', priority: 'medium', text: 'Our analysis of toppers shows: Start with 5-mark short answers, then 10-mark long answers. This ensures you attempt maximum questions if time runs out.', date: '24 Sep 2026', tags: ['Exam Day', 'Strategy'] },
  { id: 9, subject: 'Computer Science', title: 'Sorting Algorithms – Know the Complexities', priority: 'high', text: 'Bubble sort, Quick sort, Merge sort, and Heap sort complexities are asked almost every year. Create a comparison table and memorize it.', date: '23 Sep 2026', tags: ['Unit 2', 'Algorithms'] },
];

const LEADERBOARD_DATA_WEEKLY = [
  { name: 'Priya Sharma', initials: 'PS', solved: 89, score: 4200, badge: '🥇' },
  { name: 'Rahul Verma', initials: 'RV', solved: 76, score: 3980, badge: '🥈' },
  { name: 'Sneha Patel', initials: 'SP', solved: 71, score: 3750, badge: '🥉' },
  { name: 'Arjun Singh', initials: 'AS', solved: 68, score: 3620, badge: '⭐' },
  { name: 'Divya Nair', initials: 'DN', solved: 65, score: 3510, badge: '⭐' },
  { name: 'Karan Mehta', initials: 'KM', solved: 60, score: 3430, badge: '⭐' },
  { name: 'Ananya Roy', initials: 'AR', solved: 58, score: 3390, badge: '' },
  { name: 'Vikram Joshi', initials: 'VJ', solved: 52, score: 3310, badge: '' },
  { name: 'Meera Iyer', initials: 'MI', solved: 49, score: 3270, badge: '' },
  { name: 'Shivam Gupta', initials: 'SG', solved: 46, score: 3250, badge: '' },
  { name: 'Tanvi Desai', initials: 'TD', solved: 44, score: 3243, badge: '' },
  { name: 'Aryan Kumar', initials: 'AK', solved: 43, score: 3240, badge: '', isMe: true },
  { name: 'Neha Saxena', initials: 'NS', solved: 40, score: 3100, badge: '' },
  { name: 'Rohit Bhat', initials: 'RB', solved: 38, score: 2990, badge: '' },
  { name: 'Pooja Tiwari', initials: 'PT', solved: 35, score: 2840, badge: '' },
];

const PLANS_DATA = [
  {
    name: 'Free',
    priceMonthly: '₹0',
    priceYearly: '₹0',
    desc: 'Perfect for getting started',
    popular: false,
    features: [
      { text: 'Access to 200 PYQs', included: true },
      { text: '3-year trend analysis', included: true },
      { text: '5 bookmarks', included: true },
      { text: 'Basic leaderboard', included: true },
      { text: 'Team suggestions (limited)', included: true },
      { text: '10-year full analysis', included: false },
      { text: 'Unlimited bookmarks & notes', included: false },
      { text: 'Priority suggestions', included: false },
      { text: 'Exam countdown reminders', included: false },
    ],
    cta: 'Current Plan',
    ctaStyle: 'outline',
  },
  {
    name: 'Pro',
    priceMonthly: '₹99',
    priceYearly: '₹69',
    desc: 'Best for serious exam prep',
    popular: true,
    features: [
      { text: 'Access to ALL 1,240+ PYQs', included: true },
      { text: '10-year full trend analysis', included: true },
      { text: 'Unlimited bookmarks & notes', included: true },
      { text: 'Full leaderboard access', included: true },
      { text: 'All team suggestions', included: true },
      { text: 'Topic heatmaps', included: true },
      { text: 'Exam countdown reminders', included: true },
      { text: 'Priority email support', included: false },
      { text: 'Offline PDF downloads', included: false },
    ],
    cta: 'Get Pro',
    ctaStyle: 'filled',
  },
  {
    name: 'Elite',
    priceMonthly: '₹199',
    priceYearly: '₹139',
    desc: 'For top rankers who want everything',
    popular: false,
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Offline PDF downloads', included: true },
      { text: 'Personal study plan', included: true },
      { text: 'Early access to new features', included: true },
      { text: 'Custom subject filters', included: true },
      { text: 'Monthly performance report', included: true },
      { text: 'Dedicated mentor Q&A', included: true },
    ],
    cta: 'Get Elite',
    ctaStyle: 'outline',
  },
];

const FAQS = [
  { q: 'Can I upgrade or downgrade my plan anytime?', a: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features. Downgrading takes effect at the end of your current billing cycle.' },
  { q: 'Is the free plan really free forever?', a: 'Yes, the Free plan is completely free with no hidden charges. You get access to 200 PYQs, basic analysis, and limited suggestions forever.' },
  { q: 'What payment methods will be accepted?', a: 'We will soon support UPI, Debit/Credit Cards, Net Banking, and popular wallets like Paytm and PhonePe. Stay tuned!' },
  { q: 'How often is the PYQ database updated?', a: 'Our team updates the PYQ database after each exam cycle. New questions are verified and uploaded within 2–3 weeks of each semester exam.' },
  { q: 'Are the suggestions made by real educators?', a: 'Yes! All suggestions are curated by our team of experienced educators and toppers who have analyzed exam patterns extensively.' },
];

const CHART_DATA = {
  Mathematics: {
    frequency: { labels: ['Integration', 'Matrices', 'Diff. Eq.', 'Laplace', 'Vectors', 'Progressions', 'Complex No.'], data: [18, 14, 12, 10, 9, 4, 7] },
    marks: { labels: ['2 Marks', '5 Marks', '10 Marks'], data: [20, 40, 40] },
    type: { labels: ['Long Answer', 'Short Answer', 'Numerical', 'MCQ'], data: [45, 35, 15, 5] },
    year: { labels: ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'], data: [82,88,91,85,94,78,96,90,88,95] },
    insights: { most: 'Integration (18 times)', rising: 'Differential Equations', high: 'Unit 4 – Calculus', declining: 'Progressions (AP/GP)' }
  },
  Physics: {
    frequency: { labels: ['Fluid Mech.', 'Thermodynamics', 'Optics', 'Electrostatics', 'Modern Physics', 'Waves', 'Mechanics'], data: [16, 14, 11, 13, 10, 8, 12] },
    marks: { labels: ['2 Marks', '5 Marks', '10 Marks'], data: [15, 38, 47] },
    type: { labels: ['Long Answer', 'Short Answer', 'Numerical', 'MCQ'], data: [50, 28, 18, 4] },
    year: { labels: ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'], data: [76,80,84,79,88,72,90,86,84,91] },
    insights: { most: 'Fluid Mechanics (16 times)', rising: 'Modern Physics', high: 'Unit 5 – Fluid Mech.', declining: 'Simple Harmonic Motion' }
  },
  Chemistry: {
    frequency: { labels: ['Organic Rxns', 'Electrochemistry', 'Thermodynamics', 'Chemical Eq.', 'Buffer Sol.', 'Polymers', 'States of Matter'], data: [15, 12, 11, 9, 8, 6, 10] },
    marks: { labels: ['2 Marks', '5 Marks', '10 Marks'], data: [25, 42, 33] },
    type: { labels: ['Long Answer', 'Short Answer', 'Numerical', 'MCQ'], data: [40, 32, 20, 8] },
    year: { labels: ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'], data: [74,78,80,77,84,70,88,82,80,87] },
    insights: { most: 'Organic Reactions (15 times)', rising: 'Electrochemistry', high: 'Unit 2 – Organic', declining: 'Nuclear Chemistry' }
  },
  'Computer Science': {
    frequency: { labels: ['Sorting', 'Graphs', 'Trees', 'DP', 'Searching', 'Complexity', 'Hashing'], data: [17, 15, 14, 11, 10, 9, 8] },
    marks: { labels: ['2 Marks', '5 Marks', '10 Marks'], data: [18, 44, 38] },
    type: { labels: ['Long Answer', 'Short Answer', 'Numerical', 'MCQ'], data: [42, 36, 8, 14] },
    year: { labels: ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'], data: [80,84,88,86,92,88,95,91,90,96] },
    insights: { most: 'Sorting Algorithms (17 times)', rising: 'Graph Algorithms', high: 'Unit 3 – Graphs', declining: 'Assembly Language' }
  }
};

const HEATMAP_TOPICS = ['Integration', 'Matrices', 'Diff. Eq.', 'Laplace', 'Vectors', 'Complex No.'];
const HEATMAP_YEARS = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'];
const HEATMAP_VALUES = [
  [5,5,4,5,4,5,5,5,5,5],
  [3,4,4,3,4,3,4,5,4,4],
  [2,3,2,3,3,4,4,4,5,5],
  [3,3,3,4,3,2,3,3,3,4],
  [2,2,3,2,3,3,3,3,3,3],
  [2,2,2,2,1,2,2,2,2,2],
];

// =====================================================
//  STATE
// =====================================================
let bookmarkedIds = new Set([2, 5, 8]);
let userNotes = [
  { id: 1, title: "Kirchhoff's Laws Summary", subject: "Physics", content: "KVL: Sum of voltages in any closed loop = 0. KCL: Sum of currents at a node = 0. Used for circuit analysis.", date: "Sep 28, 2026" },
  { id: 2, title: "Integration Formulas Cheatsheet", subject: "Mathematics", content: "∫sin(x)dx = -cos(x)+C, ∫cos(x)dx = sin(x)+C, ∫eˣdx = eˣ+C, ∫1/x dx = ln|x|+C. Integration by parts: ∫u dv = uv - ∫v du.", date: "Sep 25, 2026" },
];
let currentChart = null;
let currentAnalysisTab = 'frequency';
let isYearly = false;

// =====================================================
//  NAVIGATION
// =====================================================
const PAGE_TITLES = {
  dashboard: 'Dashboard',
  pyq: 'PYQ Browser',
  analysis: '10-Year Analysis',
  suggestions: 'Expert Suggestions',
  notes: 'Notes & Bookmarks',
  leaderboard: 'Leaderboard',
  subscription: 'Plans',
};

function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
  const navItem = document.getElementById('nav-' + pageId);
  if (navItem) navItem.classList.add('active');
  document.getElementById('topbarTitle').textContent = PAGE_TITLES[pageId] || '';
  window.scrollTo(0, 0);
  if (pageId === 'analysis') initChart();
  if (pageId === 'leaderboard') renderLeaderboard('weekly');
  if (pageId === 'notes') renderBookmarks();
  if (pageId === 'subscription') renderPlans();
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const page = item.dataset.page;
    navigateTo(page);
    if (window.innerWidth <= 820) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });
});

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// =====================================================
//  DASHBOARD RENDER
// =====================================================
function renderDashboard() {
  // Progress
  const pl = document.getElementById('progressList');
  pl.innerHTML = SUBJECT_PROGRESS.map(s => `
    <div class="progress-item">
      <div class="progress-top">
        <span class="progress-subject">${s.name}</span>
        <span class="progress-pct">${s.pct}%</span>
      </div>
      <div class="progress-bar-outer">
        <div class="progress-bar-inner" style="width:${s.pct}%;background:linear-gradient(90deg,${s.color},${s.color}aa)"></div>
      </div>
    </div>
  `).join('');

  // Activity
  const al = document.getElementById('activityList');
  al.innerHTML = RECENT_ACTIVITY.map(a => `
    <div class="activity-item">
      <div class="activity-dot" style="background:${a.color}"></div>
      <div>
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join('');

  // Subject chips
  const sc = document.getElementById('subjectChips');
  sc.innerHTML = SUBJECTS.map(s => `
    <div class="subject-chip" onclick="goToPYQ('${s.name}')">
      <span class="chip-icon">${s.icon}</span>
      <span>${s.name}</span>
      <span class="chip-count">${s.count} PYQs</span>
    </div>
  `).join('');

  // Exam list
  const el = document.getElementById('examList');
  el.innerHTML = UPCOMING_EXAMS.map(e => `
    <div class="exam-item">
      <div class="exam-date-box">
        <div class="exam-day">${e.day}</div>
        <div class="exam-month">${e.month}</div>
      </div>
      <div>
        <div class="exam-name">${e.name}</div>
        <div class="exam-sub">${e.subject}</div>
      </div>
      <div class="exam-countdown">in ${e.days}</div>
    </div>
  `).join('');
}

function goToPYQ(subject) {
  navigateTo('pyq');
  document.getElementById('filterSubject').value = subject;
  filterPYQs();
}

// =====================================================
//  PYQ BROWSER
// =====================================================
function renderPYQs(data) {
  const grid = document.getElementById('pyqGrid');
  const info = document.getElementById('pyqResultsInfo');
  info.innerHTML = `Showing <strong>${data.length}</strong> questions`;
  if (data.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">😕 No questions found matching your filters.</div>`;
    return;
  }
  grid.innerHTML = data.map(q => `
    <div class="pyq-card" onclick="openQuestion(${q.id})">
      <div class="pyq-card-top">
        <span class="pyq-subject">${q.subject}</span>
        <span class="pyq-year">${q.year}</span>
      </div>
      <div class="pyq-question">${q.question}</div>
      <div class="pyq-footer">
        <div class="pyq-meta">
          <span class="pyq-type">${q.type}</span>
          <span class="pyq-marks">${q.marks}</span>
        </div>
        <div class="pyq-actions" onclick="event.stopPropagation()">
          <button class="pyq-btn ${bookmarkedIds.has(q.id) ? 'bookmarked' : ''}" 
            onclick="toggleBookmark(${q.id}, this)" id="bm-btn-${q.id}">
            ${bookmarkedIds.has(q.id) ? '★ Saved' : '☆ Save'}
          </button>
          <button class="pyq-btn" onclick="openQuestion(${q.id})">View</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterPYQs() {
  const sub = document.getElementById('filterSubject').value;
  const year = document.getElementById('filterYear').value;
  const type = document.getElementById('filterType').value;
  const marks = document.getElementById('filterMarks').value;
  let filtered = PYQ_DATA.filter(q => {
    return (!sub || q.subject === sub) &&
           (!year || q.year === parseInt(year)) &&
           (!type || q.type === type) &&
           (!marks || q.marks === marks);
  });
  renderPYQs(filtered);
}

function resetFilters() {
  ['filterSubject','filterYear','filterType','filterMarks'].forEach(id => {
    document.getElementById(id).value = '';
  });
  renderPYQs(PYQ_DATA);
}

function toggleBookmark(id, btn) {
  if (bookmarkedIds.has(id)) {
    bookmarkedIds.delete(id);
    btn.textContent = '☆ Save';
    btn.classList.remove('bookmarked');
    showToast('Bookmark removed');
  } else {
    bookmarkedIds.add(id);
    btn.textContent = '★ Saved';
    btn.classList.add('bookmarked');
    showToast('Question bookmarked! ⭐', 'success');
  }
}

function openQuestion(id) {
  const q = PYQ_DATA.find(x => x.id === id);
  if (!q) return;
  document.getElementById('questionModalContent').innerHTML = `
    <h3>${q.subject} – ${q.year}</h3>
    <div class="modal-tags">
      <span class="pyq-subject">${q.subject}</span>
      <span class="pyq-year">${q.year}</span>
      <span class="pyq-type">${q.type}</span>
      <span class="pyq-marks">${q.marks}</span>
    </div>
    <div class="modal-q"><strong>Question:</strong><br/>${q.question}</div>
    <div class="modal-answer">
      <div class="modal-answer-title">✅ Suggested Answer</div>
      ${q.answer}
    </div>
  `;
  document.getElementById('questionModal').classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
document.getElementById('questionModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal('questionModal');
});

// =====================================================
//  ANALYSIS / CHARTS
// =====================================================
function initChart() {
  const subject = document.getElementById('analysisSubject').value;
  renderChart(subject, currentAnalysisTab);
  renderHeatmap();
}

function switchAnalysisTab(tab, btn) {
  document.querySelectorAll('.atab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentAnalysisTab = tab;
  const subject = document.getElementById('analysisSubject').value;
  renderChart(subject, tab);
}

function updateChart() {
  const subject = document.getElementById('analysisSubject').value;
  renderChart(subject, currentAnalysisTab);
  updateInsights(subject);
}

function updateInsights(subject) {
  const ins = CHART_DATA[subject]?.insights;
  if (!ins) return;
  document.getElementById('mostAsked').textContent = ins.most;
  document.getElementById('risingTopic').textContent = ins.rising;
  document.getElementById('highYield').textContent = ins.high;
  document.getElementById('decliningTopic').textContent = ins.declining;
}

function renderChart(subject, tab) {
  const ctx = document.getElementById('mainChart').getContext('2d');
  if (currentChart) currentChart.destroy();

  const sd = CHART_DATA[subject] || CHART_DATA['Mathematics'];
  let config;
  const colors = ['#2563eb','#0ea5e9','#10b981','#f59e0b','#8b5cf6','#ef4444','#64748b'];

  const tabLabels = { frequency: 'Topic Frequency', marks: 'Marks Distribution', type: 'Question Types', year: 'Year-wise Total Marks' };
  document.getElementById('chartTitle').textContent = `${tabLabels[tab]} – ${subject} (2015–2024)`;

  if (tab === 'frequency') {
    config = {
      type: 'bar',
      data: {
        labels: sd.frequency.labels,
        datasets: [{ label: 'Times Asked', data: sd.frequency.data, backgroundColor: colors, borderRadius: 8, borderSkipped: false }]
      },
      options: { ...getBaseOptions(), plugins: { legend: { display: false } } }
    };
  } else if (tab === 'marks') {
    config = {
      type: 'doughnut',
      data: {
        labels: sd.marks.labels,
        datasets: [{ data: sd.marks.data, backgroundColor: ['#bfdbfe','#3b82f6','#1d4ed8'], borderWidth: 0 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } }, cutout: '65%' }
    };
  } else if (tab === 'type') {
    config = {
      type: 'pie',
      data: {
        labels: sd.type.labels,
        datasets: [{ data: sd.type.data, backgroundColor: ['#2563eb','#0ea5e9','#10b981','#f59e0b'], borderWidth: 0 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
    };
  } else if (tab === 'year') {
    config = {
      type: 'line',
      data: {
        labels: sd.year.labels,
        datasets: [{
          label: 'Total Marks', data: sd.year.data,
          borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,.1)',
          fill: true, tension: 0.4, borderWidth: 2.5,
          pointBackgroundColor: '#2563eb', pointRadius: 4
        }]
      },
      options: { ...getBaseOptions(), plugins: { legend: { display: false } } }
    };
  }

  currentChart = new Chart(ctx, config);
  updateInsights(subject);
}

function getBaseOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { backgroundColor: '#1e293b', titleColor: '#fff', bodyColor: '#94a3b8', cornerRadius: 8 }
    },
    scales: {
      x: { grid: { color: 'rgba(0,0,0,.04)' }, ticks: { color: '#64748b', font: { size: 12 } } },
      y: { grid: { color: 'rgba(0,0,0,.04)' }, ticks: { color: '#64748b', font: { size: 12 } } }
    }
  };
}

function renderHeatmap() {
  const container = document.getElementById('heatmapContainer');
  let html = '<table class="heatmap-table"><thead><tr><th>Topic / Year</th>';
  HEATMAP_YEARS.forEach(y => html += `<th>${y}</th>`);
  html += '</tr></thead><tbody>';
  HEATMAP_TOPICS.forEach((topic, ti) => {
    html += `<tr><td style="font-weight:600;text-align:left">${topic}</td>`;
    HEATMAP_YEARS.forEach((_, yi) => {
      const val = HEATMAP_VALUES[ti][yi];
      html += `<td class="heat-${val}">${val}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

// =====================================================
//  SUGGESTIONS
// =====================================================
function renderSuggestions(data) {
  const grid = document.getElementById('suggestionsGrid');
  if (data.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">No suggestions for this category yet.</div>`;
    return;
  }
  grid.innerHTML = data.map(s => `
    <div class="suggestion-card priority-${s.priority}">
      <div class="sug-header">
        <span class="sug-subject">${s.subject}</span>
        <span class="sug-priority ${s.priority}">${s.priority === 'high' ? '🔥 High' : s.priority === 'medium' ? '⚡ Medium' : '✅ Low'}</span>
      </div>
      <div class="sug-title">${s.title}</div>
      <div class="sug-text">${s.text}</div>
      <div class="sug-footer">
        <div class="sug-tags">${s.tags.map(t => `<span class="sug-tag">${t}</span>`).join('')}</div>
        <div class="sug-meta">📅 ${s.date}</div>
      </div>
    </div>
  `).join('');
}

function filterSuggestions(cat, btn) {
  document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filtered = cat === 'all' ? SUGGESTIONS_DATA : SUGGESTIONS_DATA.filter(s => s.subject === cat);
  renderSuggestions(filtered);
}

// =====================================================
//  NOTES & BOOKMARKS
// =====================================================
function switchNotesTab(tab, btn) {
  document.querySelectorAll('.ntab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (tab === 'bookmarks') {
    document.getElementById('bookmarksContent').style.display = 'block';
    document.getElementById('notesContent').style.display = 'none';
    renderBookmarks();
  } else {
    document.getElementById('bookmarksContent').style.display = 'none';
    document.getElementById('notesContent').style.display = 'block';
    renderNotes();
  }
}

function renderBookmarks() {
  const grid = document.getElementById('bookmarkGrid');
  const bookmarked = PYQ_DATA.filter(q => bookmarkedIds.has(q.id));
  if (bookmarked.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-muted)">
      <div style="font-size:48px;margin-bottom:12px">☆</div>
      <div style="font-size:16px;font-weight:600">No bookmarks yet</div>
      <div style="font-size:13px;margin-top:6px">Go to PYQ Browser and save questions you want to revisit.</div>
    </div>`;
    return;
  }
  grid.innerHTML = bookmarked.map(q => `
    <div class="pyq-card" onclick="openQuestion(${q.id})">
      <div class="pyq-card-top">
        <span class="pyq-subject">${q.subject}</span>
        <span class="pyq-year">${q.year}</span>
      </div>
      <div class="pyq-question">${q.question}</div>
      <div class="pyq-footer">
        <div class="pyq-meta">
          <span class="pyq-type">${q.type}</span>
          <span class="pyq-marks">${q.marks}</span>
        </div>
        <div class="pyq-actions" onclick="event.stopPropagation()">
          <button class="pyq-btn bookmarked" onclick="removeFromBookmarks(${q.id}, this)">★ Saved</button>
          <button class="pyq-btn" onclick="openQuestion(${q.id})">View</button>
        </div>
      </div>
    </div>
  `).join('');
}

function removeFromBookmarks(id, btn) {
  bookmarkedIds.delete(id);
  showToast('Bookmark removed');
  renderBookmarks();
}

function renderNotes() {
  const list = document.getElementById('notesList');
  if (userNotes.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted)">No notes yet. Add your first note above!</div>`;
    return;
  }
  list.innerHTML = userNotes.map(n => `
    <div class="note-card" id="note-${n.id}">
      <div class="note-card-header">
        <div>
          <div class="note-card-title">${n.title}</div>
          <div class="note-card-sub">${n.subject} · ${n.date}</div>
        </div>
        <button class="note-del-btn" onclick="deleteNote(${n.id})">🗑</button>
      </div>
      <div class="note-card-body">${n.content}</div>
    </div>
  `).join('');
}

function addNote() {
  const title = document.getElementById('noteTitle').value.trim();
  const subject = document.getElementById('noteSubject').value;
  const content = document.getElementById('noteContent').value.trim();
  if (!title || !content) { showToast('Please fill title and content', 'warning'); return; }
  const now = new Date();
  const date = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  userNotes.unshift({ id: Date.now(), title, subject, content, date });
  document.getElementById('noteTitle').value = '';
  document.getElementById('noteContent').value = '';
  renderNotes();
  showToast('Note saved! 📝', 'success');
}

function deleteNote(id) {
  userNotes = userNotes.filter(n => n.id !== id);
  renderNotes();
  showToast('Note deleted');
}

// =====================================================
//  LEADERBOARD
// =====================================================
function switchLeaderboard(period, btn) {
  document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLeaderboard(period);
}

function renderLeaderboard(period) {
  // Shuffle data slightly for different periods
  let data = [...LEADERBOARD_DATA_WEEKLY];
  if (period === 'monthly') {
    data = data.map(d => ({ ...d, solved: Math.round(d.solved * 4.2), score: Math.round(d.score * 4) }));
  } else if (period === 'alltime') {
    data = data.map(d => ({ ...d, solved: Math.round(d.solved * 18), score: Math.round(d.score * 16) }));
  }

  const tbody = document.getElementById('leaderboardBody');
  const rankClasses = ['rank-1','rank-2','rank-3'];
  tbody.innerHTML = data.map((d, i) => `
    <tr class="${d.isMe ? 'my-row' : ''}">
      <td class="rank-cell ${rankClasses[i] || ''}">
        ${i < 3 ? ['🥇','🥈','🥉'][i] : '#' + (i+1)}
      </td>
      <td>
        <div class="student-cell">
          <div class="student-av">${d.initials}</div>
          <span>${d.name}${d.isMe ? ' <strong>(You)</strong>' : ''}</span>
        </div>
      </td>
      <td>${d.solved.toLocaleString()}</td>
      <td><strong>${d.score.toLocaleString()}</strong></td>
      <td class="ldr-badge">${d.badge}</td>
    </tr>
  `).join('');
}

// =====================================================
//  SUBSCRIPTION
// =====================================================
function toggleBilling() {
  isYearly = document.getElementById('billingToggle').checked;
  renderPlans();
}

function renderPlans() {
  const grid = document.getElementById('plansGrid');
  grid.innerHTML = PLANS_DATA.map(p => `
    <div class="plan-card ${p.popular ? 'popular' : ''}">
      ${p.popular ? '<div class="popular-badge">⭐ Most Popular</div>' : ''}
      <div class="plan-name">${p.name}</div>
      <div class="plan-price">${isYearly ? p.priceYearly : p.priceMonthly}<span>/mo</span></div>
      <div class="plan-desc">${p.desc}${isYearly && p.priceMonthly !== '₹0' ? ' · Billed yearly' : ''}</div>
      <ul class="plan-features">
        ${p.features.map(f => `
          <li>
            <span class="${f.included ? 'feat-check' : 'feat-cross'}">${f.included ? '✓' : '✗'}</span>
            <span style="color:${f.included ? 'var(--text)' : 'var(--text-light)'}">${f.text}</span>
          </li>
        `).join('')}
      </ul>
      <button class="plan-cta ${p.ctaStyle}" onclick="planClick('${p.name}')">${p.cta}</button>
    </div>
  `).join('');

  // FAQs
  if (!document.getElementById('faqList').children.length) {
    document.getElementById('faqList').innerHTML = FAQS.map((f, i) => `
      <div class="faq-item" id="faq-${i}">
        <button class="faq-q" onclick="toggleFAQ(${i})">
          ${f.q}
          <span class="faq-chevron">▾</span>
        </button>
        <div class="faq-a">${f.a}</div>
      </div>
    `).join('');
  }
}

function planClick(name) {
  if (name === 'Free') { showToast("You're already on the Free plan!", 'warning'); return; }
  showToast(`Payments coming soon! We'll notify you when ${name} is available. 🎉`, 'success');
}

function toggleFAQ(i) {
  const item = document.getElementById('faq-' + i);
  item.classList.toggle('open');
}

// =====================================================
//  TOAST
// =====================================================
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// =====================================================
//  GLOBAL SEARCH
// =====================================================
document.getElementById('globalSearch').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && this.value.trim()) {
    const q = this.value.trim().toLowerCase();
    navigateTo('pyq');
    const results = PYQ_DATA.filter(x =>
      x.question.toLowerCase().includes(q) ||
      x.subject.toLowerCase().includes(q) ||
      x.type.toLowerCase().includes(q)
    );
    renderPYQs(results);
    this.value = '';
    showToast(`Found ${results.length} results for "${q}"`);
  }
});

// =====================================================
//  INIT
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  renderDashboard();
  renderPYQs(PYQ_DATA);
  renderSuggestions(SUGGESTIONS_DATA);
  renderBookmarks();
  renderNotes();
  renderLeaderboard('weekly');
  renderPlans();
});
