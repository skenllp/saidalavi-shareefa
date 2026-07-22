/**
 * Luxury Muslim Wedding Invitation Script
 * Mohammed Saidalavi & Shareefa — 11th October 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. SPLASH SCREEN & INVITATION OPENING
  // ==========================================
  const splashOverlay = document.getElementById('splashOverlay');
  const openInvitationBtn = document.getElementById('openInvitationBtn');

  if (openInvitationBtn && splashOverlay) {
    openInvitationBtn.addEventListener('click', () => {
      splashOverlay.classList.add('fade-out');
      initFallingPetals();
      initScrollReveal();
    });
  }

  // ==========================================
  // 2. COUNTDOWN TIMER TO 11 OCTOBER 2026 11:00 AM IST
  // ==========================================
  const targetDate = new Date('2026-10-11T11:00:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      document.getElementById('timerDays').textContent = '00';
      document.getElementById('timerHours').textContent = '00';
      document.getElementById('timerMins').textContent = '00';
      document.getElementById('timerSecs').textContent = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const elDays = document.getElementById('timerDays');
    const elHours = document.getElementById('timerHours');
    const elMins = document.getElementById('timerMins');
    const elSecs = document.getElementById('timerSecs');

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMins) elMins.textContent = String(minutes).padStart(2, '0');
    if (elSecs) elSecs.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================
  // 3. FALLING PETALS ANIMATION
  // ==========================================
  function initFallingPetals() {
    const container = document.getElementById('flowerField');
    if (!container) return;

    // Soft floral shapes represented as SVG data URIs
    const petalSVGs = [
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24"><path d="M10 0 C 18 6, 20 18, 10 24 C 0 18, 2 6, 10 0 Z" fill="%237A1F2D" opacity="0.45"/></svg>`,
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20"><path d="M8 0 C 14 5, 16 15, 8 20 C 0 15, 2 5, 8 0 Z" fill="%23C5A059" opacity="0.55"/></svg>`,
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22"><path d="M9 0 C 16 6, 18 16, 9 22 C 0 16, 2 6, 9 0 Z" fill="%238A6B29" opacity="0.4"/></svg>`
    ];

    const petalCount = 20;

    for (let i = 0; i < petalCount; i++) {
      createPetal(container, petalSVGs);
    }
  }

  function createPetal(container, svgs) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const randomSVG = svgs[Math.floor(Math.random() * svgs.length)];
    petal.style.backgroundImage = `url('${randomSVG}')`;

    const size = Math.random() * 14 + 12; // 12px to 26px
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.2}px`;
    petal.style.left = `${Math.random() * 100}vw`;

    const duration = Math.random() * 8 + 7; // 7s to 15s
    const delay = Math.random() * 6;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    container.appendChild(petal);

    // Recycle petal
    petal.addEventListener('animationiteration', () => {
      petal.style.left = `${Math.random() * 100}vw`;
    });
  }



  // ==========================================
  // 5. SCROLL REVEAL INTERSECTION OBSERVER
  // ==========================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.15
    });

    reveals.forEach(el => observer.observe(el));
  }

  initScrollReveal();

  // ==========================================
  // 6. ADD TO CALENDAR (.ICS GENERATOR)
  // ==========================================
  const addToCalBtn = document.getElementById('addToCalBtn');
  if (addToCalBtn) {
    addToCalBtn.addEventListener('click', () => {
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Mohammed Saidalavi & Shareefa Wedding//EN',
        'BEGIN:VEVENT',
        'UID:' + Date.now() + '@wedding.invitation',
        'DTSTAMP:' + new Date().toISOString().replace(/-|:|\.\d\d\d/g, ''),
        'DTSTART:20261011T053000Z', // 11:00 AM IST
        'DTEND:20261011T120000Z',   // 05:30 PM IST
        'SUMMARY:Mohammed Saidalavi & Shareefa Wedding Ceremony',
        'DESCRIPTION:Join us for the wedding ceremony of Mohammed Saidalavi and Shareefa at Sangamam Auditorium, East Ottapalam, Palakkad.',
        'LOCATION:Sangamam Auditorium, East Ottapalam, Ottapalam, Palakkad, Kerala',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Mohammed_Saidalavi_Shareefa_Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Event added to Calendar download!');
    });
  }

  // ==========================================
  // 7. SHARE INVITATION & COPY LINK TOAST
  // ==========================================
  const shareInviteBtn = document.getElementById('shareInviteBtn');
  if (shareInviteBtn) {
    shareInviteBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Mohammed Saidalavi & Shareefa — Wedding Invitation',
        text: 'You are cordially invited to the wedding ceremony of Mohammed Saidalavi and Shareefa on 11th October 2026 at Sangamam Auditorium, East Ottapalam, Palakkad.',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          copyToClipboard(window.location.href);
        }
      } else {
        copyToClipboard(window.location.href);
      }
    });
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Invitation link copied to clipboard!');
    }).catch(() => {
      showToast('Could not copy link. Please copy URL manually.');
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

});
