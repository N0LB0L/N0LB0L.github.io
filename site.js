// Fills each .media[data-src] slot with its photo or clip once the file exists in /media.
// Until then the striped placeholder stays visible.
{
  const slots = document.querySelectorAll('.media[data-src]');
  for (const el of slots) {
    const src = el.dataset.src;
    const alt = el.dataset.alt || '';
    if (/\.(mp4|webm)$/i.test(src)) {
      const v = document.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
      v.setAttribute('aria-label', alt);
      v.addEventListener('loadeddata', () => { el.prepend(v); el.classList.add('has'); v.play().catch(() => {}); }, { once: true });
      v.src = src;
    } else {
      const i = new Image();
      i.alt = alt;
      i.onload = () => { el.prepend(i); el.classList.add('has'); };
      i.src = src;
    }
  }
}
