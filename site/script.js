// Big Oak Consulting — shared site behavior
// Mobile nav, FAQ accordion, training catalog filter, contact form submit.

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close the menu after choosing a link (mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- FAQ accordion (single-open) ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach(function (item, index) {
      var btn = item.querySelector('button');
      var answer = item.querySelector('.answer');
      var answerId = 'faq-answer-' + index;
      answer.id = answerId;
      btn.setAttribute('aria-controls', answerId);
      btn.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');

      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('open');
        faqItems.forEach(function (other) {
          other.classList.remove('open');
          other.querySelector('button').setAttribute('aria-expanded', 'false');
          other.querySelector('.marker').textContent = '+';
        });
        if (willOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          item.querySelector('.marker').textContent = '—';
        }
      });
    });
  }

  /* ---------- Training catalog filter ---------- */
  var chips = document.querySelectorAll('.chip');
  var groups = document.querySelectorAll('.course-group');
  if (chips.length && groups.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        var track = chip.getAttribute('data-track');

        groups.forEach(function (group) {
          if (track === 'All' || group.getAttribute('data-track') === track) {
            group.style.display = '';
          } else {
            group.style.display = 'none';
          }
        });

        // Reflect selection in the URL so a filtered view is linkable.
        var url = new URL(window.location);
        if (track === 'All') {
          url.searchParams.delete('track');
        } else {
          url.searchParams.set('track', track);
        }
        window.history.replaceState({}, '', url);
      });
    });

    // Apply a track from the URL on load, if present.
    var params = new URLSearchParams(window.location.search);
    var initialTrack = params.get('track');
    if (initialTrack) {
      var match = Array.prototype.find.call(chips, function (c) {
        return c.getAttribute('data-track') === initialTrack;
      });
      if (match) match.click();
    }
  }

  /* ---------- Contact form ---------- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var notice = contactForm.querySelector('.form-notice');
    var successBlock = document.getElementById('contact-success');
    var sendAnotherBtn = document.getElementById('send-another');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('[name="name"]').value.trim();
      var email = contactForm.querySelector('[name="email"]').value.trim();
      var message = contactForm.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        notice.textContent = 'Name, email and a short note, and we’re set.';
        return;
      }
      notice.textContent = '';

      var formData = new FormData(contactForm);
      var encoded = new URLSearchParams();
      formData.forEach(function (value, key) { encoded.append(key, value); });

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded.toString()
      })
        .then(function () {
          contactForm.hidden = true;
          successBlock.hidden = false;
        })
        .catch(function () {
          notice.textContent = 'Something went wrong sending that — please call us instead, or try again.';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send inquiry';
        });
    });

    if (sendAnotherBtn) {
      sendAnotherBtn.addEventListener('click', function () {
        contactForm.reset();
        contactForm.hidden = false;
        successBlock.hidden = true;
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send inquiry';
      });
    }
  }
});
