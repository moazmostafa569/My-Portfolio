/* ---------------------------------------------
   1. Live "props" preview (variant / size / radius)
--------------------------------------------- */
const demoBtn = document.getElementById('demoBtn');
const codeLine = document.getElementById('codeLine');
const segmented = document.querySelectorAll('.segmented');

const state = { variant: 'primary', size: 'md', radius: 'sharp' };

const sizeMap = {
  sm: { padding: '8px 16px', fontSize: '13px' },
  md: { padding: '11px 22px', fontSize: '14px' },
  lg: { padding: '14px 28px', fontSize: '16px' }
};
const radiusMap = { sharp: '4px', pill: '999px' };

function renderDemoButton(){
  const s = sizeMap[state.size];
  demoBtn.style.padding = s.padding;
  demoBtn.style.fontSize = s.fontSize;
  demoBtn.style.borderRadius = radiusMap[state.radius];

  if(state.variant === 'primary'){
    demoBtn.style.background = 'var(--blue)';
    demoBtn.style.color = '#08101F';
    demoBtn.style.borderColor = 'transparent';
  } else {
    demoBtn.style.background = 'transparent';
    demoBtn.style.color = 'var(--text)';
    demoBtn.style.borderColor = 'var(--border)';
  }

  codeLine.innerHTML =
    `&lt;Button <span class="attr">variant</span>=<span class="str">"${state.variant}"</span> ` +
    `<span class="attr">size</span>=<span class="str">"${state.size}"</span> ` +
    `<span class="attr">radius</span>=<span class="str">"${state.radius}"</span> /&gt;`;
}

segmented.forEach(group => {
  const prop = group.dataset.prop;
  group.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      state[prop] = btn.dataset.value;
      group.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
      renderDemoButton();
    });
  });
});

renderDemoButton();

/* ---------------------------------------------
   2. Marquee: pause on hover (nice touch, respects reduced motion via CSS)
--------------------------------------------- */
const marquee = document.querySelector('.marquee-track');
if (marquee){
  marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}

/* ---------------------------------------------
   3. Scroll-spy nav (highlights the section you're in)
--------------------------------------------- */
const navLinks = document.querySelectorAll('#navLinks a');
const sections = ['about', 'work', 'stack', 'contact'].map(id => document.getElementById(id)).filter(Boolean);

if ('IntersectionObserver' in window && sections.length){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === id));
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

/* ---------------------------------------------
   4. Contact form — sends the visitor's message to your Gmail inbox.
   This uses a lightweight form service so the site can send messages
   without a server-side backend.
--------------------------------------------- */
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const sendBtn = document.getElementById('sendBtn');

function sendContactMessage(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message){
    formStatus.textContent = '// all fields are required';
    formStatus.classList.add('error');
    return;
  }

  formStatus.classList.remove('error');
  formStatus.textContent = '// sending your message…';
  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending…';

  const formData = new FormData(form);
  formData.set('_subject', `Portfolio inquiry from ${name}`);
  formData.set('_captcha', 'false');
  formData.set('_template', 'table');
  formData.set('_replyto', email);
  formData.set('_from', email);
  formData.set('_next', window.location.href);

  fetch('https://formsubmit.co/ajax/moazmostafa569@gmail.com', {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' }
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json().catch(() => ({}));
    })
    .then(() => {
      form.reset();
      formStatus.textContent = '// message sent — thanks!';
    })
    .catch(() => {
      formStatus.textContent = '// something went wrong — please try again';
      formStatus.classList.add('error');
    })
    .finally(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send message →';
    });
}

if (form){
  form.addEventListener('submit', sendContactMessage);
}

/* ---------------------------------------------
   5. Click-to-copy on contact rows
--------------------------------------------- */
const copyHint = document.getElementById('copyHint');
document.querySelectorAll('.copyable').forEach(row => {
  row.addEventListener('click', async () => {
    const value = row.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      if (copyHint) copyHint.textContent = `copied "${value}" to clipboard`;
    } catch {
      if (copyHint) copyHint.textContent = value;
    }
    setTimeout(() => { if (copyHint) copyHint.textContent = 'click a row to copy'; }, 2000);
  });
});

/* ---------------------------------------------
   6. Populate "last shipped" in the ticker
   - Tries the GitHub commits API for this repo's latest commit date
   - Falls back to the current local date if the network/API isn't available
--------------------------------------------- */
const lastShippedEl = document.getElementById('lastShipped');
if (lastShippedEl){
  // helper to format date nicely
  const fmt = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  // Attempt GitHub API first (public repo). If it fails, use today's date.
  fetch('https://api.github.com/repos/moazmostafa569/My-Portfolio/commits?per_page=1')
    .then(res => {
      if (!res.ok) throw new Error('no-github');
      return res.json();
    })
    .then(data => {
      const date = data && data[0] && data[0].commit && data[0].commit.committer && data[0].commit.committer.date;
      if (date) lastShippedEl.textContent = fmt(date);
      else lastShippedEl.textContent = fmt(new Date());
    })
    .catch(() => {
      lastShippedEl.textContent = fmt(new Date());
    });
}
