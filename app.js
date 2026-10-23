const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const colours = {
  olive: { name: 'Heritage Olive', hex: '#78816B', description: 'Grounded, calm and full of character. A natural partner for warm woods and soft linen.' },
  linen: { name: 'Soft Linen', hex: '#D9CDB9', description: 'An easy, welcoming neutral. Soft warmth that lets natural textures and treasured pieces shine.' },
  clay: { name: 'Warm Clay', hex: '#B7826F', description: 'Earthy warmth with a little personality. A beautiful direction for a cosy room or a feature wall.' },
  blue: { name: 'Evening Blue', hex: '#617785', description: 'Quietly confident and wonderfully restful. Try this direction for a bedroom, study or reading corner.' },
  chalk: { name: 'Chalk White', hex: '#E6E2D8', description: 'Fresh, soft and versatile. A gentle backdrop for crisp woodwork, natural materials and changing light.' }
};
let selectedColour = colours.olive;
let requestedColour = null;
document.querySelectorAll('[data-colour]').forEach(button => button.addEventListener('click', () => {
  selectedColour = colours[button.dataset.colour];
  document.querySelector('.colour-room').style.setProperty('--wall-colour', selectedColour.hex);
  document.querySelector('#room-colour-label').textContent = selectedColour.name;
  document.querySelector('#room-title').textContent = `A simple panelled room with walls in ${selectedColour.name}`;
  document.querySelector('#colour-name').firstChild.textContent = `${selectedColour.name} `;
  document.querySelector('#colour-hex').textContent = selectedColour.hex;
  document.querySelector('#colour-description').textContent = selectedColour.description;
  document.querySelectorAll('[data-colour]').forEach(swatch => {
    const active = swatch === button;
    swatch.classList.toggle('active', active);
    swatch.setAttribute('aria-pressed', String(active));
  });
}));

const projects = {
  interior: {title:'A little colour. A lot of character.',description:'Heritage olive, considered panelling and soft daylight. A residential colour direction that pairs timeless architecture with a warm, modern feel.',alt:'Concept living room with olive painted panelling, cream upholstery and decorative cornicing.'},
  commercial: {title:'Room for a fresh perspective.',description:'Warm neutrals, natural wood and a confident touch of green. A commercial interior concept with a calm, welcoming first impression.',alt:'Concept workspace reception featuring warm white walls, a green alcove and an oak counter.'},
  exterior: {title:'A warm welcome starts here.',description:'A deep green entrance against traditional brick and crisp pale trim. An exterior colour concept to inspire a conversation about your property.',alt:'Concept British townhouse entrance with a green painted front door and cream surround.'}
};
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.project;
  const project = projects[key];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  const image = document.querySelector('#dialog-image');
  image.src = `assets/${key}.webp`;
  image.alt = project.alt;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect=dialog.getBoundingClientRect(); if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
document.querySelector('#dialog-contact').addEventListener('click', () => { dialog.close(); setTimeout(() => document.querySelector('#contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}), 0); });

const form = document.querySelector('#enquiry-form');
const result = document.querySelector('#enquiry-result');
const message = document.querySelector('#enquiry-message');
function showForm() { result.hidden = true; form.hidden = false; }
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { showForm(); form.elements.service.value = link.dataset.service; }));
document.querySelector('#use-colour').addEventListener('click', () => {
  showForm();
  requestedColour = selectedColour;
  form.elements.service.value = 'Residential painting';
  const oldLine = form.elements.details.value.match(/\n?Colour direction: [^\n]*/);
  if (oldLine) form.elements.details.value = form.elements.details.value.replace(oldLine[0], '');
  form.elements.details.value = `${form.elements.details.value.trim()}${form.elements.details.value.trim() ? '\n' : ''}Colour direction: ${requestedColour.name} (${requestedColour.hex}).`;
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  message.value = `Hi Calvin, I’m ${String(data.get('name')).trim()}. I’d like to discuss a painting and decorating project.\n\nProject: ${data.get('service')}\nPostcode: ${String(data.get('postcode')).trim().toUpperCase()}\n\n${String(data.get('details')).trim()}\n\nCould we discuss the next steps and your availability? Thank you!`;
  form.hidden = true;
  result.hidden = false;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#copy-enquiry').focus({preventScroll:true});
});
document.querySelector('#copy-enquiry').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(message.value);
    document.querySelector('#copy-status').textContent = 'Copied. Open Instagram and paste your message to send it.';
  } catch {
    message.focus();
    message.select();
    document.querySelector('#copy-status').textContent = 'Your message is selected. Use Copy on your device, then paste it into Instagram.';
  }
});
document.querySelector('#edit-enquiry').addEventListener('click', () => { showForm(); form.elements.name.focus({preventScroll:true}); });
document.querySelector('#year').textContent = new Date().getFullYear();
