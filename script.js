// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Placeholder links reminder — replace with real URLs before publishing
const upwork = document.getElementById('upworkLink');
const github = document.getElementById('githubLink');
[upwork, github].forEach(link => {
  if (link && link.getAttribute('href') === '#') {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.warn(`Update the "${link.textContent}" link in index.html with your real URL.`);
    });
  }
});

// Draw the schematic trace spine connecting each section marker
function drawSpine(){
  const svg = document.getElementById('spineSvg');
  const path = document.getElementById('spinePath');
  const spine = document.querySelector('.trace-spine');
  if (!svg || !path || !spine) return;
  if (window.innerWidth <= 860) return;

  const markers = document.querySelectorAll('.section-label');
  if (markers.length < 2) return;

  const wrapRect = document.querySelector('.wrap').getBoundingClientRect();
  const spineTop = 640; // must match CSS .trace-spine top
  const containerWidth = wrapRect.width;

  svg.setAttribute('viewBox', `0 0 ${containerWidth} ${document.body.scrollHeight - spineTop}`);

  const points = [];
  markers.forEach(marker => {
    const r = marker.getBoundingClientRect();
    const y = r.top + window.scrollY - spineTop + r.height / 2;
    points.push({ x: 0, y });
  });

  let d = `M 0 ${points[0].y}`;
  for (let i = 1; i < points.length; i++){
    const midY = (points[i-1].y + points[i].y) / 2;
    d += ` V ${midY} H 0 V ${points[i].y}`;
  }
  path.setAttribute('d', d);
}

window.addEventListener('load', drawSpine);
window.addEventListener('resize', () => {
  clearTimeout(window._spineTimer);
  window._spineTimer = setTimeout(drawSpine, 150);
});
